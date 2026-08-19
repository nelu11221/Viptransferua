import { useEffect, useRef, useState } from 'react'
import { HERO_MEDIA } from '../data/content.js'

/**
 * Scrubs the hero animation with scroll position: one frame per scroll
 * position, drawn on a canvas. Progress (0…1) is published as
 * `--hero-progress` on the pinned section so CSS can drive the scroll cue
 * and the gradient fallback.
 *
 * Sources, in order: pre-rendered JPG frames → hero.gif decoded in the
 * browser → animated gradient.
 */

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

// Frame files come out of different tools with different names, so instead of
// forcing one convention we probe the first frame and keep whatever answers.
const NAME_PATTERNS = ['frame-', 'frame_', 'frame', 'ezgif-frame-', 'img-', 'img_', '']
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif']
const PAD_WIDTHS = [4, 3, 5, 1]

function namer(pattern, pad, ext) {
  return (n) => `${HERO_MEDIA.dir}${pattern}${String(n).padStart(pad, '0')}.${ext}`
}

function candidates(pads) {
  const out = []
  for (const pattern of NAME_PATTERNS) {
    for (const ext of EXTENSIONS) {
      for (const pad of pads) {
        for (const start of [1, 0]) out.push({ name: namer(pattern, pad, ext), start })
      }
    }
  }
  return out
}

/** Finds the naming scheme and the index the sequence starts at. */
async function detectFrames() {
  // Wave 1 is the ffmpeg default alone — one request in the normal case.
  // The wider fan-out only runs when that misses, so an ordinary page load
  // never pays for the dozens of probe requests.
  const waves = [
    [{ name: namer('frame-', 4, 'jpg'), start: 1 }],
    candidates([PAD_WIDTHS[0]]),
    candidates(PAD_WIDTHS.slice(1)),
  ]

  for (const wave of waves) {
    // Sequential on purpose: the second wave is only needed if the first fails.
    // eslint-disable-next-line no-await-in-loop
    const results = await Promise.all(wave.map((c) => loadImage(c.name(c.start))))
    const hit = results.findIndex(Boolean)
    if (hit !== -1) return { ...wave[hit], first: results[hit] }
  }
  return null
}

/**
 * Phones get every other frame: half the bytes over mobile data, and the
 * animation still reads as smooth because the scroll distance is shorter too.
 */
function frameStep() {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 4
  return window.innerWidth <= 768 ? 2 : 1
}

/* Phones show the opening frame as a plain still: no pinning, no scrubbing,
   one ~80 kB image instead of the ~50 the scrubbed version would pull down.
   Matches the breakpoint where the CSS drops --hero-scroll to zero. */
const STATIC_HERO_QUERY = '(max-width: 1040px)'

function useStaticHero() {
  const [isStatic, setIsStatic] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(STATIC_HERO_QUERY).matches,
  )

  useEffect(() => {
    const query = window.matchMedia(STATIC_HERO_QUERY)
    const onChange = (event) => setIsStatic(event.matches)
    query.addEventListener('change', onChange)
    setIsStatic(query.matches)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return isStatic
}

/** Loads frames in batches and stops at the first missing one. */
async function loadFrames({ name, start, first }) {
  const BATCH = 24
  const step = frameStep()
  const frames = [first]
  let next = start + step

  while (frames.length < HERO_MEDIA.maxFrames) {
    const batch = []
    while (batch.length < BATCH && frames.length + batch.length < HERO_MEDIA.maxFrames) {
      batch.push(loadImage(name(next + batch.length * step)))
    }
    // Sequential on purpose: each batch decides whether another is needed.
    // eslint-disable-next-line no-await-in-loop
    const settled = await Promise.all(batch)
    const gap = settled.indexOf(null)
    if (gap !== -1) {
      frames.push(...settled.slice(0, gap))
      break
    }
    frames.push(...settled)
    next += settled.length * step
  }

  return frames
}

// Vite's dev server answers unknown paths with index.html, so a 200 alone
// is not proof the file exists — the content type has to be an image.
async function fetchImageBytes(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    if (!(res.headers.get('content-type') || '').startsWith('image/')) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

async function decodeGif(data) {
  if (typeof ImageDecoder === 'undefined') return null
  try {
    const decoder = new ImageDecoder({ data, type: 'image/gif' })
    await decoder.tracks.ready
    const total = decoder.tracks.selectedTrack?.frameCount ?? 0
    const frames = []
    for (let i = 0; i < total; i += 1) {
      // Sequential on purpose: the decoder works through the track in order.
      // eslint-disable-next-line no-await-in-loop
      const { image } = await decoder.decode({ frameIndex: i })
      frames.push(image)
    }
    return frames.length ? frames : null
  } catch {
    return null
  }
}

export default function HeroScrollMedia() {
  // A callback ref (state, not useRef) so the scroll effect re-runs whenever
  // the node is attached — refs alone can still be null when effects fire.
  const [node, setNode] = useState(null)
  const framesRef = useRef([])
  // 'gradient' → no media, 'canvas' → scrubbable frames, 'gif' → plain <img>,
  // 'poster' → one still frame, the phone treatment
  const [mode, setMode] = useState('gradient')
  const [poster, setPoster] = useState(null)
  // Bumped when the full sequence lands, to redraw with the real frame count.
  const [revision, setRevision] = useState(0)
  const staticHero = useStaticHero()

  useEffect(() => {
    let cancelled = false

    async function load() {
      const detected = await detectFrames()
      if (cancelled) return

      if (detected) {
        if (staticHero) {
          // Stop at the frame the probe already fetched — nothing else to pull.
          setPoster(detected.name(detected.start))
          setMode('poster')
          return
        }

        // Show frame one straight away, then swap in the whole sequence once
        // it has downloaded — no waiting on several megabytes before painting.
        framesRef.current = [detected.first]
        setMode('canvas')

        const frames = await loadFrames(detected)
        if (cancelled) return
        framesRef.current = frames
        setRevision((n) => n + 1)
        return
      }

      const bytes = await fetchImageBytes(HERO_MEDIA.gif)
      if (cancelled || !bytes) return

      // Nothing to scrub against on a phone, so skip the frame-by-frame decode.
      if (staticHero) {
        setMode('gif')
        return
      }

      const gifFrames = await decodeGif(bytes)
      if (cancelled) return

      if (gifFrames) {
        framesRef.current = gifFrames
        setMode('canvas')
      } else {
        // GIF is there but this browser cannot decode it frame by frame:
        // show it as a normal (self-playing) image rather than nothing.
        setMode('gif')
      }
    }

    load()
    return () => {
      cancelled = true
      framesRef.current.forEach((frame) => frame?.close?.())
      framesRef.current = []
    }
  }, [staticHero])

  // Scroll → progress → canvas frame, on a single rAF loop.
  useEffect(() => {
    // A still hero has nothing to drive: no scroll listener, no rAF, and
    // --hero-progress stays at its 0 default.
    if (mode === 'poster') return undefined

    const container = node?.closest('.hero')
    if (!container) return undefined

    let raf = 0
    let lastFrame = -1

    function drawFrame(index) {
      const canvas = node
      const frame = framesRef.current[index]
      if (!canvas?.getContext || !frame) return

      // HTMLImageElement exposes naturalWidth, a decoded VideoFrame displayWidth.
      const sw = frame.naturalWidth || frame.displayWidth || 0
      const sh = frame.naturalHeight || frame.displayHeight || 0
      if (!sw || !sh) return

      const ctx = canvas.getContext('2d')
      const { width, height } = canvas
      const scale = Math.max(width / sw, height / sh)
      const w = sw * scale
      const h = sh * scale
      ctx.drawImage(frame, (width - w) / 2, (height - h) / 2, w, h)
      lastFrame = index
    }

    function update() {
      raf = 0
      const rect = container.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const progress = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 0

      container.style.setProperty('--hero-progress', progress.toFixed(4))

      const frames = framesRef.current
      if (frames.length) {
        const index = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)))
        if (index !== lastFrame) drawFrame(index)
      }
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(update)
    }

    function resize() {
      const canvas = node
      if (canvas?.getContext) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = canvas.clientWidth * dpr
        canvas.height = canvas.clientHeight * dpr
        lastFrame = -1
      }
      update()
    }

    resize()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', resize)
    }
  }, [node, mode, revision])

  if (mode === 'poster') {
    return (
      <img
        className="hero__canvas"
        ref={setNode}
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
    )
  }
  if (mode === 'canvas') {
    return <canvas className="hero__canvas" ref={setNode} aria-hidden="true" />
  }
  if (mode === 'gif') {
    return <img className="hero__canvas" ref={setNode} src={HERO_MEDIA.gif} alt="" aria-hidden="true" />
  }
  return <div className="hero__fallback" ref={setNode} aria-hidden="true" />
}
