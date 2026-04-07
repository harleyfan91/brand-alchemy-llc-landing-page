# PDF chrome (`@identity-kit/pdf-chrome`)

Internal lead magnets, one-off PDFs, and future tooling can share the same **footer, fonts, and neutrals** as Identity Kit by depending on the **`@identity-kit/pdf-chrome`** package from the **identity-kit** repository (path: `packages/pdf-chrome/`).

## What it provides

- **`registerBrandPdfFonts()`** — Inter + Source Serif 4 for `@react-pdf/renderer`
- **`PageFooterChrome`** — Symbol strip + “BRAND ALCHEMY” wordmark (strip requires `@identity-kit/brand-assets`)
- **`pdfPageBottomPadding` / `FOOTER_CHROME_HEIGHT`** — Reserve bottom space on each `Page`
- **`BRAND_PDF_COLORS`** — Fixed neutrals for body copy (`bodyText`, `wordmarkGray`, …)

Authoritative API and usage: **`identity-kit/packages/pdf-chrome/README.md`**.

## Installing in this monorepo

`@identity-kit/pdf-chrome` is **not published to npm** yet. With **identity-kit** cloned as a **sibling** of this repo (`../identity-kit`), install via `file:` (see `packages/pdf-shell-sample/package.json`).

```text
parent/
  brand-alchemy-llc-landing-page-main/   ← this repo
  identity-kit/                          ← sibling clone
    packages/pdf-chrome/
    packages/brand-assets/
```

If the sibling path is missing, `npm install` at this repo root will fail until you adjust or remove the `packages/pdf-shell-sample` workspace (or point `file:` at a git URL / tarball).

## Sample output

From this repo root (after a successful install):

```bash
npm run pdf:sample
```

Writes **`packages/pdf-shell-sample/output/sample-layout-primitives.pdf`** — a two-page Letter reference: shared footer/fonts plus **`@brand-alchemy/pdf-layout-primitives`** (nav strip, section band, Do/Avoid row, two-column rule, chips, pills, numbered bullets). See **`packages/pdf-layout-primitives/README.md`** for export names.

## Symlinked `file:` installs and `@react-pdf/renderer`

If you depend on `@identity-kit/pdf-chrome` via `file:../../../identity-kit/packages/pdf-chrome`, Node may resolve **`@react-pdf/renderer` twice** (once from this repo’s `node_modules`, once from identity-kit’s). `Font.register()` then applies to a different instance than `renderToBuffer`, and you get “Font family not registered: Inter”.

The sample in `packages/pdf-shell-sample` avoids that by **importing `@react-pdf/renderer` from the sibling identity-kit tree** (see comment at the top of `generate-sample-pdf.mjs`). After **npm publish** (or installing from a tarball so pdf-chrome lives under this repo’s `node_modules` without a symlink), a normal `import from '@react-pdf/renderer'` is usually enough.

## Parent-brand accents (lead magnets vs Identity Kit)

**`BRAND_PDF_COLORS`** (pdf-chrome) is the fixed neutral ramp for PDF **body copy** everywhere.

Identity Kit’s **CoreKitDocuments** also applies **customer survey palettes** (ocean, forest, `minimal_light`, …) to **nav strips and section bands** — that color is **product personalization**, not the parent company palette.

For **umbrella PDFs** in this repo, use **`BRAND_PDF_PARENT_UI`** from `@brand-alchemy/pdf-layout-primitives` (hex aligned with [`public/brand-tokens.css`](../public/brand-tokens.css): black primary, Tailwind grays). See **`packages/pdf-layout-primitives/README.md`**.

## Relationship to canonical brand docs

Typography and tone for **web** remain in [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) and [BRAND_SOURCE_OF_TRUTH.md](BRAND_SOURCE_OF_TRUTH.md). PDF-specific neutrals come from **`BRAND_PDF_COLORS`** in pdf-chrome; keep them aligned when you change corporate grays site-wide. When you change **`--ba-gray-*`** or **`--ba-color-primary`** in `brand-tokens.css`, update **`brand-pdf-parent-ui.mjs`** in the same change.
