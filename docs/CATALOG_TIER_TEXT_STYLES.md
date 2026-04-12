# Catalog “Core” / “Pro” text styles (handoff)

**Purpose:** Exact typography for **Google** and **Yelp** launch-kit labels so another app (or agent) can match the modal catalog. Implementation: `components/Products.tsx` (`CatalogColumnPreviewPeek`, `renderTierCardsFor`).

**Font:** These strings use **Inter** only (inherited from `body` in `index.html`). They are **not** Source Serif 4.

---

## Global cascade (modal content)

| Layer | Effect on type |
|--------|----------------|
| `body` | `font-family: 'Inter', sans-serif`; `text-gray-900` on body sets default inherited color unless overridden. |
| Tailwind CDN | Preflight; root font size typically 16px. |

---

## A) Peek tiles — “Core” / “Pro” (equal columns, teaser state)

**When:** User has not committed to a single platform column; each column shows two tiles under short copy.

**Element:** `<p>` in `CatalogColumnPreviewPeek` (`item.label` is `Core` or `Pro`).

**Classes:** `text-[10px] font-semibold leading-tight text-gray-800 sm:text-xs`

**Computed intent:**

| Property | Value |
|----------|--------|
| Font family | Inter |
| Font size | 10px; `sm:` and up → `text-xs` (0.75rem ≈ 12px at 16px root) |
| Font weight | 600 (`font-semibold`) |
| Line height | `leading-tight` (1.25) |
| Letter-spacing | normal |
| Text transform | none (sentence case as authored: “Core”, “Pro”) |
| Color | `text-gray-800` (#1f2937 default palette) |

**Tile wrapper (context):** `rounded-xl border border-gray-200 bg-gray-50/80 p-2.5 sm:min-h-[6rem] sm:p-3` (grid `grid-cols-2` when two tiers).

---

## B) Tier rows — “Core” / “Pro” (expanded column)

**When:** User selected Google or Yelp; selectable kit tier cards.

**Element:** `<h5>` in `renderTierCardsFor`.

**Classes:** `text-sm sm:text-base font-bold uppercase tracking-wider`

**Inline style (selected state):** `color: #111` when active, `gray-500` / `var(--ba-gray-500)` when inactive; `transition: color 0.15s ease`.

**Computed intent:**

| Property | Value |
|----------|--------|
| Font family | Inter |
| Font size | `text-sm` (14px); `sm:` → `text-base` (16px) |
| Font weight | 700 (`font-bold`) |
| Letter-spacing | `tracking-wider` (0.05em) |
| Text transform | uppercase |
| Color | Active: `#111` · Inactive: `gray-500` (parent cool ramp) |

**Same row (price, for layout parity):** `text-2xl sm:text-3xl font-light tracking-tight`; color `#111` / `gray-400` by active state.

---

## Parity checklist

1. Peek labels: **semibold**, **not** uppercase, **gray-800**, 10px → 12px at `sm+`.
2. Tier labels: **bold**, **uppercase**, **wider tracking**, 14px → 16px at `sm+`, **#111 / gray-500** by selection.
3. Stack: **Inter** (or document any substitute).

**Code references:** `Products.tsx` — search `CatalogColumnPreviewPeek`, `renderTierCardsFor`, `previewItems`.

**Static tier-row parity:** `components/CatalogStyleTierCards.tsx` reuses the same tier row structure and token colors when a non-interactive surface should still look like the catalog modal. Decorative radio dots mirror the modal; tier labels use the **expanded** row treatment (bold uppercase, Inter). Optional props: `order="pro-first"` (matches `identity-kit` `tierOptions` array order), `dividerBeforeFeatureIndex` when listing **Core + Pro** lines in one card, and `useSparkIconAfterDivider` so Pro-only rows use `ProFeatureSparkIcon` (checks for Core lines), matching `identity-kit` `TierSelector` bullet icons.

**Offer-page comparison:** when the goal is a marketing entry point rather than a pseudo-selector, use `components/MarketingComparisonCards.tsx` instead. That primitive drops selected-state affordances, pairs concise card summaries with a single CTA below the comparison, and can feature a highlighted card with a black peek-tab treatment (for example `AI Enhanced` on the Identity Kit Pro card).
