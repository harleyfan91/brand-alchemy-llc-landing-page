# Brand source of truth (sister sites & products)

**Read this file first.** It is the **single entry point** for Brand Alchemy’s **parent brand**: who we serve, what we are trying to accomplish, how the homepage and products tell that story, how **articles and SEO** fit the growth plan, and where the detailed specifications live. Other docs go deeper; this one orients a new teammate, contractor, or sister product without guesswork.

**This repository** (Brand Alchemy main marketing / landing page) is the **canonical home** for company-level **voice, visuals, naming, and pricing narrative**. Other properties—product apps, microsites—should **follow these docs** rather than invent parallel rules. When something must differ for a product (for example an accent color), document that **as an intentional exception** in the product repo and keep the parent rules as the default.

---

## Who we serve (brand-level)

We exist for **small, owner-operated businesses**: local shops and services, trades, solo operators, marketplace sellers, hospitality, and similar. They are **experts in their craft**, not in marketing tech, brand theory, or agency jargon. We **do not** optimize copy for developers, professional growth marketers, or agencies shopping white-label. Full exclusions and messaging implications: [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md).

---

## Goals: what we are building toward

| Goal | What it means in practice |
|------|---------------------------|
| **Clarity** | Owners can describe how their business **sounds and looks** without hiring an agency first (**Identity Kit** and supporting copy). |
| **Execution without overwhelm** | Kits, templates, and walkthroughs reduce time on reviews, profiles, posts, and photos—**honest scope**, no guaranteed rankings (**local kits**, **content packs**, **Camentra**). |
| **One coherent brand** | Customers experience **one** Brand Alchemy: umbrella site, Identity Kit offer page, and (when linked) apps—same tone and visual system. |
| **Sustainable discovery** | **Articles** and future article pages earn **search and referral traffic**, build trust, and naturally connect readers to the right products. |
| **Commercial ladder** | A clear path from low-friction entry SKUs through deeper tiers and optional add-ons, documented so pricing and bundle math stay honest. See [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md). |

---

## How the story shows up on the site (hub model)

- **Homepage (`/`)** is the **umbrella**: hero, **System** (`#services`), **Products** catalog, **Articles**, contact—not a single-offer funnel. Primary hero action stays **See the system** → explain the model before the catalog.
- **Identity Kit** has a dedicated offer path: **`/identity-kit`** sells the tiers; high-intent traffic can land there. Intake/checkout may live on a subdomain or subpath per deployment; messaging still reads as one site.
- **Guides & launch kits** (`/local-business`) group **local launch kits** (Google / Yelp / bundle) and **content packs** on one page: execution modules that plug into a defined brand, not a separate “strategy.” Page pattern and copy rules: [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (*`/local-business`*). SKU prices and deliverables: [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md).
- **Implementation** wiring: `App.tsx`, `components/HomePage.tsx`, `pages/IdentityKitPage.tsx`, `components/Products.tsx`, `components/Services.tsx`, `components/Articles.tsx`, `components/Hero.tsx`.

---

## System: the three layers (homepage)

The **System** section translates the product ladder into plain language:

1. **Brand foundation** — Start with **Identity Kit** so voice and look are defined first.
2. **Marketing tools & kits** — Catalog of practical kits, guides, and templates.
3. **Visibility & growth** — Outcomes: show up clearly, promote with confidence, build momentum over time.

This mirrors the internal **Brain → Megaphone → Engine** framing in the acquisition doc without putting internal jargon on customer-facing surfaces.

---

## Products at a glance

| Layer | Customer-facing idea | Primary SKUs (see pricing doc for includes) |
|-------|------------------------|---------------------------------------------|
| Foundation | Brand on paper | Identity Kit **Core $79** / **Pro $149** |
| Local execution | **Local launch kits** for Google and Yelp (step-by-step listings, templates, worksheets) | Core **$39** / Pro **$79** per platform; **Google + Yelp Pro bundle $129** |
| Ongoing creative | Photos aligned to kit guidance | **Camentra** Free / Pro (~**$9.99/mo** or ~**$79.99/yr**—confirm in store) |
| Add-ons / standalone | Copy and seasonal support | Content packs per [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md) |

**Source of numeric truth in code:** `components/Products.tsx` (and env-driven Identity Kit URLs). When prices or bundle rules change, update **[PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md)** and **[ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md)** in the **same change** and re-check bundle savings math.

---

## Articles, SEO, and traffic

**Why articles exist:** They bring **qualified organic traffic**, answer questions in our **plain, owner-first voice**, and support **trust** before someone is ready to buy a kit. They are not a parallel “blog brand”; they extend the same promise as the rest of the site.

**Plan**

- **Today:** Homepage **Articles** strip (`#articles`, `components/Articles.tsx`) showcases topics and categories (e.g. Brand Basics, Social Media, Get Found) framed as **owner questions**, with editorial rules in code comments—see also [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (*Content, articles, and SEO*).
- **Next:** Ship **real article routes** (index + detail, slug-based URLs TBD): full HTML, **title** and **meta description** per piece, internal links into catalog and offer pages where helpful for the reader and for crawl paths.
- **Later:** Measure search impressions, clicks, and article → product scroll paths to prioritize topics and on-page CTAs.

Until article pages ship, treat the strip as the **editorial and SEO commitment**, not the full searchable archive.

---

## Tone (one-paragraph contract)

**Premium, warm, direct—never cold or jargony.** Plain language, concrete outcomes, no SaaS or growth-hacker voice, no promises we cannot keep. Full rules, vocabulary, CTAs, and engagement posture: [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md). **Visuals** (fonts, color, β△, layout): [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md).

---

## Canonical documents (read in this order for new work)

| Document | What it covers |
|----------|----------------|
| [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md) | Who we serve and who we do not. |
| [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) | Voice, tone, products, **articles and SEO intent**, CTAs, engagement. |
| [ARTICLE_RESEARCH_SYSTEM.md](ARTICLE_RESEARCH_SYSTEM.md) | Article topic research, candidate brief schema, backlog. |
| [ARTICLE_WRITING_SCHEMA.md](ARTICLE_WRITING_SCHEMA.md) | Article draft stages, on-page structure, visual and publish QA. |
| [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) | Typography, color, imagery, β△ mark, layout, motion, UI weight. |
| [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md) + [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) | **Pair:** **Pricing doc** = prices and SKU deliverables (source of truth for what’s in each product). **Acquisition doc** = story, ladder, bundle logic, bumps, checklists. Each references the other; update both when prices or includes change. |
| [`public/brand-tokens.css`](../public/brand-tokens.css) | CSS variables: neutrals, chrome, scrim, catalog platform tints (`--ba-catalog-*`). |
| [CATALOG_TIER_TEXT_STYLES.md](CATALOG_TIER_TEXT_STYLES.md) | Core / Pro–style labels where those tiers apply (optional for sites that do not use that catalog language). |
| [PDF_CHROME.md](PDF_CHROME.md) | Shared PDF chrome packages and parent vs Identity Kit color roles. |

Implementation on **this** site lives in `index.html`, `public/brand-tokens.css`, `App.tsx`, and `components/`. When you change fonts, colors, or the mark here, **update [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) (and playbook if copy rules change) in the same change**, so the written record stays true. When **shared neutrals, primary chrome, or catalog platform tints** change, update [`public/brand-tokens.css`](../public/brand-tokens.css) and keep `components/Products.tsx` (and the platform table in the guidelines) aligned.

**PDFs** (lead magnets, internal deliverables, Identity Kit outputs): shared `@react-pdf/renderer` chrome—fonts, symbol-strip footer, PDF neutrals—lives in the **identity-kit** repo as **`@identity-kit/pdf-chrome`**. Reusable **layout blocks** (nav strip, section bands, Do/Avoid formatting, two-column rule, chips, pills, numbered bullets) live in this repo as **`@brand-alchemy/pdf-layout-primitives`**. See [PDF_CHROME.md](PDF_CHROME.md). Identity Kit’s customer-facing PDF pipeline uses pdf-chrome so print and web stay aligned.

---

## What sister repos should do (Phase A)

1. **Link** to this page from the product repo README or internal docs so everyone knows where the rules live.
2. **Before** shipping meaningful UI or marketing copy changes, **check** the canonical docs—especially if you are adding colors, fonts, buttons, headers, or tone shifts.
3. If the live product site **cannot** match the umbrella (stack limits, legacy CSS, etc.), note **what differs and why** in the product repo so it is a conscious choice, not drift.

---

## When we outgrow Phase A

If the same colors, font stacks, spacing, or logo files are **copied in multiple repos** and start to disagree, use the **token file in this repo** as the single numeric source: [`public/brand-tokens.css`](../public/brand-tokens.css). Sister repos should **copy or import it** and re-sync when it changes on `main`. A heavier step later would be an npm package; the CSS file is the lightweight baseline. A large shared React component library is optional and only worth it if several apps need the same chrome.

### Sister repo: refresh after a neutral / gray change

When this repo updates `--ba-gray-*` (or Tailwind wiring in `index.html`), downstream apps should:

1. **Copy** the new [`public/brand-tokens.css`](../public/brand-tokens.css) (or your vendored path).
2. **Map framework neutrals** to the same values: if the app uses Tailwind, point `theme.colors.gray` at `var(--ba-gray-*)` like this site; if it uses MUI/Chakra/etc., set the grey palette from the same hex table once.
3. **Search** for hardcoded legacy neutrals (`#f3f4f6`, `#111827`, `#6b7280`, old Tailwind defaults) and replace with tokens or theme.
4. **Document** intentional exceptions in the product README (Phase A).
5. **Identity Kit customer PDFs** — survey-driven nav/band colors stay separate; only **parent** chrome follows `--ba-gray-*` / `BRAND_PDF_PARENT_UI` (see [PDF_CHROME.md](PDF_CHROME.md)).

---

## Reporting drift or proposing updates

- **Drift:** open an issue **in this repository** describing the mismatch (which site, what you expected from the guidelines, what you see). That keeps one place to triage brand fixes.
- **Proposed brand changes:** same—discuss here first when the change should apply **company-wide**; product-only exceptions can stay in the product repo.
