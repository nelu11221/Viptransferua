# gif_scroll

Aici stau cadrele animației din hero — cele care se derulează la scroll.

**Acum:** 100 de cadre (`frame-0001.jpg` … `frame-0100.jpg`), 1280×720, 7,4 MB
în total. Au fost făcute din cele 300 de PNG-uri din `transport/gif_scroll/`
(238 MB): s-a păstrat fiecare al treilea cadru și s-au salvat ca JPG calitate 68.

```bash
python3 - <<'EOF'
from PIL import Image
import glob
src = sorted(glob.glob('gif_scroll/ezgif-frame-*.png'))
for i, path in enumerate(src[::3], start=1):
    Image.open(path).convert('RGB').save(
        f'public/gif_scroll/frame-{i:04d}.jpg', quality=68, optimize=True, progressive=True)
EOF
```

## Cum le pui

Copiază cadrele direct în acest folder. Atât: **nu trebuie modificat nimic în
cod**, numele și numărul lor sunt detectate automat.

Convenții recunoscute (prefix × extensie × cifre):

| prefix | extensie | numerotare |
| --- | --- | --- |
| `frame-` `frame_` `frame` `img-` `img_` (sau fără prefix) | `.jpg` `.jpeg` `.png` `.webp` `.avif` | `0001` `001` `00001` `1`, pornind de la 0 sau de la 1 |

Deci merg și `frame-0001.jpg`, și `img_001.png`, și `1.webp`. Important e să fie
o serie continuă, fără găuri — încărcarea se oprește la primul cadru lipsă.

## Din GIF în cadre

```bash
ffmpeg -i hero.gif -vf "scale=1920:-1:flags=lanczos" -q:v 4 frame-%04d.jpg
```

(`brew install ffmpeg` dacă nu îl ai)

Din video e la fel, dar merită limitat numărul de cadre:

```bash
ffmpeg -i hero.mp4 -vf "fps=24,scale=1920:-1:flags=lanczos" -q:v 4 frame-%04d.jpg
```

## Alternativă: direct GIF-ul

Dacă pui aici un `hero.gif` în loc de cadre, e desfăcut în cadre chiar în
browser. Merge în Chrome, Edge și Safari 17+; în Firefox GIF-ul rulează normal,
dar nu mai e legat de scroll. Cadrele au prioritate dacă există și una, și alta.

## Recomandări

- 40–120 de cadre sunt suficiente; mai multe înseamnă doar mai mulți megabytes.
- Ține fiecare cadru sub ~150 KB (`-q:v 4` e un compromis bun).
- Lățime 1600–1920px e destul; canvas-ul face `cover` peste tot ecranul.
- Cât timp folderul e gol, hero-ul arată gradientul de rezervă, care se apropie
  ușor la scroll — pagina funcționează și fără cadre.
- Durata efectului se reglează din `--hero-scroll` în `src/App.css`
  (implicit `160vh` de scroll în plus peste primul ecran).
