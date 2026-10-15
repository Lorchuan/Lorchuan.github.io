# Benjamin Tong · 佟博明

Personal website for Benjamin Tong, an undergraduate at Tsinghua University's Wuqiong College exploring robotics and embodied AI.

**Website:** https://lorchuan.github.io/

## Content

- Robotics projects: ATEC, The Last Note VR/AR, and Cyberdog football.
- Education, engineering skills, leadership, honours, and life outside the lab.
- Chinese / English switch, expandable project details, photo viewer, email contact and print layout.
- The previous homepage remains available at [`archive/`](archive/).

## Local preview

This is a static site with no build step, external fonts, analytics, or frontend dependencies.

```sh
python -m http.server 8765
```

Open `http://localhost:8765/`.

## Updating

- `index.html`: content; Chinese text is in the HTML, with English translations in `data-en` attributes. Image translations use `data-en-alt`.
- `styles.css`: responsive layout and print styles.
- `script.js`: language preference, image viewer, clipboard and navigation.
- `assets/`: optimized photographs and favicon. Original private resume files are not included.

The public profile uses the university email. Phone numbers, home addresses and student IDs are intentionally omitted.

## GitHub Pages

Publish the `main` branch from the repository root (`/`). The `.nojekyll` file enables plain static-file delivery. The site works without a build pipeline.

## Content provenance

Prepared from the owner's October 2026 CV, supplied defense slides, and previously confirmed details. ATEC is listed as a finalist result, not a final award. The first-year GPA is 3.8/4.0; the historical first-semester ranking is not presented as a full-year ranking. The robot dog competition is described as a first-year project because the latest CV contains a year inconsistent with the earlier materials.

Photographs are supplied by the owner or extracted from the owner's presentations. Public text last reviewed: 2026-10-15.
