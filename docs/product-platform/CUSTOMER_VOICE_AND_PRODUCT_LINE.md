# Customer voice & digital product line

**Status:** v1 platform contract (May 2026).  
**Canonical location:** `docs/product-platform/` in the **umbrella / marketing repository** — not in identity-kit.

**Why here:** Brand Alchemy is the **parent** product company; Identity Kit is one **child** SKU. Content packs, local kits, and Camentra-adjacent offers share one customer journey ([ACQUISITION_FUNNEL_AND_SKU_MAP.md](../ACQUISITION_FUNNEL_AND_SKU_MAP.md)). Rules for *how any product speaks in the buyer’s voice* belong at the parent layer so new repos reference one system instead of re-creating it.

---

## Two voices (do not merge)

**Superseded by three voices:** see [`VOICE_SCOPE.md`](./VOICE_SCOPE.md) — canonical decision tree. Summary below; when in doubt, read VOICE_SCOPE.

| Voice | Owner | Examples |
|-------|--------|----------|
| **Parent Brand Alchemy** | This repo — [BRAND_PLAYBOOK.md](../BRAND_PLAYBOOK.md) | Homepage, articles, “See the system,” kit marketing pages |
| **End-customer marketing (pack templates)** | [DIGITAL_PRODUCT_CONTENT_SCHEMA.md](../DIGITAL_PRODUCT_CONTENT_SCHEMA.md) + comp library | Social Content Pack captions, promo templates in PDFs |
| **Customer brand** (generated) | Product platform walkers + identity-kit implementation | Identity Kit PDFs, CSP, personalized blocks from intake |

AI prompts for customer deliverables must **never** confuse the three. **Marketing copy rules (voice 1) do not govern pack templates (voice 2).** Platform walkers (voice 3) do not govern static pack templates (voice 2).

---

## Architecture: four layers

```
Layer 0  Parent brand (marketing site docs + brand-tokens.css)
Layer 1  Generation contract (walkers, Section IDs, narrator/industry rails)
Layer 2  Brand context (per-order JSON — intake + section outputs)
Layer 3  Product templates (SKU-specific PDFs / packs — consume Layer 2)
```

### Layer 0 — Parent brand

Already canonical in this repo. Sister products sync visuals via `public/brand-tokens.css` and [PDF_CHROME.md](../PDF_CHROME.md).

### Layer 1 — Generation contract

**Policy lives here; code lives in identity-kit (for now).**

| Contract piece | Canonical policy | Implementation home |
|----------------|------------------|---------------------|
| Section ID names & cross-SKU usage | [SECTION_ID_REGISTRY.md](./SECTION_ID_REGISTRY.md) | `identity-kit/OUTPUT_TRANSLATION_SPEC.md` §1 |
| Customer copy walkers (banned vocab, claim-safety, CTA rules) | This doc § Walkers | `identity-kit/packages/generation` (target: `ai/walkers/`) |
| Narrator / industry strategy rails | Referenced here; tables in kit | `identity-kit/packages/shared`, `narratorProfiles.ts` |
| Hybrid scaffold-first generation | `identity-kit/docs/specs/CONTENT_STARTER_PACK.md` (sibling repo) | `contentStarterScaffolds.ts`, etc. |

**Rule for new digital products:** Reuse Layer 1 — do not invent a second tone system per SKU.

### Layer 2 — Brand context export

**Single machine artifact per fulfilled Identity Kit order** — the bridge to Social pack, Email pack, local kit personalization, and optional “paste into ChatGPT” workflows.

- **Schema:** [schemas/brand-context.v1.schema.json](./schemas/brand-context.v1.schema.json)
- **Assembly:** Deterministic merge of `intake_snapshot` + structured `kit_section_outputs` (no extra LLM cost)
- **Persistence design:** `identity-kit/docs/research/PRO_OUTPUT_PERSISTENCE_AND_MEMORY.md`

Identity Kit fulfillment **writes** brand context; channel packs **read** it.

### Layer 3 — Product templates

Each SKU is a **template library + assembler**, not a new brand strategist.

See [SECTION_ID_REGISTRY.md](./SECTION_ID_REGISTRY.md) for the SKU → Section ID matrix.

---

## Product boundaries (avoid duplicate work)

### Identity Kit — Content Starter Pack (in-kit, Pro)

**Role:** First **horizontal** applied-copy slice — summaries, bios, pillars, caption seeds.  
**Not:** Full social calendar, full email program, or local listing walkthrough.

| CSP section | Feeds future SKU |
|-------------|------------------|
| `csp.oneLiner` / `csp.elevator` / `csp.paragraph` | Core Content Pack (routine updates) |
| `csp.bioShort` / `csp.bioLong` | Social + Email packs (about/ bio blocks) |
| `csp.captionStarters` | **Social Content Pack** (extend, don’t regenerate from scratch) |
| `csp.contentPillars` | All channel packs (theme names stable) |
| `voice.ctaVariations` | Social + Email CTAs (single source; CSP is render alias) |
| `voice.email.*` (Voice p3) | **Email Content Pack** (extend with more templates) |

### Standalone packs (marketing catalog)

| SKU | Price | Relationship to kit |
|-----|-------|---------------------|
| Social Content Pack | $19 | **Depth** on captions, hooks, stories — consumes `brand-context` voice + pillars + caption starters |
| Email Content Pack | $29 | **Depth** on sequences — consumes `voice.email.*`, bios, transformation |
| Core Content Pack | $29 | Routine posts (hours, news) — consumes pillars + offer line |
| Holidays & Events | $39 | Seasonal templates — consumes voice + pillars only |

**Funnel copy already states:** Voice Playbook **personalizes** local Google/Yelp review templates. Automation path: local kits read `brand-context.voice` + sample phrases, not full PDF text.

---

## Walkers (customer copy quality gate)

**Scope:** AI-generated **personalized** strings from Identity Kit intake (bios, CSP sections, voice blocks) — not static template libraries (Social Content Pack PDF captions, review reply templates, etc.). Those use [`DIGITAL_PRODUCT_CONTENT_SCHEMA.md`](../DIGITAL_PRODUCT_CONTENT_SCHEMA.md) — social packs use the **short gate** only.

Every **generated kit** customer-facing string must pass the walker chain before ship:

1. **Banned vocabulary** (marketing jargon, “authentic,” “leverage,” etc.)
2. **Claim-safety** — no fabricated metrics, offers, or outcomes not in intake
3. **CTA rules** — inherit narrator `cta_type`; paste-ready length; no ranking promises (local kits)
4. **Em-dash budget** — per product spec (kit: ≤1 per visible block where specified)
5. **Citation discipline** — analytical sections require `fieldsCited`; applied copy cites intake fields used

Walker **policy** is owned in this folder; **implementation** ships in identity-kit generation package. New products call the same walkers — do not fork.

---

## Process: adding or changing a digital product

1. **SKU definition** — Update [PRODUCTS_PRICING_AND_INCLUDES.md](../PRODUCTS_PRICING_AND_INCLUDES.md) and [ACQUISITION_FUNNEL_AND_SKU_MAP.md](../ACQUISITION_FUNNEL_AND_SKU_MAP.md).
2. **Section consumption** — Update [SECTION_ID_REGISTRY.md](./SECTION_ID_REGISTRY.md): which `brand-context` paths the SKU requires.
3. **Boundary check** — Confirm no overlap with CSP / Voice unless intentional “extend” relationship (document in registry).
4. **Implement** in the owning repo (Identity Kit for kit sections; landing repo for local lead-magnet PDFs until a pack generator exists).
5. **PDF chrome** — Use `@identity-kit/pdf-chrome` for customer PDFs ([PDF_CHROME.md](../PDF_CHROME.md)).
6. **Propose contract changes here first** if a new Section ID or `brand-context` field is needed.

---

## Repo ownership summary

| Concern | Canonical repo | Notes |
|---------|----------------|-------|
| Product line & brand context schema | **Umbrella (this repo)** | `docs/product-platform/` |
| Parent marketing voice & SKUs | **Umbrella** | `docs/BRAND_*`, pricing, funnel |
| Intake wizard, fulfillment, kit PDFs | **identity-kit** | Child product |
| `kit_section_outputs` DB rows | **identity-kit** API (Stage 4) | Rows conform to schema here |
| Local launch kit PDF samples | **Umbrella** | `packages/pdf-shell-sample` |
| Shared PDF layout primitives | **Umbrella** | `@brand-alchemy/pdf-layout-primitives` |
| Shared PDF footer/fonts | **identity-kit** | `@identity-kit/pdf-chrome` |

---

## Evolution: npm package (when needed)

Today: **docs + JSON schema** in this repo; identity-kit implements.

When a second repo generates customer copy (e.g. standalone Social pack service):

1. Add `packages/voice-contracts` **here** with TypeScript types generated from `brand-context.v1.schema.json`.
2. Walker interfaces exported from same package or from identity-kit with re-export here.
3. Product repos depend via `file:../brand-alchemy-llc-landing-page-main/packages/voice-contracts` until published.

Do **not** duplicate the schema in identity-kit — import or code-gen from this repo.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-28 | Initial platform contract; brand-context v1 schema; SKU boundary matrix |
