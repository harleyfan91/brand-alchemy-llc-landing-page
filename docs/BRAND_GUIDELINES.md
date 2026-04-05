# Brand guidelines (visual system)

**Purpose:** Canonical reference for **typography, color, imagery, symbols, and UI weight** on the Brand Alchemy site (and for matching off-site assets). Implementation lives in `index.html`, `App.tsx`, and `components/` — update this doc when those change.

**Related:** [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (tone, audience, products), [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md), [CATALOG_TIER_TEXT_STYLES.md](CATALOG_TIER_TEXT_STYLES.md) (Core/Pro modal labels — handoff for other projects).

---

## Typography

### Font families (loaded weights)

| Family | Weights linked | Use |
|--------|----------------|-----|
| **Inter** | 300, 400, 500, 600, 700 | Body, UI, sans headlines (hero H1), buttons, nav |
| **Source Serif 4** | 400, 600, 700 + italic (same weights) | Section titles, product names, editorial serif (`.font-serif`). **Default display weight is `font-normal` (400):** this family reads heavier than the old Apple system serif fallback at the same *numerical* weight, so we keep serifs light for a similar feel. Use `font-semibold` / `font-bold` only for small accents (e.g. one word). Always set weight explicitly (preflight resets heading weight). |

Loaded in `index.html`; `body` is Inter; `.font-serif` → **Source Serif 4**.

---

### Typography by role (font, weight, size, color)

Use this table when adding or auditing blocks so hero vs section vs body stay distinct. **Tailwind classes** are the contract; match breakpoints when you mirror an existing pattern.

#### Hero (`components/Hero.tsx`)

| Block | Font | Weight | Size (mobile → large) | Color | Case / tracking / leading |
|-------|------|--------|-------------------------|-------|---------------------------|
| **Definition line** (dictionary) | Source Serif 4 | italic body: **normal** (400); word “alchemy”: **semibold** (600) | `text-xs` → `md:text-sm` | Wrapper `text-gray-500`; emphasized word `text-gray-700`; definition text `text-gray-400` | `normal-case`, `tracking-normal`, `leading-snug` |
| **Hero H1** (main headline) | Inter | **bold** (700) | `text-3xl` → `sm:text-4xl` → `md:text-5xl` → `lg:text-6xl` → `xl:text-7xl` | Primary lines `text-gray-900`; secondary line e.g. brand name `text-gray-300`; tertiary e.g. tagline `text-gray-500` | **UPPERCASE** (CSS via content), `tracking-tight`, `leading-[1.08]` → `md:leading-[1.1]` |
| **Hero subhead** (paragraph under H1) | Inter | **light** (300) | `text-base` → `md:text-xl` | `text-gray-500` | Sentence case, `leading-relaxed` |
| **Hero text link CTA** (“See the approach”) | Inter | **bold** (700) | `text-[10px]` → `md:text-xs` | `text-gray-500`, hover `text-gray-900` | **UPPERCASE**, `tracking-[0.2em]` (not a filled button; arrow paired in component) |

#### Section header stack (e.g. Services, Products intros — `Services.tsx`, `Products.tsx`)

| Block | Font | Weight | Size | Color | Case / tracking / leading |
|-------|------|--------|------|-------|---------------------------|
| **Section eyebrow** (label above title) | Inter | **bold** (700) | `text-xs` | `text-gray-400` | **UPPERCASE**, `tracking-[0.3em]` |
| **Section title** (main heading for the section) | Source Serif 4 | **normal** (400) — class `font-normal` | `text-4xl` → `md:text-5xl` | `text-gray-900` | Title case (normal), default tracking |
| **Section intro / supporting line** (if present) | Inter | **light** (300) | `text-sm` → `md:text-base` | `text-gray-500` | Sentence case, `leading-relaxed` |

#### In-section content (cards, solutions, contact)

| Block | Font | Weight | Size | Color | Case / tracking / leading |
|-------|------|--------|------|-------|---------------------------|
| **Card / product title** (e.g. Camentra, Identity Kit) | Source Serif 4 | **normal** (400) — `font-normal` | `text-2xl` (modal lines may be `text-xl`–`text-3xl`) | `text-gray-900` | Title case |
| **Solution / step title** (Services) | Inter | **bold** (700) | `text-base` | `text-gray-900` | Title case |
| **Step index number** (Services mobile) | Inter | **bold** (700) | `text-5xl` | `text-gray-200` | Numeric, `leading-none` |
| **Body / descriptions** (cards, features, solutions) | Inter | **light** (300) or **normal** (400) for lists | `text-sm` (often `md:text-base` for intros) | `text-gray-500`–`text-gray-600` | Sentence case, `leading-relaxed` |
| **Contact headline** | Source Serif 4 | **normal** (400) — `font-normal` | `text-4xl` → `md:text-5xl` | `text-gray-900` | Title case |
| **Content pack card title** (catalog) | Source Serif 4 | **normal** (400) — `font-normal` | `text-sm` → `sm:text-lg` | `text-gray-900` | Title case, `leading-snug` |
| **Modal section title** (e.g. guides/kits `h3`) | Source Serif 4 | **normal** (400) — `font-normal` | `text-2xl` | `text-gray-900` | Title case |
| **Contact body** | Inter | **light** (300) | `text-lg` | `text-gray-500` | `leading-relaxed`; link `text-gray-900`, hover `text-gray-500` |

#### UI chrome

| Block | Font | Weight | Size | Color | Case / tracking / leading |
|-------|------|--------|------|-------|---------------------------|
| **Header wordmark** “Brand Alchemy” | Inter | **bold** (700) | `text-xl` | `text-gray-900` (hover `text-gray-500`) | **UPPERCASE**, `tracking-tight` |
| **Nav links** | Inter | **bold** (700) | `text-[10px]` | `text-gray-400` (hover `text-black`) | **UPPERCASE**, `tracking-[0.2em]` |
| **Primary CTA button** (label) | Inter | **bold** (700) | `text-xs` | `text-white` on `bg-black` | **UPPERCASE**, `tracking-widest` |
| **Tags / pills** (catalog) | Inter | **bold** (700) | `text-[10px]` | varies; often `text-gray-400` / `text-gray-800` | **UPPERCASE** |
| **Footer tagline** | Inter | **medium** (500) | `text-[11px]` → `md:text-xs` | `text-gray-400` | **UPPERCASE**, `tracking-widest` |

---

### Quick decision guide

- **Largest sans headline (all caps)?** → Hero H1 only — Inter bold, tight tracking, gray-900 with lighter gray accents.
- **Largest serif headline (title case)?** → Section title or contact — Source Serif 4 + **`font-normal` (400)**, `text-4xl` / `md:text-5xl`, gray-900.
- **Muted label above a serif title?** → Section eyebrow — Inter bold xs, uppercase, wide tracking, gray-400.
- **Paragraphs readers actually read?** → Inter light (or normal for dense lists), gray-500, relaxed leading; bump size one step for hero subhead only.

**Catalog-specific scale** (modal, kit cards, feature lines): comment block at top of `components/Products.tsx` — keep in sync with this doc when you change those tokens.

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

### Favicon

Shipped as **`/favicon.ico`**. Regeneration settings for a consistent mark are documented **only** in the HTML comment above `<link rel="icon">` in **`index.html`** (not duplicated here).

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
