# Product platform — customer voice & digital product line

**Canonical home:** this folder in the **Brand Alchemy marketing / umbrella repository** (`brand-alchemy-llc-landing-page-main`).

**Purpose:** One system for how **customer-facing generated content** stays consistent across Identity Kit, content packs, local kits, and future digital products — without copying rules into every repo.

---

## Read order

| Document | Role |
|----------|------|
| [**VOICE_SCOPE.md**](./VOICE_SCOPE.md) | **Start here** — three voices; which rules apply where |
| [CUSTOMER_VOICE_AND_PRODUCT_LINE.md](./CUSTOMER_VOICE_AND_PRODUCT_LINE.md) | Architecture, layers, SKU boundaries, process checklist |
| [schemas/brand-context.v1.schema.json](./schemas/brand-context.v1.schema.json) | Machine-readable **brand context** export shape (v1) |
| [SECTION_ID_REGISTRY.md](./SECTION_ID_REGISTRY.md) | Cross-SKU map: which Section IDs each product consumes |

**Sibling context (same repo):**

- Company marketing voice & visuals: [../BRAND_SOURCE_OF_TRUTH.md](../BRAND_SOURCE_OF_TRUTH.md)
- SKU prices & includes: [../PRODUCTS_PRICING_AND_INCLUDES.md](../PRODUCTS_PRICING_AND_INCLUDES.md)
- Funnel & bumps: [../ACQUISITION_FUNNEL_AND_SKU_MAP.md](../ACQUISITION_FUNNEL_AND_SKU_MAP.md)

**Implementation (identity-kit repo — do not duplicate platform rules there):**

- Generation contract detail: `identity-kit/OUTPUT_TRANSLATION_SPEC.md`
- CSP hybrid spec: `identity-kit/docs/specs/CONTENT_STARTER_PACK.md`
- Persistence memo: `identity-kit/docs/research/PRO_OUTPUT_PERSISTENCE_AND_MEMORY.md`

---

## Sister repos: what to do

1. **Link here** from the product repo README (see identity-kit for the pattern).
2. **Do not fork** product-line boundaries or `brand-context` schema — propose changes **in this repo** first.
3. **Implement** Section IDs, scaffolds, PDFs, and fulfillment in the product repo that owns the SKU (Identity Kit today).
4. **Import** shared PDF chrome from `@identity-kit/pdf-chrome` when generating PDFs (already wired in this repo’s `packages/pdf-layout-primitives`).

When a second product repo needs **npm-importable** types (not just docs), add `packages/voice-contracts` **here** and publish or `file:`-link — same pattern as `brand-tokens.css` today.

---

## When to edit this folder

| Change | Edit here first? |
|--------|------------------|
| New SKU (Social pack, Email pack, …) | Yes — update SECTION_ID_REGISTRY + pricing doc |
| CSP section boundaries vs channel packs | Yes — CUSTOMER_VOICE doc |
| `brand-context.json` field added | Yes — schema + CUSTOMER_VOICE doc |
| New walker / banned vocab for **generated kit** copy | Yes (policy); implement in identity-kit |
| Pack template captions (Social Content Pack) | [VOICE_SCOPE.md](./VOICE_SCOPE.md) + [digital-product-research/](../digital-product-research/) — **not** platform walkers |
| Identity Kit folio layout / path class routing | No — identity-kit only (link back here if a new SKU consumes it) |
