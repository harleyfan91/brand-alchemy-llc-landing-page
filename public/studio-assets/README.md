# Studio page assets

Images for the `/studio` consulting page.

**Dev placeholders are included** (Unsplash). See [ATTRIBUTION.md](./ATTRIBUTION.md) for photo credits. Replace before launch as needed — especially `founder.jpg`.

| File | Spec | Used in |
|------|------|---------|
| `hero.jpg` | Full-bleed hero, min 1920×1080, dark creative workspace / subculture atmosphere | Panel 1 — hero snap section |
| `panel-2.jpg` | Full-bleed mid-page break, min 1920×1080, textural / editorial (no people) | Panel 3 — image break snap section |
| `sprint-a.jpg` | Card header band, min 1200×400, drop / release-day logistics mood | Drop & Allocation sprint card |
| `sprint-b.jpg` | Card header band, min 1200×400, elevated appointment / studio space | Capacity & Intake sprint card |
| `founder.jpg` | Portrait crop, min 400×400 (future editorial layout — not used on page yet) | Reserved; replace with your photo |

If a file is missing, the page falls back to dark gradients (hero, panel-2) or surface color bands (sprint cards).

## Config

- Instagram URL: update `STUDIO_INSTAGRAM_URL` in `content/studio.ts`
- Contact email: `STUDIO_CONTACT_EMAIL` in the same file

## Scroll behavior

Panels 1–3 snap full-viewport on `/studio`. Engagements section is the snap entry into free scroll for offerings content below.
