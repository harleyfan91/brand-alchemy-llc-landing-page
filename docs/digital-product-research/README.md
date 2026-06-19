# Digital product research

Research and **comp reference** files for content pack SKUs. Stage 1 output lives here before templates are written.

**Voice reminder:** Templates drafted from this research use **voice 2** (owner → their customers). See [`docs/product-platform/VOICE_SCOPE.md`](../product-platform/VOICE_SCOPE.md).

---

## Required files per SKU (before Stage 3)

| File | Purpose |
|------|---------|
| `{SKU}-stage1.md` | Demand, owner language, competitive audit, pattern synthesis |
| `{SKU}-comp-examples.md` | Verbatim comp lines tagged by post type — drafting reference |

Register both in [`COMP_REFERENCE_LIBRARY.md`](./COMP_REFERENCE_LIBRARY.md).

---

## Source quality tiers

**Wrong comps caused manufactured pack copy.** SEO listicles and AI caption blogs are **Reject** tier.

| Tier | Source | Draft from it? |
|------|--------|----------------|
| **A — Primary** | Real salon/stylist **Instagram captions** (verbatim, independent salons) | ✅ Yes |
| **B — Secondary** | Public pages with **verbatim lines** (StyleSeat, Cappttion) OR purchased PDF / manual Etsy preview | ⚠️ Post-type + structure only unless Tier A |
| **B-buy** | Paid pack sales pages (Digital Barakah, Preview app) | ❌ No public samples — purchase or screenshot listing |
| **C — Context** | Reddit, owner language audit, reviews of comp products | Fill-ins / pain — not caption voice |
| **Reject** | “150+ captions” SEO blogs (Viral Marketing Lab, etc.), AI marketing sites (Socialmon), caption generators, dead links | ❌ Never |

### Reject signals

- Numbered list of 50–150 captions organized by SEO headings
- Every line could swap `[city]` / `[service]` without changing meaning
- Reads like ChatGPT wellness or “client journey” filler
- URL is a **generator** or returns 404
- No identifiable human salon behind the line

### Tier A collection workflow

1. Find 5–8 **independent** salon accounts (local, not franchise)
2. Copy caption text **verbatim** from posts with real engagement
3. Record: handle, post type tag, link or date
4. Aim for **15–25 lines** and **8+ post types** before drafting

### Tier B (when Tier A isn’t enough)

- **WebFetch-verified blogs:** StyleSeat, Cappttion — full text on public page (see comp file)
- **Manual:** Etsy listing description + preview images in browser (automated fetch often **403**)
- **Purchase:** $14–19 PDF comps when no public samples exist
- Strip hashtag stacks and `[brackets]` when adapting
- SEO caption mills are **post-type reference only** — same voice risk as VML

---

## File template (`{SKU}-comp-examples.md`)

```markdown
### [post-type-tag] — Tier A — @[handle] ([link or date])

> [Verbatim caption]

**Why it's here:** [one sentence]
```

---

## Minimum bar

- **15 Tier A lines** before Category 1 draft
- **25+ Tier A lines** (or A + verified B) before full 30-template pack
- **8 post types** on checklist — see [`COMP_REFERENCE_LIBRARY.md`](./COMP_REFERENCE_LIBRARY.md)

---

## When to update

- New SKU enters Stage 3
- A cited source is dead, AI-slop, or inaccessible → move to Rejected table
- Stage 4 review: templates feel manufactured → add Tier A lines for missing types
