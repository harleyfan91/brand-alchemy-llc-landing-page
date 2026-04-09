# Brand guidelines (visual system)

**Purpose:** Canonical reference for **typography, color, imagery, symbols, and UI weight** on the Brand Alchemy site (and for matching off-site assets). Implementation lives in `index.html`, `public/brand-tokens.css`, `App.tsx`, and `components/` — update this doc (and the token file when neutrals, primary chrome, or catalog platform colors change) when those change.

**Related:** [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (tone, audience, products), [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md), [BRAND_SOURCE_OF_TRUTH.md](BRAND_SOURCE_OF_TRUTH.md) (sister sites, drift), [CATALOG_TIER_TEXT_STYLES.md](CATALOG_TIER_TEXT_STYLES.md) (Core/Pro modal labels — handoff for other projects).

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
| **Definition line** (dictionary) | Source Serif 4 | italic body: **normal** (400); word “alchemy”: **semibold** (600) | `text-[clamp(0.82rem,2.2vw,0.95rem)]` → `md:text-sm` | Wrapper `text-gray-500`; emphasized word `text-gray-700`; definition text `text-gray-400` | `normal-case`, `tracking-normal`, `leading-snug` |
| **Hero H1** (main headline) | Inter | **bold** (700) | `text-[clamp(2rem,8.4vw,2.4rem)]` → `sm:text-4xl` → `md:text-5xl` → `lg:text-6xl` → `xl:text-7xl` | Primary lines `text-gray-900`; secondary line e.g. brand name `text-gray-300`; tertiary e.g. tagline `text-gray-500` | **UPPERCASE** (CSS via content), `tracking-tight`, `leading-[1.08]` → `md:leading-[1.1]` |
| **Hero subhead** (paragraph under H1) | Inter | **light** (300) | `text-[clamp(1.02rem,4.2vw,1.15rem)]` → `md:text-xl` | `text-gray-500` | Sentence case, `leading-relaxed` |
| **Hero text link CTA** (“See the approach”) | Inter | **bold** (700) | `text-[clamp(0.72rem,2.7vw,0.8rem)]` → `md:text-xs` | `text-gray-500`, hover `text-gray-900` | **UPPERCASE**, `tracking-[0.2em]` (not a filled button; arrow paired in component) |

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
| **Modal section title** (e.g. local-business catalog `h3`) | Source Serif 4 | **normal** (400) — `font-normal` | `text-2xl` | `text-gray-900` | Title case |
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

**Catalog-specific scale** (modal, kit cards, feature lines): comment block at top of `components/Products.tsx` — keep in sync with this doc when you change those tokens. **Offer pages** that compare packages before a separate flow (e.g. `/identity-kit`) use `components/MarketingComparisonCards.tsx`: marketing-first cards, concise summaries, one anchored CTA below the comparison, and optional featured-card treatment such as a subtle black peek tab (`AI Enhanced`) behind the emphasized card. `components/CatalogStyleTierCards.tsx` remains the catalog / static tier-row parity primitive.

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

### Design tokens (machine-readable)

**File:** [`public/brand-tokens.css`](../public/brand-tokens.css) — CSS custom properties for font stacks, Tailwind-aligned **gray** neutrals, text/border/surface roles, primary button colors, scrim, and **catalog platform** tints (Google / Yelp / both). Linked from `index.html` so the variables are available if you add custom CSS; **Tailwind utility classes remain the day-to-day contract** on this site. `components/Products.tsx` uses `var(--ba-…)` for catalog inline styles so hex values are not duplicated outside this file.

**Sister sites:** copy or vendor this file from this repository and keep it aligned when the guidelines change. Product-specific accents stay in the product codebase.

### Platform accents (catalog only)

Used for Google vs Yelp column styling in `Products.tsx` — values also live as `--ba-catalog-*` in [`public/brand-tokens.css`](../public/brand-tokens.css) (keep table, token file, and TS in sync):

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
- **Treatment:** `currentColor` with `text-gray-900`, peak opacity **`~0.06`** — **decorative only**, fixed behind content at **`z-index: 10`** (see **Layout → Z-index & stacking**). Not intended as full-strength logo substitutes in print or ads unless deliberately redesigned for contrast.

---

## Layout, radius, and weight

| Pattern | Typical value |
|---------|----------------|
| **Content width** | `max-w-5xl` (hero center), `max-w-7xl` (header, services, products grid), `max-w-4xl` (contact) |
| **Horizontal padding** | `px-4 sm:px-6 lg:px-8` |
| **Section rhythm** | `py-10 md:py-24` or `py-24` for major blocks; `scroll-mt-20` for hash targets |
| **Cards** | `rounded-2xl`, `border border-gray-100`, optional hover shadow `hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]` |
| **Primary buttons** | `rounded-full`, generous vertical padding (`py-3`–`py-3.5`) |

**Visual weight:** Favor **white space, light type weights, and thin borders** over heavy boxes. Black is for **decision moments** (primary CTA, selection), not large fills.

### Mobile section rhythm (hybrid standard)

Use a **hybrid** layout model on this site:

- **Natural vertical document flow** for page sections (hero, services, products, articles, contact).
- **Snap only for horizontal carousels** (cards/tiles), not full-page vertical lock-step sections.
- Keep each section readable in one pass without forcing users into section-by-section swipes.

#### Why this over full-page vertical snapping

Full-page snap (`scroll-snap-type: y mandatory` + `100vh` panels) creates rigid pacing and can feel premium on narrative microsites, but it is usually less forgiving for owner-operator audiences scanning practical info. Our audience benefits more from smooth, interruptible scroll with clear structure.

#### Viewport bands (mobile)

Use these width bands when tuning mobile typography/spacing:

| Band | Width | Typical devices | Guidance |
|------|-------|------------------|----------|
| **Small mobile** | `<= 399px` | iPhone 12/13/14 Pro class | Prioritize readable floors; avoid aggressive down-scaling |
| **Mid mobile** | `400px - 430px` | iPhone 15/16 Pro class | Slightly tighten display type to preserve line breaks |
| **Large mobile** | `>= 431px` and `< md` | Plus/Max class | Return to base mobile sizes unless content wraps poorly |

#### Height model (mobile)

- **Hero:** target first-view composition that reads as “single screen” using `min-h-[100svh]` and centered content; avoid custom per-device `vh` arithmetic unless required by a reproducible bug.
- **Hero safe area:** when CTA or interactive copy sits near the lower edge, include bottom-safe padding using `env(safe-area-inset-bottom)` (for Dynamic Island / notch devices) so content never feels clipped by browser chrome or gesture areas.
- **Non-hero sections:** do **not** force `100vh`. Let content define height.
- **Non-hero floor:** keep a minimum mobile rhythm floor of `py-8` (or visually equivalent spacing) so short sections do not collapse into a sliver between larger blocks.
- Prefer section spacing consistency (`py-*`) over per-device overrides in multiple components.

#### Section header stack rules (mobile)

For section intro blocks (eyebrow + serif heading + support text):

1. Scale as a **stack** (all three roles together), not one heading in isolation.
2. Keep proportion stable across bands (eyebrow smallest, heading dominant, support readable).
3. Centralize width-band overrides in shared CSS tokens/classes (not one-off inline utility edits per section).
4. **Policy:** section intro stack uses **band-based shared classes** (predictable and auditable). Hero remains the exception and uses `clamp(...)` because it is most viewport-sensitive.
5. Use one density variant per section intro block: `ba-section-stack--compact` (short support copy), `ba-section-stack--default` (standard), or `ba-section-stack--roomy` (longer/supportive copy).

#### Do / Don't

- **Do:** centralize band-specific typography in shared classes/tokens.
- **Do:** tune line-break outcomes on known narrow and mid bands.
- **Do:** validate on at least one device/emulator per band before merging.
- **Do:** maintain a migration checklist of which sections use shared header classes.
- **Don't:** patch one section/device repeatedly with ad hoc classes.
- **Don't:** combine vertical snap panels with long card sections unless there is a strong product reason.

#### Shared header class migration checklist

Track these before merging typography changes:

- `Services` — migrated
- `Guides` — migrated
- `Products` — migrated
- `Contact` — migrated (uses eyebrow + shared header classes)

### Z-index & stacking (canonical)

There **was** a one-line note in the layout table; the trouble we hit on Guides (atmosphere showing “through” controls, then over-correcting with a whole-section layer) came from **not** applying this consistently. Use **only** these bands unless you have a documented exception:

| Layer | Typical value | Used for (this repo) |
|--------|----------------|----------------------|
| **Page / hero back** | `0` | Hero decorative layers under copy (`Hero.tsx` absolute `z-0`) |
| **Atmosphere** | `10` | `AlchemyBackground` — `position: fixed`, `pointer-events-none`, low-opacity SVGs only |
| **Section foreground** | `20` | Major in-flow content that must read above the fixed atmosphere: section shells (`Services`, `Contact`), hero copy container, section intros, dense grids (e.g. `Products` cards), carousel tiles (`Guides` `article`). Optional **`isolate`** where stacking with siblings/overflow gets confusing. |
| **Local controls** | `20` (same band) | Small interactive controls that sit in a flex row **beside** `overflow-*` tracks (e.g. Guides prev/next): give the **control** `position: relative` + `z-index: 20` — **not** the whole section — so they stack above `z-10` without flattening the whole block. |
| **Header** | `50` | `Header` — fixed nav above page content |
| **Modals** | `100` | Full-screen scrim + dialog (`Products` kit modal, `Guides` coming-soon). **Use `z-[100]` for all** so layers stay predictable. |

**Why it was confusing:** `AlchemyBackground` is a **sibling** of `main` (both under the app root), not a child of each section. A white **section** (`bg-white`) still leaves **flex children** (e.g. carousel arrows vs `overflow-x-auto` track) in subtle stacking orders; a control without `z-index` can end up **under** the fixed `z-10` layer in some compositions. Raising **`z-20` on an entire section** fixes that but also **hides the atmosphere for the whole band** — too heavy. Prefer **targeted** `relative` + `z-20` on the element that needs it.

**Tailwind CDN caveat (buttons):** Preflight can reset `button` backgrounds in ways that fight plain inline `backgroundColor` alone. Prefer **defined surfaces** (white or gray fills), **visible borders**, **soft shadows**, and **icon color** for contrast on white sections — or scoped CSS / non-`button` patterns if needed. Example: `Guides` carousel controls stay **white** with gray-600/900 border and chevron weight for separation from the page.

---

## Motion

- **Global:** `scroll-behavior: smooth` on `body` (`index.html`).
- **Interactions:** Short `transition-colors` (and similar) on hovers; scroll-driven motion is isolated to `AlchemyBackground` — keep new animations **subtle** and respect `prefers-reduced-motion` if you add significant motion later.

---

## Maintaining this doc

When you change fonts, grays, button styles, the β△ mark, or platform accent hex values in code, **update this file in the same PR** so designers, contractors, and AI tools stay aligned. If **core neutrals, primary chrome, or catalog platform colors** change, update [`public/brand-tokens.css`](../public/brand-tokens.css) in the same PR (catalog UI in `Products.tsx` reads those variables) and remind downstream repos to refresh their copy.

**Cursor:** The messaging rule should list this file — see [`.cursor/rules/brand-alchemy-messaging.mdc`](../.cursor/rules/brand-alchemy-messaging.mdc).
