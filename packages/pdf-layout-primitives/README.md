# `@brand-alchemy/pdf-layout-primitives`

Reusable **formatting-only** building blocks for Brand Alchemy PDFs, aligned with Identity Kit’s `@react-pdf/renderer` layouts. Pass real copy from your product or lead magnet; this package does not ship Identity Kit text.

**Depends on:** `@identity-kit/pdf-chrome` (`BRAND_PDF_COLORS`, fonts, footer metrics).

## Parent brand vs Identity Kit palette colors

- **`BRAND_PDF_COLORS`** (from `@identity-kit/pdf-chrome`) — fixed neutrals for PDF body copy and labels (zinc-like grays). Used everywhere for **text**, including Identity Kit.

- **Identity Kit customer PDFs** (`CoreKitDocuments.tsx`) also use **survey palette swatches** (e.g. ocean, forest, `minimal_light`) for **colored nav segments and section bands** — that chroma is **personalization**, not the parent “Brand Alchemy blue.”

- **Umbrella / lead-magnet PDFs** should lean on **black + Tailwind gray ramp** from the marketing site. This package exports **`BRAND_PDF_PARENT_UI`** — hex values aligned with `public/brand-tokens.css` (`--ba-gray-*`, `--ba-color-primary`). Use `navSegmentRamp`, `primary`, `doAnchor`, `avoidAnchor`, etc., instead of kit palette blues.

## Usage

```js
import { createElement as h } from 'react'
import { BRAND_PDF_COLORS } from '@identity-kit/pdf-chrome'
import { createLayoutPrimitives } from '@brand-alchemy/pdf-layout-primitives'

const { Text, View, StyleSheet } = await import(/* identity-kit react-pdf path */)
const L = createLayoutPrimitives({ h, Text, View, StyleSheet, BRAND: BRAND_PDF_COLORS })

// Then: h(L.KitNavStrip, { ... }), etc.
```

## Component catalog (import names)

| Export | Role |
|--------|------|
| `KitNavStrip` | Colored horizontal segments; **active** segment shows uppercase label (Identity Kit tab strip). Props: `segments: { id, label, backgroundColor }[]`, `activeId`. |
| `SectionEyebrowBand` | Full-bleed band + Inter eyebrow caps. Props: `label`, `bandColor` (hex). |
| `SectionBody` | Standard horizontal padding for content under a band. Props: `children`. |
| `DoAvoidLargeWordRow` | Large Source Serif anchor word + column of symbol + lines. Props: `anchorWord`, `lines[]`, `bulletSymbol` (e.g. `✓`), `anchorColor`, optional `symbolColor`. |
| `TwoColumnWithVerticalRule` | Two text columns with vertical hairline. Props: `leftText`, `rightText`. |
| `ToneDescriptorChipRow` | Wrapped “label + value” chips (gray pill). Props: `chips: { label, value }[]`. |
| `ValuePillRow` | Rounded pills with accent-colored text. Props: `pills[]`, `accentHex`, optional `backgroundColor`. |
| `NumberedBulletGroup` | Optional `groupLabel` + numbered lines (`01`, `02`, …). Props: `groupLabel?`, `lines[]`. |
| `MiniCapsHeader` | Small uppercase gray mini-header (typography subheads, theme labels). Props: `label`, optional `marginBottom`. |
| `MessagingThemeNumberedBlock` | Voice Playbook pattern: uppercase gray preheader + numbered list. Props: `preheader`, `lines[]`. |
| `BoxedMiniHeader` | Rectangular mini-header chip (uppercase label in a filled box). Props: `label`, optional `backgroundColor`, `textColor`. |
| `BeforeAfterColumns` | Two-column Before/After format with boxed mini-headers and column divider. Props: `beforeText`, `afterText`, optional label/color overrides. |
| `PrimitiveReferenceHeading` | Bold name + description (for internal reference PDFs only). |

Also exported: `FULL_PDF_WIDTH` (`612`), `styles` (raw StyleSheet for overrides), `isDark` / `onColor`, kit nav **metrics** from `./metrics.mjs`.

## Identity Kit parity

Styles mirror `packages/generation/src/pdf/CoreKitDocuments.tsx` for: kit nav, `sectionBand` / `sectionBody`, Do/Avoid row, tone chips, value pills, numbered bullets, two-column + rule.

When Identity Kit changes those tokens, update this package to match.
