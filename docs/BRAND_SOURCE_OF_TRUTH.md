# Brand source of truth (sister sites & products)

**This repository** (Brand Alchemy main marketing / landing page) is the **canonical home** for the **parent brand**: how we look, how we sound, and how we name things at the company level.

Other properties—product landing pages, microsites, apps—should **follow these docs** rather than invent parallel rules. When something must differ for a product (for example an accent color), document that **as an intentional exception** in the product repo and keep the parent rules as the default.

---

## Canonical documents (read in this order for new work)

| Document | What it covers |
|----------|----------------|
| [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md) | Who we serve and who we do not. |
| [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) | Voice, tone, vocabulary, product naming, CTAs, engagement. |
| [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) | Typography, color, imagery, β△ mark, layout, motion, UI weight. |
| [`public/brand-tokens.css`](../public/brand-tokens.css) | CSS variables: neutrals, chrome, scrim, and catalog platform tints (`--ba-catalog-*`). |
| [CATALOG_TIER_TEXT_STYLES.md](CATALOG_TIER_TEXT_STYLES.md) | Core / Pro–style labels where those tiers apply (optional for sites that do not use that catalog language). |

Implementation on **this** site lives in `index.html`, `public/brand-tokens.css`, `App.tsx`, and `components/`. When you change fonts, colors, or the mark here, **update [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) (and playbook if copy rules change) in the same change**, so the written record stays true. When **shared neutrals, primary chrome, or catalog platform tints** change, update [`public/brand-tokens.css`](../public/brand-tokens.css) and keep `components/Products.tsx` (and the platform table below in the guidelines) aligned.

**PDFs** (lead magnets, internal deliverables, Identity Kit outputs): shared `@react-pdf/renderer` chrome—fonts, symbol-strip footer, PDF neutrals—lives in the **identity-kit** repo as **`@identity-kit/pdf-chrome`**. Reusable **layout blocks** (nav strip, section bands, Do/Avoid formatting, two-column rule, chips, pills, numbered bullets) live in this repo as **`@brand-alchemy/pdf-layout-primitives`**. See [PDF_CHROME.md](PDF_CHROME.md). Identity Kit’s customer-facing PDF pipeline uses pdf-chrome so print and web stay aligned.

---

## What sister repos should do (Phase A)

1. **Link** to this page (or to the four docs above) from the product repo README or internal docs so everyone knows where the rules live.
2. **Before** shipping meaningful UI or marketing copy changes, **check** the canonical docs—especially if you are adding colors, fonts, buttons, headers, or tone shifts.
3. If the live product site **cannot** match the umbrella (stack limits, legacy CSS, etc.), note **what differs and why** in the product repo so it is a conscious choice, not drift.

---

## When we outgrow Phase A

If the same colors, font stacks, spacing, or logo files are **copied in multiple repos** and start to disagree, use the **token file in this repo** as the single numeric source: [`public/brand-tokens.css`](../public/brand-tokens.css). Sister repos should **copy or import it** and re-sync when it changes on `main`. A heavier step later would be an npm package; the CSS file is the lightweight baseline. A large shared React component library is optional and only worth it if several apps need the same chrome.

---

## Reporting drift or proposing updates

- **Drift:** open an issue **in this repository** describing the mismatch (which site, what you expected from the guidelines, what you see). That keeps one place to triage brand fixes.
- **Proposed brand changes:** same—discuss here first when the change should apply **company-wide**; product-only exceptions can stay in the product repo.
