# fleet

Pozele pentru galeria „Parc auto”, afișate fără text.

Fișierele actuale: `v-class.jpg`, `sedan-1.jpg`, `lincoln.jpg`, `vito.jpg`,
`carnival.jpg`, `sprinter.jpg`, `sedan-2.jpg`.

Lista și **ordinea** sunt în `FLEET_PHOTOS`, în `src/data/content.js`. Ordinea
contează pentru aspect: **fiecare a treia poză** (1, 4, 7 …) se afișează pe
toată lățimea, restul în perechi. Pune pe pozițiile acelea cadrele cele mai late.

## Cum au fost pregătite

Originalele stau în `transport/parc_auto/`, în afara lui `public/`, deci nu
ajung în build. Au fost redimensionate la 1600px lățime, JPG calitate 78, cu un
script scurt care folosește Pillow:

    from PIL import Image
    im = Image.open('parc_auto/NUME.jpeg').convert('RGB')
    w, h = im.size
    im = im.resize((1600, round(h * 1600 / w)), Image.LANCZOS)
    im.save('public/fleet/nume.jpg', quality=78, optimize=True, progressive=True)

Rezultat: ~230 KB per poză, 1,6 MB în total pentru 7 poze (de la 23 MB).
