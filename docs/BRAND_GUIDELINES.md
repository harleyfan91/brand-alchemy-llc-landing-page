# Brand guidelines (visual system)

**Purpose:** Canonical reference for **typography, color, imagery, symbols, and UI weight** on the Brand Alchemy site (and for matching off-site assets). Implementation lives in `index.html`, `App.tsx`, and `components/` — update this doc when those change.

**Related:** [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (tone, audience, products), [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md).

---

## Typography

### Font families

| Role | Family | Where loaded / applied |
|------|--------|-------------------------|
| **Body & UI** | **Inter** | Google Fonts in `index.html`; `body { font-family: 'Inter', sans-serif; }` |
| **Display / section titles** | **Playfair Display** | Google Fonts in `index.html`; utility class `.font-serif` maps to Playfair |

### Weights in use

- **Inter:** `300`, `400`, `500`, `600`, `700` are linked in `index.html` (use **light** body copy, **semibold/bold** for emphasis and UI chrome).
- **Playfair Display:** **`700`** is linked for headlines and serif moments (e.g. section titles, “Have questions?”).

### Type scale patterns (Tailwind)

These match how the live components are built; use them for new sections so the site stays one system.

| Use | Typical classes | Notes |
|-----|-----------------|--------|
| **Section eyebrow** | `text-xs font-bold uppercase tracking-[0.3em] text-gray-400` | e.g. “Products”, “The approach” |
| **Nav links** | `text-[10px] font-bold uppercase tracking-[0.2em]` | Minimal, wide tracking |
| **Hero H1** | `font-bold uppercase tracking-tight text-gray-900` stepping `text-3xl` → `xl:text-7xl` | Accent lines may use `text-gray-300` / `text-gray-500` |
| **Section H3 (serif)** | `text-4xl md:text-5xl font-serif text-gray-900` | “The Toolkit”, contact headline |
| **Card / product titles** | `text-2xl font-serif text-gray-900` | Identity / catalog cards |
| **Body / descriptions** | `text-sm` or `text-base`, `font-light` or `font-normal`, `text-gray-500` or `text-gray-600`, `leading-relaxed` | Readable, not heavy |
| **Dictionary / aside** | `font-serif italic text-gray-500` (hero definition line) | Editorial, smaller than H1 |
| **Tags / pills** | `text-[10px] font-bold uppercase` | Catalog tags |
| **Primary CTA buttons** | `text-xs font-bold uppercase tracking-widest` | On `rounded-full` black buttons |

**Source of truth for catalog typography:** comment block at top of `components/Products.tsx`.

---

## Color

### Core neutrals (Tailwind gray scale)

- **Page:** `bg-white`, default text `text-gray-900` (`index.html` `body`).
- **Primary text:** `text-gray-900`.
- **Secondary / body:** `text-gray-500`, `text-gray-600`, `text-gray-700` as needed.
- **Eyebrows / muted labels:** `text-gray-400`.
- **Softer headline accents:** `text-gray-300` (e.g. hero line weight).
- **Borders / dividers:** `border-gray-100`, `border-gray-200`.
- **Surfaces:** `bg-gray-50`, `bg-gray-100` (image placeholders, subtle panels).

### Brand chrome

- **Primary actions:** `bg-black text-white`, hover `hover:bg-gray-800`, `transition-colors`.
- **Text links (emphasis):** `text-gray-900` with underline; hover can soften to `text-gray-500`.
- **Text selection:** `selection:bg-black selection:text-white` (`App.tsx` root).

### Overlays & atmosphere

- **Modal scrim:** `bg-black/60` with optional `backdrop-blur-sm`.
- **Hero glow:** soft blob `bg-gradient-to-tr from-gray-50 to-white` with blur (see `Hero.tsx`).
- **Frosted bands (subtle):** near-white rgba + `backdrop-filter: blur(3px)` where inline styles are used (Services / Contact) so blur is reliable with the Tailwind CDN build.

### Platform accents (catalog only)

Used for Google vs Yelp column styling in `Products.tsx` (keep aligned if those UIs change):

| Platform | Background tint | Accent |
|----------|-----------------|--------|
| Google | `#f0f4ff` | `#4285F4` |
| Yelp | `#fff5f5` | `#d32323` |
| Both / neutral picker | `#f1f2f4` / `#f3f4f6` | `#111` for combined emphasis |

---

## Imagery

- **Product / card images:** `aspect-[16/10]`, `rounded` inside `rounded-2xl` cards, `bg-gray-100` while loading or empty.
- **Mood:** Real-world, warm, owner-operated businesses — natural light, believable contexts. Avoid cliché “handshake in boardroom” stock when possible.
- **Treatment:** Prefer full-bleed within the frame, no heavy filters; let borders (`border-gray-100`) and whitespace carry the premium feel.
- **Alt text:** Descriptive, plain language (matches [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md)).

---

## Symbols & logo

### Wordmark + mark (UI)

- **Lockup:** `AlchemyMark` (**β△**) + **“Brand Alchemy”** wordmark in header — see `components/Header.tsx`.
- **Mark only:** `components/AlchemyMark.tsx` — characters **β△** (beta + triangle), **`font-bold`**, size tokens `xs` | `sm` | `md` | `lg` with matching `tracking-*`. Inherits `currentColor` via `className` (e.g. `text-gray-900`, footer `text-gray-300`).
- **Do not** stretch, replace glyphs with different characters, or add outlines that break the monoline feel of the UI mark without updating this doc and the component.

### Favicon (generator recipe)

Documented in `index.html`: text **β△**, font **Playfair Display Medium 500**, **BG `#000000`**, **FG `#ffffff`** — regenerate at [favicon.io](https://favicon.io/favicon-generator/) if the mark changes.

### Background alchemical SVGs

- **Component:** `components/AlchemyBackground.tsx` — geometric β, triangle, and train of standard alchemical-style icons (Earth, Sulfur, Mercury, Fire, Sun, Air, Salt, etc.).
- **Treatment:** `currentColor` with `text-gray-900`, peak opacity **`~0.06`** — **decorative only**, fixed behind content (`z-index` below header/modals). Not intended as full-strength logo substitutes in print or ads unless deliberately redesigned for contrast.

---

## Layout, radius, and weight

| Pattern | Typical value |
|---------|----------------|
| **Content width** | `max-w-5xl` (hero center), `max-w-7xl` (header, services, products grid), `max-w-4xl` (contact) |
| **Horizontal padding** | `px-4 sm:px-6 lg:px-8` |
| **Section rhythm** | `py-10 md:py-24` or `py-24` for major blocks; `scroll-mt-20` for hash targets |
| **Cards** | `rounded-2xl`, `border border-gray-100`, optional hover shadow `hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]` |
| **Primary buttons** | `rounded-full`, generous vertical padding (`py-3`–`py-3.5`) |
| **Z-index stack (reference)** | Background symbols ≈ `10`, content sections `20`, header `50`, modals `100` |

**Visual weight:** Favor **white space, light type weights, and thin borders** over heavy boxes. Black is for **decision moments** (primary CTA, selection), not large fills.

---

## Motion

- **Global:** `scroll-behavior: smooth` on `body` (`index.html`).
- **Interactions:** Short `transition-colors` (and similar) on hovers; scroll-driven motion is isolated to `AlchemyBackground` — keep new animations **subtle** and respect `prefers-reduced-motion` if you add significant motion later.

---

## Maintaining this doc

When you change fonts, grays, button styles, the β△ mark, or platform accent hex values in code, **update this file in the same PR** so designers, contractors, and AI tools stay aligned.

**Cursor:** The messaging rule should list this file — see [`.cursor/rules/brand-alchemy-messaging.mdc`](../.cursor/rules/brand-alchemy-messaging.mdc).
