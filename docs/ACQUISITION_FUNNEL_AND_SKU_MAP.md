# Acquisition funnel & SKU map

**Purpose:** Map **SKUs and prices** to a **single customer-facing story** and document the **product ladder** (foundation → execution modules → ongoing tool). Use for ads, landing pages, checkout, and email. Tone: [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md), [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md)—**plain language**; keep internal funnel jargon off customer surfaces.

**Companion (read together):** [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md) is the **authoritative catalog** for **prices** and **SKU deliverables**. **This doc** owns **narrative, sequencing, bumps, and ops checklists**. The **SKU reference** tables below are **summaries** for funnel thinking; when anything numeric or “what’s included” changes, edit the **pricing doc first**, then align this file.

**Code / product references**

- Homepage product cards: `components/Products.tsx`
- Local kits + content packs (full detail): `pages/GuidesAndKitsPage.tsx`, `content/contentPacks.ts`
- Site routing (homepage + `/identity-kit`): `App.tsx`, `components/HomePage.tsx`, `components/ScrollToTop.tsx` (scroll-to-top on route change), `pages/IdentityKitPage.tsx`, `components/MarketingComparisonCards.tsx` (marketing-first Core/Pro comparison for offer pages); optional kit URLs: `utils/identityKitUrls.ts`, `.env.example`
- Identity Kit tiers and deliverables: `identity-kit` repo — `README.md`, `IDENTITY_KIT_PRD.md`, `apps/web/src/data/tiers.ts`
- Camentra subscription model: `Camentra` repo — `docs/features/subscription/SUBSCRIPTION_SYSTEM_COMPLETE_GUIDE.md`, `app/screens/PaywallScreen.tsx`

---

## Product ladder (strategy)

Treat everything after the Identity Kit as **execution modules** that plug into the brand you already defined—not separate “strategies.”

| Phase | Name (internal) | Role | Hook (customer-facing) | Prices |
|-------|------------------|------|------------------------|--------|
| **1** | The Brain | Foundation | Stop guessing how your brand should sound and look. | Identity Kit **Core $79** / **Pro $149** |
| **2** | The Megaphone | Local execution | Don’t sell “Google setup”—sell **local launch kits**: walkthrough, review templates, listing tips, worksheets. | Google/Yelp **Core $39** / **Pro $79**; **Both (2× Pro) bundle $129** |
| **3** | The Engine | Ongoing execution | **Business photos on your phone:** line up shots, retouch, AI coach. | Camentra **~$9.99/mo** or **~$79.99/yr** (set in App Store / RevenueCat; confirm live) |

**Integration copy to repeat where it fits**

- **Identity Kit → local kits:** The **Voice & Content Playbook** is how they **personalize templates** (review replies, captions, posts) in the Google/Yelp kits.
- **Local kits → Camentra:** Listing work in the kits pairs with **Camentra** when owners are ready to **shoot stronger business photos on the phone** (templates, guidance, coach).

---

## Pricing discrepancy note (bundle vs singles)

**Historical (deprecated):** Core/Pro at **$59 / $129** with a **$229** bundle vs **$129 + $129 = $258** saved **$29**—internally consistent.

**Risk after lowering singles:** If Pro dropped to **$79** each (**$158** for two) but the bundle stayed **$229**, the bundle would feel like an **anti-deal**.

**Current approach (implemented in `Products.tsx`):** **Pro $79** per platform; **bundle $129** for **Google Pro + Yelp Pro** → save **$29** vs **$158**, so the bundle stays a clear upsell. If you later introduce a **Core-only** two-platform offer, price it **below** **$39 + $39** so it never contradicts the Pro bundle.

---

## One narrative thread (customer-facing)

1. **First, get clear.** Answer a short set of questions and receive **your brand on paper**—voice, look, and what to do first (**Identity Kit**).
2. **Then, execute locally.** Add **local launch kits** for Google and/or Yelp: a **profile walkthrough**, **30 review templates** you tailor with your **Voice & Content Playbook**, **plain-language tips** for a stronger listing, and **worksheets** to stay organized.
3. **Keep showing up.** Use **Camentra** for **business photos on your phone**—**Pro** in the app (~$10/mo or ~$80/yr; verify in store). Optional: limited-time **Pro** included after a kit purchase (not wired in repo yet).

**Words to avoid on customer surfaces:** “tripwire,” “order bump,” “retainer,” “conversion” (as funnel jargon).

---

## SKU reference (aligned with [PRODUCTS_PRICING_AND_INCLUDES.md](PRODUCTS_PRICING_AND_INCLUDES.md))

### Phase 1 — Identity Kit (`identity-kit`)

| Tier | Price | Summary |
|------|--------|---------|
| **Core** | **$79** | Brand Brief, Style Guide, Voice & Content Playbook, 30-Day Quick Start (4 PDFs). |
| **Pro** | **$149** | Core + **Content Starter Pack** (5th PDF). |

**Primary ad/lander SKU:** Identity Kit **Core ($79)**.

### Phase 2 — Local kits (marketing site)

| SKU | Price | Notes |
|-----|--------|--------|
| **Google Core Kit** | **$39** | Walkthrough first; 30 review templates; plain-language listing tips; worksheets for consistency and upkeep. Camentra is separate (photos). |
| **Google Pro Kit** | **$79** | Everything in Core + Google Ads starter settings + KPI and audit workbook. |
| **Yelp Core Kit** | **$39** | Same pattern as Google for Yelp. |
| **Yelp Pro Kit** | **$79** | Everything in Core + Yelp Ads starter configuration + troubleshooting playbook. |
| **Google + Yelp (bundle)** | **$129** | **Both Pro tiers** in one checkout; save **$29** vs two Pro singles. |

### Checkout add-ons (Identity Kit checkout—test one default)

| SKU | Price | Role |
|-----|--------|------|
| **Social Content Pack** | **$19** | Low-friction "use your voice now" on feed and stories. |
| **Holidays & Events Content Pack** | **$39** | Holiday and local-moment copy. |
| **Google or Yelp Core** | **$39** | Local execution module right after brand clarity. |

### Other content packs (standalone or later emails)

| SKU | Price | Notes |
|-----|--------|-------|
| **Core Content Pack** | **$29** | Year-round templates and starters for routine posts and small updates; not social-only or email-only (those are separate packs). |
| **Email Content Pack** | **$29** | Welcome and early email copy. |

Photo execution and on-phone framing stay with **Camentra**; we do not sell a separate low-price “photo angles” PDF that competes with the app.

### Phase 3 — Camentra

| Tier | Model | Notes |
|------|--------|--------|
| **Free** | Default | Limited templates / basic retouch (per app docs). |
| **Pro** | **~$9.99/mo** or **~$79.99/yr** | Aligns with common mobile creative-tool pricing; **confirm in RevenueCat / App Store** before hard-coding elsewhere. Full templates, advanced retouch, **AI Photo Coach**. |

**Planned promo (TBD):** e.g. **30 days Pro** after qualifying kit purchase—redemption and legal copy must be explicit.

---

## Messaging emphasis (local kits)

- **Lead with** the **profile walkthrough** (the part owners dread) and **30 review response templates** (high pain, high perceived value).
- **Frame listing and search visibility** as practical steps owners can take, not a ranking promise.
- The listing is “free” but confusing; the **walkthrough** is the on-ramp, not a generic “buy setup” pitch.
- **Honest scope:** no guaranteed rankings or placement.

---

## Internal stage map → SKUs

| Stage | Goal | SKU(s) |
|-------|------|--------|
| **Land** | Brand foundation | Identity Kit **Core** $79 |
| **Bump** | Apply voice + local templates | **Social Content Pack** $19 **or** **Google/Yelp Core** $39 (one default per test) |
| **Ascend** | Deeper brand or local Pro | Identity Kit **Pro** $149; **Google/Yelp Pro** $79; **2× Pro bundle** $129 |
| **Retain** | Photos + coach | Camentra **Pro** subscription; optional subsidized trial after kit |

---

## Progress checklist

### Already done

- [x] Defined the **product ladder** in this doc: Identity Kit = foundation, local kits = execution modules, Camentra = ongoing tool.
- [x] Updated the **local kit pricing model** in this doc to **$39 / $79** and aligned the **bundle** to **$129**.
- [x] Re-checked the **bundle math** so the bundle still reads as a deal after lowering individual kit prices.
- [x] Updated `components/Products.tsx` pricing to match the tier model in this doc.
- [x] Updated the product section copy to frame Google / Yelp kits as **local launch kits** (listings + templates), not a generic “setup” pitch.
- [x] Added the **Identity Kit → local kits** and **local kits → Camentra** integration language to the site catalog copy.
- [x] Linked this doc into the broader brand/product documentation so it can act as the working reference.
- [x] Shipped **client-side routes** for `/` and `/identity-kit`, Identity Kit **marketing page**, and **nav** link; fixed production issues (**no** incompatible `ScrollRestoration` on `BrowserRouter`; **no** catch-all `_redirects` on Cloudflare Pages).
- [x] Refined the `/identity-kit` page into a clearer **marketing comparison** pattern for mobile: **Pro first**, concise card summaries, anchored CTA below the cards, and a subtle **AI Enhanced** peek tab on the featured Pro card instead of faux selection UI.

### Next steps

- [x] Update the **homepage narrative below the hero** so the page clearly makes **Identity Kit** the first recommended step.
- [x] Rework `components/Services.tsx` so the three steps reflect the ladder more directly: **brand foundation → marketing tools & kits → visibility & growth**.
- [x] Reframe the homepage section above the catalog as **System** instead of **Solutions / The path** so it explains the Brand Alchemy model rather than acting like a loose process explainer.
  Current structure:
  - **Brand foundation** → Identity Kit as the starting point
  - **Marketing tools & kits** → growing catalog of practical products
  - **Visibility & growth** → the business outcome layer the system supports
- [x] Review the **Hero** section and decide whether the primary CTA should point to **Identity Kit** first instead of the broader catalog.
  **Decision:** Keep the **hub** model. Primary hero action stays **See the system** → `#services` (explain the model first). High-intent Identity Kit traffic can land on **`/identity-kit`**; the homepage does not need to behave like a single-offer funnel.
- [x] Refine the **Products** section so the visual hierarchy makes the order clearer: Identity Kit first, local kits second, Camentra third.
- [x] Decide whether the current homepage should stay a **single broad catalog page** or whether Identity Kit needs its own more focused landing page before paid traffic.
  Decision: keep the homepage as the **umbrella / catalog / brand hub** for Brand Alchemy.
  Why: the current page structure, navigation, and **Articles** section already behave like a browse-first hub rather than a one-offer funnel; this supports SEO, trust, and multiple product lines better than forcing the homepage into a single-offer conversion page.
  Implication: use the homepage to explain the ecosystem and route people to the right next step, while a dedicated **Identity Kit landing page** should handle paid traffic or high-intent promotion later.
- [x] Audit every current CTA and decide which are **browse CTAs** vs **conversion CTAs** so the page has one primary path.
  Current browse / orientation CTAs: header nav links, hero **See the system**, services **See the products**, **Articles** → `#articles`, product cards (e.g. **View Identity Kit**, **View guides and kits** → `/local-business`), and general contact.
  Current soft-trust CTA: email contact in `Contact.tsx`.
  Current intended conversion CTAs that are **not fully wired yet**: `Buy now`, `Buy bundle`, `Get sample`. Identity Kit: product card links to **`/identity-kit`** (offer page); primary conversion on that page is **Start my Identity Kit** → kit app URL from env / default subdomain.
  Conclusion: the site currently behaves as a **hub with browse CTAs**, not as a true funnel. Keep it that way at the homepage level, and move high-intent conversion into dedicated offer pages and real checkout flows.
- [ ] Decide whether the **bundle** should remain a Pro-only two-platform offer or whether a separate two-platform Core offer is needed later.
- [ ] Confirm the **live checkout / payment links** match the new prices before promoting the revised tiers.
- [ ] Decide what the first **post-purchase add-on test** should be: **Social Content Pack ($19)** or **Google/Yelp Core ($39)**.

### Identity Kit integration notes

- [x] Review the current **Identity Kit** app state before linking from the marketing site.
  Summary: the repo is a separate microsite / app intended for `kit.brandalchemyllc.com`, and the current `apps/web` flow is already built as a self-contained intake experience with landing → 7 steps → review → payment placeholder → processing placeholder → edit → confirm.
  Important constraint: the Identity Kit app is **not yet production-complete** for real checkout and fulfillment. The README and PRD both say payment, processing, and delivery are still placeholders, and the current app flow in `apps/web/src/App.tsx` still routes the user through placeholder payment / processing screens.
- [x] Decide the first-stage integration pattern between the marketing site and Identity Kit.
  Decision: keep the **Identity Kit codebase separate**, but present it as part of the **same customer-facing website**.
  Customer-facing structure:
  - `brandalchemyllc.com/` = umbrella homepage / catalog / articles hub
  - `brandalchemyllc.com/identity-kit` = dedicated Identity Kit marketing / sales page
  - `brandalchemyllc.com/identity-kit/start` = actual Identity Kit app flow (served from the separate repo)
  Why: this preserves the architectural split (app, checkout, fulfillment, PDFs) without making Identity Kit feel like a separate website or brand.
- [x] Define where the **Identity Kit** should appear as a destination from the marketing site.
  **Implemented:** header nav **Identity Kit**, Products section first card (**View Identity Kit** → `/identity-kit`), and supporting copy elsewhere as before.
  Rule: avoid sending cold traffic straight into the app from every surface until the intended entry point and app readiness are explicit — the **`/identity-kit`** page sells the offer first; the app URL is only the primary CTA on that page (and configurable via `VITE_IDENTITY_KIT_*`).
- [x] Review hosting / payment assumptions against existing Identity Kit docs.
  Findings from `identity-kit` docs:
  - `DEPLOYMENT_DECISION_MEMO.md` already recommends **Cloudflare Pages** for web, **Render** for API, **Supabase** for DB, **Stripe Checkout + Stripe Webhooks** for payments, and **Resend** for email.
  - `PHASE_ROADMAP.md` explicitly says **payments come after** validating the PDF generation pipeline and backend persistence.
  - `DAY1_SETUP_CHECKLIST.md` already contains the first production checklist for Stripe test mode, webhook setup, and deployment.
  Conclusion: **Stripe is the right default payment path**, but it should be wired only after the app is ready to create orders, generate outputs, and fulfill paid purchases reliably.

### Same-domain Identity Kit implementation plan

- [x] Add real routing to the main marketing site so it can support page-level destinations instead of only one-page section anchors.
  **Shipped:** `BrowserRouter` + `Routes` — `/` → homepage (`HomePage`), `/identity-kit` → `IdentityKitPage`. Do **not** use `<ScrollRestoration>` with `BrowserRouter` in React Router v7 (it requires a data router and will white-screen the app).
  **Still to plan:** dedicated **article** index/detail routes when long-form pieces ship (URL scheme TBD—not committed here).
- [x] Build the **Identity Kit marketing page** in the main Brand Alchemy site (`pages/IdentityKitPage.tsx`).
  Purpose: introduce the offer, tiers, and outcomes before the app. Current page pattern: short hero + **marketing comparison block** (Pro first, clearer summaries, anchored CTA below the cards, subtle **AI Enhanced** peek tab on Pro) rather than a pseudo-selector.
  Intake remains in the `identity-kit` repo; target URL is `VITE_IDENTITY_KIT_START_URL` or `VITE_IDENTITY_KIT_URL` / default kit host until `/identity-kit/start` is routed on the apex.
- [ ] Keep the **Identity Kit intake app** in the separate repo, but prepare it for subpath hosting under the main domain.
  Technical note: the current Vite app in `identity-kit/apps/web` has no subpath base configured yet. If it will live at `/identity-kit/start`, asset loading and build config will need to support that base path.
- [ ] Decide the Cloudflare path-routing mechanism for the shared domain (only if you want the app on-path instead of a subdomain).
  Recommended direction: keep **one public domain**; path-route `/identity-kit/start` to the kit frontend origin if needed, or use **`kit.brandalchemyllc.com`** with no Worker (simplest).
  **Marketing site on Cloudflare Pages:** do **not** add a catch-all `_redirects` rule like `/* /index.html 200` — on Pages, redirects apply **even when a static file exists**, so that pattern can make `/assets/*.js` return HTML and **blank the entire site**. Rely on the default SPA behavior: **no top-level `404.html`** and Pages maps unknown paths to the SPA.
- [ ] Keep the Identity Kit API separate from the marketing site.
  Recommended default from existing docs: deploy `identity-kit/apps/api` separately (Render is the current documented default) and let the app call that API for orders, checkout, fulfillment, and email.
- [ ] Replace placeholder checkout only after the production path is ready.
  Required order from existing docs:
  1. PDF generation / deterministic output confidence
  2. persistence / order state
  3. Stripe Checkout + webhook handling
  4. email delivery / fulfillment wiring
  Until then, do not push cold traffic directly into the live app flow.
- [ ] Define the launch threshold for the Identity Kit connection.
  Two milestones:
  - **Marketing-ready:** `/identity-kit` can be public as an offer page even if the app is not fully transacting yet — **current state** (offer page live; kit app readiness per `identity-kit` repo).
  - **Conversion-ready:** `/identity-kit/start` (or kit subdomain) is ready for real traffic because checkout, webhook, fulfillment, and email are operational.
- [ ] Decide whether to keep `kit.brandalchemyllc.com` public, private, or transitional.
  Strong current preference: treat it as an implementation detail / deploy target if useful, but present the product publicly on `brandalchemyllc.com/identity-kit` so the customer experience feels like one site.

---

## Implementation checklist (Camentra promo)

- [ ] Which purchases unlock **30-day Pro** (Identity Kit only vs any checkout).
- [ ] Redemption path (code, deep link, RevenueCat).
- [ ] Copy: start date, renewal, cancel.
- [ ] Economics: CAC, fulfillment, subsidized Pro vs conversion.
- [ ] Analytics: lander → kit → bump → app install → Pro.

---

## Maintaining this doc

When **prices or bundle tier rules** change in `Products.tsx` or stores, update this file **in the same change** and re-check **bundle savings math** so the bundle never reads worse than buying singles.
