# Brand playbook (canonical reference)

**Purpose:** Companion to [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md). Keeps **tone**, **how we talk about products**, and **how we engage** explicit so copy, UX, and new offers stay consistent as the site grows. **Visual system** (fonts, colors, symbols) lives in [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md).

---

## Doc map (what lives where)

| Topic | Document |
|--------|----------|
| Who we serve / who we do *not* serve | [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md) |
| Voice, tone, vocabulary | This file — *Tone & voice* |
| Naming and listing products | This file — *Products & offerings* |
| Articles, SEO intent, content categories | This file — *Content, articles, and SEO* |
| CTAs, contact, relationship posture | This file — *Engagement* |
| Fonts, colors, imagery, β△ mark, UI weight | [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) |
| Sister sites / products: canonical home, drift, Phase A | [BRAND_SOURCE_OF_TRUTH.md](BRAND_SOURCE_OF_TRUTH.md) |
| Acquisition funnel, SKU map, bump/retain strategy | [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) |

---

## Tone & voice

**North star:** Premium and intentional, but **never cold or jargony**. We sound like a calm expert who respects that the reader is busy and not in marketing.

**Do**

- Use **plain language**, short sentences, and **concrete outcomes** (what they can do, what customers will notice).
- Acknowledge constraints: time, budget, no design team, no marketing background (aligned with the **System** section on the homepage and product copy elsewhere).
- Prefer **steps, kits, templates, guides** over abstract “strategy” unless we immediately explain what that means in their world.
- **Confident, warm, direct** — invite action without hype or fear-based urgency.

**Avoid**

- SaaS / startup slang, acronyms without explanation, “growth hacking,” funnel-speak.
- Talking down or over-explaining basic life context (they know their business; they may not know branding terms).
- Promises we cannot keep (guaranteed rankings, overnight results).

**Visual/copy relationship (site):** Strong headline presence (including serif accents where used), restrained body copy — let clarity do the work.

---

## Products & offerings

**Principles when we add or rename anything**

1. **Name for the owner, not the industry insider.** The title should read like something they’d search for or recognize (“Google Business profile,” “Yelp,” “photo angles,” not opaque product codenames).
2. **One clear promise per card or row** — what problem it reduces or what outcome it enables.
3. **Honest scope:** say what the kit or service *is* (step-by-step, templates, settings guidance) vs. what it is *not* (full ad management forever, legal advice).
4. **Tiering:** if we use Core / Pro (or similar), define what “everything in X” means and add new bullets to the playbook table below when we ship.

**Living catalog (update when the site or store changes)**

The homepage **System** block (`#services`, `components/Services.tsx`) explains *how we think* in three layers. The table below ties that story to **named products** and **content**.

| Offering | Who it’s for | Promise in one line | Notes / boundaries |
|----------|----------------|---------------------|-------------------|
| **System — Brand foundation** (site story, not a SKU name) | Owner-operated businesses | Voice and look on paper first, so nothing else feels pieced together | Leads with **Identity Kit**; eyebrow label **System** on the homepage |
| **System — Marketing tools & kits** | DIY operators and busy owners | Practical kits, guides, and templates without a marketing background | **Products** catalog: local kits, content packs, bundles — `components/Products.tsx` |
| **System — Visibility & growth** | Anyone building local or digital presence | Show up more clearly and build momentum over time | Outcome layer; reinforced by local kits, articles, and **Camentra** |
| Identity Kit (Core / Pro) | Owners who want brand voice + look on paper | Guided intake → PDFs by email | Core **$79** / Pro **$149**; funnel role in [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) |
| Google Core / Pro kits; Yelp Core / Pro kits; **Google + Yelp Pro bundle** | Local businesses on those platforms | **Local launch kits:** walkthrough, review templates, plain-language listing tips, worksheets—not a generic “paid setup” pitch | Core **$39** / Pro **$79**; bundle **$129**; SKUs in [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md); page pattern below |
| Content packs (**Core Content Pack**, **Holidays & Events Content Pack**, **Social Content Pack**, **Email Content Pack**) | Owners creating their own content | Templates and easy to use guides; Core pack is year-round routine content, not social-only or email-only | **Standalone** purchases unless checkout offers a bump; **photo framing / angles → Camentra**, not a competing PDF |
| Camentra (app) | Owners taking business photos | Templates, guidance, AI coach (Pro) | Subscription via app store; optional post-kit Pro promo — see funnel map |
| **Articles** (editorial) | Same audience as the site | Plain, practical explainers that answer real owner questions | Supports **trust and SEO** when index/detail pages ship; see *Content, articles, and SEO* below |

Add a row for **each new SKU or service line** so the table stays the checklist before publishing copy.

**`/local-business` (Guides & launch kits)** — Dedicated page for local execution products; implementation `pages/GuidesAndKitsPage.tsx`. **Eyebrows:** Local business (hero), Free sample, Local launch kits, Content packs. **Headlines:** H1 *Guides & launch kits*; section H2s include *Your free local-business preview*, *Set up your local listings with ease.*, *Content starters for what you publish*. Lead magnet: industry + email for a sample (photo best practices, review response templates, short listings audit). Use **local launch kits** (not deprecated “conversion library”). Content pack **card blurbs:** `content/contentPacks.ts`. **Pricing and what’s inside each SKU:** [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md)—not page layout.

---

## Content, articles, and SEO

**Role on the site:** **Articles** is the long-game **content and organic discovery** lane on the marketing homepage (`#articles`, `components/Articles.tsx`). It complements the catalog: products sell concrete kits and tools; articles earn attention, clarify problems in our voice, and build **topical authority** for search and referral traffic.

**What we publish**

- **Format:** Practical explainers and guide-style pieces—not generic “thought leadership” for marketers or agency readers.
- **Categories** (tile labels such as *Brand Basics*, *Social Media*, *Get Found*) should read like **questions or concerns an owner would recognize**, not internal channel jargon.
- **Topics:** Immediate problems—what to post, what to fix first, profiles, photos, local visibility, time and budget. **Help first**; tie in paid products only where it fits naturally, never as a hard sell.
- **Quality bar:** Prefer a few strong articles over many thin or placeholder posts.
- **Published date:** Shown in **article page chrome** (below the breadcrumb), driven by `date_published` in the article file’s YAML — not as a sign-off line in the markdown body. Editorial articles are Brand Alchemy by default; **do not** add a redundant `author` field for house pieces. Use a named byline in frontmatter + chrome only when a **documented guest or co-author** exists (rare). (Matches editorial QA in [ARTICLE_WRITING_SCHEMA.md](ARTICLE_WRITING_SCHEMA.md).) Topic discovery and candidate briefs: [ARTICLE_RESEARCH_SYSTEM.md](ARTICLE_RESEARCH_SYSTEM.md).
- **Product CTA on shipped article pages:** One optional callout per piece, driven by a single `<!-- ARTICLE_CTA_SLOT -->` in the markdown and rendered in React (tab + card + text link). Tab line vs. callout body must follow **Naming: tab vs. body** in [ARTICLE_WRITING_SCHEMA.md](ARTICLE_WRITING_SCHEMA.md) (**CTA rules**). Do not add a second product pitch in prose before the FAQ.
- **Punctuation (owner-facing tone):** Prefer commas, periods, colons, and parentheses over long **em dashes (—)**. An em dash is fine occasionally for a sharp aside; **many per article** reads like generic AI copy and wears readers out. See [ARTICLE_WRITING_SCHEMA.md](ARTICLE_WRITING_SCHEMA.md) (*Body sections* — emphasis, statistics, and punctuation).
- **Emphasis in articles:** Bold is a scarce signal. Use it mainly for defined terms and the occasional one-beat takeaway, not for every important-sounding word. **Survey numbers and percentages** usually stay in normal weight; named sources in parentheses (or italic publication titles) carry the “verified” feel. Full pattern: same schema section.

**SEO and traffic (how we plan to use it)**

1. **Discoverability:** Each shipped article is a real **HTML page** with a stable **URL** (e.g. `/articles/:slug`), unique **title** and **meta description** written for humans first, aligned with [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md) reading level and vocabulary.
2. **Internal links:** Link from articles to the relevant catalog sections or offer pages (for example Identity Kit, local kits) where it genuinely helps the reader—strengthens crawl paths and clarifies the product ladder without feeling spammy.
3. **Homepage strip:** The carousel on `/` is the **teaser**; it can remain even after an article index exists. Nav today uses **`#articles`** on the homepage; later, **Articles** in the header can point to a dedicated index route while anchors on home remain optional.
4. **Measurement (when live):** Track landing queries, scroll engagement, and paths from article → product sections to learn which topics deserve depth and which products deserve clearer bridges from content.

The homepage **Articles** strip remains the teaser even as individual routes grow; both should stay aligned with the same editorial standard.

---

## Engagement

**How we invite action**

- **Low friction:** clear primary paths (e.g. scroll to products, email contact). No guilt or manipulation.
- **Respectful:** one honest CTA beats three competing “BUY NOW” variants.
- **Human:** contact is a real inbox conversation, not a wall of automation (unless we later document otherwise).

**Relationship posture**

- We’re **on their side** against confusion and overload — not selling shame about their current brand.
- **Done-with-you / done-for-you** language should match what we actually deliver for that product.

---

## Ideas for future sections (same vein)

When you’re ready, add new pages or sections here or as linked docs:

- **Proof & trust:** testimonials policy, what claims we will/won’t make, before/after rules.
- **SEO runbooks:** keyword research workflow, canonical URL policy, and refresh cadence once article volume grows (titles/descriptions stay audience-first; baseline intent is in *Content, articles, and SEO* above).
- **Channels:** if we standardize Instagram vs email tone, document deltas.
- **Competitors:** not a bash list — a short “we are not X” to sharpen positioning.
- **Accessibility:** reading level targets, alt text habits for product imagery.

---

## Maintaining these docs + Cursor rules

1. When audience or exclusions change, update **[TARGET_AUDIENCE.md](TARGET_AUDIENCE.md)** first.
2. When voice or engagement changes, update **this playbook**.
3. When products ship or rename, update the **Living catalog** table and the implementation (e.g. `Products.tsx`).
4. **Cursor:** Keep the project rule **[`.cursor/rules/brand-alchemy-messaging.mdc`](../.cursor/rules/brand-alchemy-messaging.mdc)** — it should continue to point agents at **`docs/BRAND_SOURCE_OF_TRUTH.md`**, `docs/TARGET_AUDIENCE.md`, `docs/BRAND_PLAYBOOK.md`, **`docs/BRAND_GUIDELINES.md`**, **`docs/ACQUISITION_FUNNEL_AND_SKU_MAP.md`**, and (for editorial articles) **`docs/ARTICLE_RESEARCH_SYSTEM.md`** / **`docs/ARTICLE_WRITING_SCHEMA.md`**. If you add a new canonical doc, add it to that rule in the same bullet list.
5. When **visuals or layout** change, update **[BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)** in the same change as the code.

---

*Sanity check (tone + audience): “Would a tired shop owner understand this in one pass?” — if yes, ship; if no, simplify.*
