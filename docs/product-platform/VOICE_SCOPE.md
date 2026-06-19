# Voice scope — three voices (canonical)

**Read this before writing any copy.** Every other doc points here. Rules from one voice must **never** be applied to another.

---

## The three voices

| # | Voice | Speaker → audience | Where it lives | Canonical rules |
|---|--------|-------------------|----------------|-----------------|
| **1** | **Brand Alchemy (parent marketing)** | Brand Alchemy → small business **owners** (buyers) | Homepage, articles, kit product pages, checkout, ads, emails **from us** | [`BRAND_PLAYBOOK.md`](../BRAND_PLAYBOOK.md), [`TARGET_AUDIENCE.md`](../TARGET_AUDIENCE.md) |
| **2** | **End-customer marketing (pack templates)** | Salon/café **owner** → **their** customers | Social Content Pack captions, promo templates, owner email templates in PDFs | [`DIGITAL_PRODUCT_CONTENT_SCHEMA.md`](../DIGITAL_PRODUCT_CONTENT_SCHEMA.md) → **social short gate** + [`digital-product-research/`](../digital-product-research/) comp examples |
| **3** | **Generated kit copy (AI from intake)** | Owner's brand (personalized) | Identity Kit sections, CSP output, personalized blocks | [`CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](./CUSTOMER_VOICE_AND_PRODUCT_LINE.md) → **platform walkers** |

---

## What each voice allows

### Voice 1 — Brand Alchemy marketing

- Calm expert talking **to owners who hate marketing jargon**
- **Banned:** leverage, funnel, content strategy, engagement (as marketer-speak), growth-hacker tone
- **Not for:** anything the owner posts on Instagram on behalf of their business

### Voice 2 — Pack templates (what owners post)

- Real **salon/café/social marketing** — hooks, promos, booking CTAs, warmth, `!`, "link in bio," limited spots, self-care angles
- **Goal:** templates someone would **pay for** because they sound like comps that convert
- **Banned:** invented facts (#1 in town, guaranteed results, fake review claims)
- **Allowed:** salon-style urgency (limited openings, book this week, slots filling up), enthusiasm, performative warmth **when comps do it**
- **Not governed by:** Brand Alchemy jargon ban, Identity Kit platform walkers, register quotas, shape formulas

### Voice 3 — AI-generated kit copy

- Personalized from intake; must be **claim-safe** (no fabricated offers/metrics)
- Platform walkers in [`CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](./CUSTOMER_VOICE_AND_PRODUCT_LINE.md)
- **Not for:** static caption libraries in PDF packs (voice 2)

---

## Decision tree (agents & writers)

```
Are you writing copy for the Brand Alchemy website, article, or product page?
  → YES → Voice 1 (BRAND_PLAYBOOK)

Are you writing ready-to-post templates inside a content pack PDF (captions, promos)?
  → YES → Voice 2 (short gate + comp reference library)

Are you writing Identity Kit output generated from a buyer's intake?
  → YES → Voice 3 (platform walkers)
```

When unsure: **default to voice 1 only on `.tsx` pages and docs aimed at buyers.** JSON in `packages/pdf-shell-sample/content/` is almost always **voice 2**.

---

## Voice 1 bleed — the #1 pack failure mode (read this)

Agents keep pasting **Brand Alchemy's rules about bad marketing** into **owner captions**. That causes churn and sounds nothing like real café/salon posts.

### What bleeds (Voice 1 → Voice 2)

| Voice 1 (internal — us talking to owners) | Wrong in pack templates |
|-------------------------------------------|-------------------------|
| "Owners hate marketing jargon" | Captions that mention marketing, jargon, or "corporate talk" |
| Brief: *Avoid corporate chain voice* | *"Not a chain." / "None of the corporate talk."* |
| Brief: *Avoid influencer aesthetics* | *"Not trying to go viral"* |
| Differentiation vs Starbucks / SEO packs | Meta posts **about** authenticity instead of **showing** indie voice |

Real comps never explain that they're anti-corporate. They post **the drink, the hours, the drop, the question**.

### Hard rules for Voice 2 templates

1. **Brief Avoid / Off-limits / Pattern synthesis "Avoid"** = filters while you draft. **Never ship them as caption text or category descriptions.**
2. **Brand Alchemy marketing jargon ban** ([`BRAND_PLAYBOOK.md`](../BRAND_PLAYBOOK.md)) applies to **Voice 1 only** — not pack JSON. Do not "enforce" it in templates.
3. **Show, don't comment** — match Tier A comp energy (specific menu lines, promos, polls). If you can't find comp ear for a slot, add Tier A lines — don't fill from the brief Avoid list.
4. **Meta-language ban** in template `text` and category `description` unless verbatim in a Tier A comp: `corporate`, `chain`, `marketing`, `jargon`, `authentic`, `viral`, `content strategy`, `caption pack`, and similar self-aware marketing commentary.

Cursor rule when editing pack JSON: [`.cursor/rules/pack-templates-voice2.mdc`](../../.cursor/rules/pack-templates-voice2.mdc).

---

## Comp reference library (voice 2)

**Before drafting pack templates**, source and save real examples. Do not write from memory or from rules alone.

| Step | Action |
|------|--------|
| 1 | Stage 1c: audit products for **market shape** (count, price, categories) — not for caption voice |
| 2 | Build `{SKU}-comp-examples.md` with **Tier A** real IG captions (15+ minimum) — see [research README](../digital-product-research/README.md) source tiers |
| 3 | Tag each line by **post type** — reject SEO listicles and AI caption blogs |
| 4 | Stage 3: draft within earshot of Tier A; Tier B only for missing post types |
| 5 | Index in [`COMP_REFERENCE_LIBRARY.md`](../digital-product-research/COMP_REFERENCE_LIBRARY.md) |

See [`digital-product-research/README.md`](../digital-product-research/README.md) for the file template.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06 | Voice 1 bleed section + meta-language ban — brief Avoid lists are internal only, never template copy |
| 2026-06 | KIT 04 lesson: rules caused v1–v2 failure; short gate + comps win over punctuation/watchout/shape rules for social packs |
| 2026-06 | Initial three-voice split after KIT 04 — rules were overlapping Brand Alchemy, pack templates, and kit walkers |
