# Brand playbook (canonical reference)

**Purpose:** Companion to [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md). Keeps **tone**, **how we talk about products**, and **how we engage** explicit so copy, UX, and new offers stay consistent as the site grows. **Visual system** (fonts, colors, symbols) lives in [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md).

---

## Doc map (what lives where)

| Topic | Document |
|--------|----------|
| Who we serve / who we do *not* serve | [TARGET_AUDIENCE.md](TARGET_AUDIENCE.md) |
| Voice, tone, vocabulary | This file — *Tone & voice* |
| Naming and listing products | This file — *Products & offerings* |
| CTAs, contact, relationship posture | This file — *Engagement* |
| Fonts, colors, imagery, β△ mark, UI weight | [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) |
| Sister sites / products: canonical home, drift, Phase A | [BRAND_SOURCE_OF_TRUTH.md](BRAND_SOURCE_OF_TRUTH.md) |
| Acquisition funnel, SKU map, bump/retain strategy | [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) |

---

## Tone & voice

**North star:** Premium and intentional, but **never cold or jargony**. We sound like a calm expert who respects that the reader is busy and not in marketing.

**Do**

- Use **plain language**, short sentences, and **concrete outcomes** (what they can do, what customers will notice).
- Acknowledge constraints: time, budget, no design team, no marketing background (aligned with current Solutions copy).
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

| Offering | Who it’s for | Promise in one line | Notes / boundaries |
|----------|----------------|---------------------|-------------------|
| Brand Standards (solution) | Owner-operated businesses wanting consistency | Clear visual + voice standards without a big agency | Guides, not unlimited custom design |
| Ready-to-Use Toolkits (solution) | DIY operators | Plain steps + real templates | No assumption of marketing experience |
| Get Found (solution) | Local / profile-driven businesses | Setup + visibility for profiles people actually check | Walkthroughs, not guaranteed placement |
| Google Core / Pro kits | Local businesses using Google | Conversion library (templates, replies, walkthrough, angles)—not “paid setup” | Prices/features in `Products.tsx`; ladder in [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) |
| Yelp Core / Pro kits | Businesses using Yelp | Same pattern as Google | Keep parity honest per platform |
| Content packs (e.g. seasonal photo / copy) | Owners creating their own content | Specific deliverable (PDF, prompts, angles) | Framed as standalone, not confusing “add-on” language |
| Identity Kit (Core / Pro) | Owners who want brand voice + look on paper | Guided intake → PDFs by email | Core $49 / Pro $99 in identity-kit repo; funnel role in [ACQUISITION_FUNNEL_AND_SKU_MAP.md](ACQUISITION_FUNNEL_AND_SKU_MAP.md) |
| Camentra (app) | Owners taking business photos | Templates, guidance, AI coach (Pro) | Subscription via app store; optional post-kit Pro promo — see funnel map |

Add a row for **each new SKU or service line** so the table stays the checklist before publishing copy.

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
- **SEO & metadata:** how titles and descriptions should sound (still audience-appropriate).
- **Channels:** if we standardize Instagram vs email tone, document deltas.
- **Competitors:** not a bash list — a short “we are not X” to sharpen positioning.
- **Accessibility:** reading level targets, alt text habits for product imagery.

---

## Maintaining these docs + Cursor rules

1. When audience or exclusions change, update **[TARGET_AUDIENCE.md](TARGET_AUDIENCE.md)** first.
2. When voice or engagement changes, update **this playbook**.
3. When products ship or rename, update the **Living catalog** table and the implementation (e.g. `Products.tsx`).
4. **Cursor:** Keep the project rule **[`.cursor/rules/brand-alchemy-messaging.mdc`](../.cursor/rules/brand-alchemy-messaging.mdc)** — it should continue to point agents at `docs/TARGET_AUDIENCE.md`, `docs/BRAND_PLAYBOOK.md`, and **`docs/BRAND_GUIDELINES.md`**. If you add a new canonical doc, add it to that rule in the same bullet list.
5. When **visuals or layout** change, update **[BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)** in the same change as the code.

---

*Sanity check (tone + audience): “Would a tired shop owner understand this in one pass?” — if yes, ship; if no, simplify.*
