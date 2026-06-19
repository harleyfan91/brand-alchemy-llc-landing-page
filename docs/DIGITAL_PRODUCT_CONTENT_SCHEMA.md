# Brand Alchemy — Digital Product Content Schema

## Purpose

**Scope:** This document governs the end-to-end process for creating the actual content inside Brand Alchemy digital products — the templates, copy, and instructions that make up a deliverable.

**Voice scope (read first):** [`product-platform/VOICE_SCOPE.md`](product-platform/VOICE_SCOPE.md) — three voices; rules do not overlap. Pack templates = **voice 2** only.

It is not about platform contracts, PDF layout, or checkout wiring — those belong to [`product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md) and [`PDF_CHROME.md`](PDF_CHROME.md).

**What this covers:** research → brief → content creation → review → format and delivery.

**Companions (read together):**
- [`PRODUCTS_PRICING_AND_INCLUDES.md`](PRODUCTS_PRICING_AND_INCLUDES.md) — prices and what ships inside each SKU (source of truth)
- [`ACQUISITION_FUNNEL_AND_SKU_MAP.md`](ACQUISITION_FUNNEL_AND_SKU_MAP.md) — funnel position, bumps, and product ladder
- [`TARGET_AUDIENCE.md`](TARGET_AUDIENCE.md) — who these products are for and who they are not for
- [`product-platform/VOICE_SCOPE.md`](product-platform/VOICE_SCOPE.md) — **canonical:** three voices; which rulebook applies where
- [`product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md) — platform walkers for **AI-generated kit copy (voice 3)** only
- [`digital-product-research/COMP_REFERENCE_LIBRARY.md`](digital-product-research/COMP_REFERENCE_LIBRARY.md) — verbatim comp lines for **pack templates (voice 2)**
- [`BRAND_PLAYBOOK.md`](BRAND_PLAYBOOK.md) — **Brand Alchemy marketing (voice 1)** — not pack templates

No content should be written before a brief is complete. No content should be shipped before Stage 4 review passes.

---

## The Five Stages

```
Stage 1 → Research
Stage 2 → Brief
Stage 3 → Content creation
Stage 4 → Review
Stage 5 → Format and delivery
```

---

## Stage 1: Research

**Goal:** Validate purchase intent, collect owner language, and audit what comparable digital products actually ship — so we write copy that converts without drifting into marketer voice or generic template-library tone.

Digital product research is about four things (run in order):

### 1a. Demand validation

Confirm there is purchase intent, not just informational search. People searching "how to respond to a review" may want an article. People searching "review response templates" or "caption ideas for small business" are closer to a buying moment. Check:

- Google search queries: what exact phrases do owners type for this problem?
- Reddit r/smallbusiness, r/entrepreneur, and **industry-specific communities** (e.g. salon owner threads): is this a recurring frustration, or an occasional question?
- Etsy / Gumroad / Creative Market / independent shops: are comparable products selling? (Units sold, review counts, price)
- Our own article candidate log ([`ARTICLE_RESEARCH_SYSTEM.md`](ARTICLE_RESEARCH_SYSTEM.md) Part 2): does this problem appear as a high-signal article topic? If so, there may be both article and product demand.

### 1b. Owner language audit

Collect the words owners actually use when describing this problem. Not marketer vocabulary — the way someone would say it to a friend. These phrases become the fill-in variable language and the instructions tone.

Sources: Reddit thread titles, product reviews on competing items, Google autocomplete, "People also ask" results.

### 1c. Competitive product audit

Find **3–5 existing products** at a similar price tier and format (PDF caption pack, template bundle, content kit). Prefer products buyers actually purchased — not blog listicles.

For each competitor, record:

| Field | What to capture |
|-------|-----------------|
| **Product** | Name, seller, URL, price |
| **Deliverable shape** | Caption count, categories, bonus sections (hashtags, calendar, Canva links, ChatGPT prompts, posting plan) |
| **Content mix** | Approximate split: availability / transformation / behind-the-scenes / promo / community / education |
| **Hook patterns** | How first lines open (question, confession, specific detail, contrast, humor) |
| **Engagement mechanics** | Questions, social proof, specificity, earned urgency, booking CTAs — what moves they use |
| **Rhythm & emotion** | What the line *feels* like — **save 3–5 direct example lines** into `{SKU}-comp-examples.md` (see [comp library](digital-product-research/README.md)) |
| **Fill-in density** | Zero-fill vs heavy customization vs “personalize every post” |
| **Review signal** | What buyers praise (“saved blank-screen time,” “got comments”) vs complain about (“generic,” “influencer voice,” “too many hashtags”) |

Also note where competitors fail the non-marketer owner test: jargon aimed at **marketers**, creator/influencer voice, corporate chain language, too much fill-in work. **Salon-style promos and urgency in comps are adoptable for voice 2** — see comp library.

**Do not swipe copy.** Extract **market patterns** (count, categories, CTAs used in the category) from products — not wording. Copy caption text only from **Tier A** (real salon posts) into `{SKU}-comp-examples.md` — see [`digital-product-research/README.md`](digital-product-research/README.md) source tiers. **Reject** SEO caption listicles and AI marketing blogs.

### 1d. Pattern synthesis and template-count benchmark

Synthesize 1a–1c into decisions before writing:

```
PATTERN SYNTHESIS
  Adopt:     [Post types, hooks, CTAs, promos, urgency patterns from comp examples file]
  Avoid:     [Influencer/creator voice, corporate chain language, invented claims]
  Differentiate: [What we ship that comps don't — specificity, voice, zero Canva dependency, etc.]

TEMPLATE COUNT (confirm against price tier in PRODUCTS_PRICING_AND_INCLUDES.md)
  Competitor range at this price:  [e.g. 30 captions @ $19, 50 Canva+caption @ $14]
  Recommended count for this SKU:  [Number + brief rationale]
  Rationale:                       [Quality over volume; one month+ of weekly posts; category coverage]
```

**Template count rule of thumb ($19 social caption packs):**

- **30** is the market anchor for caption-only or caption-primary packs at this tier — enough for ~7 weeks of 4 posts/week or a full month with variety.
- **35–40** is justified when research shows comps at $19–$29 ship meaningfully more *without* filler, and each extra template passes the distinctness check.
- **50+** at $19 usually means generic lists, hashtag padding, or Canva bundles — not our lane unless we intentionally ship a larger **Core**-tier product at $29+.
- Count changes require updating the brief **before** Stage 3 — not mid-draft.

The gap from 1c plus the count decision from 1d become the quality bar for this product.

### Stage 1 output

Record in this format before moving to Stage 2. For industry-specific SKUs, store the full pass in `docs/digital-product-research/` (filename: `KIT-XX-[slug]-stage1.md`).

```
RESEARCH FOR: [Product name]
─────────────────────────────────────────────────────────────────────

DEMAND SIGNAL
  Search queries:      [2–4 exact phrases with highest owner-language intent]
  Reddit signal:       [Recurring thread / occasional / not found]
  Market evidence:     [Competing products with evidence of sales, if found]
  Article adjacency:   [Matching candidate from ARTICLE_RESEARCH_SYSTEM.md if one exists]

OWNER LANGUAGE
  [5–10 phrases owners use to describe this problem, verbatim or close to it]

COMPETITIVE PRODUCT AUDIT
  [3–5 products — use table from 1c; one row per product]

COMPETITOR GAP
  [What the best existing products get wrong for our audience]
  [What is genuinely missing]

PATTERN SYNTHESIS
  Adopt:               [...]
  Avoid:               [...]
  Differentiate:       [...]

TEMPLATE COUNT
  Competitor range:    [...]
  Recommended count:   [...]
  Rationale:           [...]
```

---

## Stage 2: Brief

**Goal:** Lock scope and constraints before writing begins. No template should be written until this brief is complete and feels right.

The brief is the contract between research and production. It prevents scope creep, wrong-audience drift, and "this worked for a different product" decisions from bleeding in during the writing pass.

### Brief template

```
PRODUCT BRIEF: [SKU name]
─────────────────────────────────────────────────────────────────────

SKU
  Name:              [Final product name]
  Price:             [$19 / $29 / other — confirm against PRODUCTS_PRICING_AND_INCLUDES.md]
  Funnel position:   [Checkout bump / standalone / both — note which SKU it follows]

BUYER
  Starting state:    [What the buyer has, knows, or is struggling with before opening this]
  End state:         [What they can DO that they could not do before — be specific]

CONTENT SPEC
  Format:            [Ready-to-post. Zero-fill templates are valid and preferred when the
                     template works for any business without modification. 1–2 fills are
                     allowed only when the fill-in is an obvious fact the owner knows in
                     5 seconds. Never require a fill-in to justify "personalization."]
  Fill-in standard:  [List the ONLY fill-ins allowed. Permitted: [your town/city],
                     [your trade or type of business], [a date], [your name].
                     Specific-detail fills are also permitted for customer-moment
                     and proud-of categories when the owner can fill them in under
                     5 seconds — [what they came in with], [the result], [the milestone],
                     [what happened]. These are not "personalization" fills; they are
                     factual recalls the owner already knows.
                     Not permitted: anything requiring the owner to think about their
                     positioning — [your brand message], [your unique offering],
                     [your target customer], etc.]
  Template count:    [From Stage 1d benchmark — e.g. 30 at $19 social. Confirm against
                     PRODUCTS_PRICING_AND_INCLUDES.md. Aim for roughly 1/3 zero-fill,
                     2/3 with one simple fill. Do not pad count with filler templates.]
  Categories:        [4–6 named scenario buckets with 1-line description each]

EXPRESSIVITY RANGE
  [Name 3–4 registers this pack should cover. Choose from:
    Real — honest about the moment, no pretense, no cheerfulness coating
    Warm — personal, grateful, relationship-forward
    Confident — brief, direct, does not over-explain
    Energetic — something genuinely worth getting excited about
    Light — easy, human, occasionally a little fun
    Quiet — understated, does not try too hard
    Wry — dry, self-aware, earns a smile without performing it
  No single register should dominate more than 40% of templates.
  Monotone is a failure mode even when all scenarios are different.
  **Social caption packs (industry-specific):** registers are optional tags for variety
  checking only — do not rotate moods to hit percentages while drafting.]

CONSTRAINTS
  Off-limits:        [Specific words, tones, industry signals, and claim types to exclude]
  Industry rule:     [Templates must work for any business type — no accidental narrowing.
                     If a template only works for booking-model businesses (fitness studio,
                     salon, restaurant), note it as booking-model in the brief so the
                     review stage can check that non-booking alternatives exist in the
                     same category.]
  Standalone rule:   [Works without Identity Kit. Works better with Identity Kit — how?]

QUALITY BAR
  A template ships when: [Define in plain English what "good enough" looks like]
  A template fails when: [Define at least two failure modes specific to this product]

CATALOG CONTEXT
  Sits next to:      [Which other SKUs are nearby in the catalog]
  Differentiated by: [What makes this clearly different from adjacent SKUs]

STATUS
  [Brief / In production / In review / Complete]
```

---

## Stage 3: Content Creation

**Three voices — do not merge.** Full spec: [`product-platform/VOICE_SCOPE.md`](product-platform/VOICE_SCOPE.md). Pack templates = **voice 2** only (short gate + comp library). Never apply Brand Alchemy marketing rules or Identity Kit platform walkers to pack captions.

**Work through categories in order.** Draft one category, review it, then start the next.

### Before writing

Re-read the brief in full. Specifically re-read:
- Fill-in standard (these are the only brackets allowed)
- Off-limits list (these are active constraints during writing, not post-hoc edits)
- Quality bar (this is the internal test for every template before it moves to review)

Then calibrate — do not skip this even if the brief is complete:

0. **Pattern synthesis** — Re-read Stage 1d (Adopt / Avoid / Differentiate). Hooks and CTAs from comps are allowed. Avoid creator/influencer voice and corporate chain language. **For social packs:** adopt comp urgency and promos when drafting voice 2 templates.
1. **Comp examples on disk (required for social packs)** — Before Category 1, `{SKU}-comp-examples.md` must exist in [`digital-product-research/`](digital-product-research/) with **15+ verbatim lines** tagged by post type. Index in [`COMP_REFERENCE_LIBRARY.md`](digital-product-research/COMP_REFERENCE_LIBRARY.md). Draft within earshot of comps — do not write from rules alone.
2. **Ear calibration (optional)** — Read comp lines aloud. Match **energy and post types**, not one repeated arc.
3. **Category steering (brief/research only — not the PDF)** — In the product brief or research doc, note what situation the category covers **and** the angle trap to avoid (e.g. behind-the-scenes: not "the real work happens before you arrive"). Use this while drafting. **Do not paste steering or anti-pattern notes into the JSON `description` field** — that text ships in the PDF.
4. **Category description (customer-facing — ships in PDF)** — One or two sentences: when to reach for this section. Plain guidance the buyer reads while browsing the pack. No internal watchouts, failed draft examples, or writer shorthand.
5. **Intro vs template voice** — Intro and instructions may use second-person pain (speaking to the owner who bought the pack). **Templates** use first-person owner voice speaking **to their customers**.

### Template gate

**Social caption packs ($19 industry SKUs)** — use the **short gate** only ([below](#social-caption-packs-19-social-skus)). Do not run the full generic gate, watchouts #3–#4/#8–#10, register quotas, or pack rhythm targets.

**All other template products** — run these checks **in order** before moving on:

1. **Customer-facing** (watchout #6) — Would a follower care, or is the business talking about itself, its operations, or its marketing?
2. **Angle** (watchouts #1–2) — Not table-stakes. Not the safest obvious post for this category.
3. **Punchline** — Story templates need a last beat the customer would say or imply.
4. **First sentence** (watchout #7) — Scroll-stopper on its own?
5. **Voice walkers** — Platform walkers for kit AI output; template pack walkers for generic products; **short gate only** for social caption packs (below).

### Writing each template

**Social caption packs:** one line to four short beats is fine. Lead with result, service name, or hook — not scenario setup. `(I/we)` notation where solo stylist vs salon voice differs.

**All other template products:**

- Write in **first person** from the owner's perspective wherever possible ("We're open," "Come see us," "I wanted to share..."). First-person removes the "fill in how you describe your business" burden that second-person creates.
- Keep most templates to **2–4 sentences** for social and email. If a template requires more than one paragraph, it is probably two templates.
- Every fill-in must pass the **5-second test**: could an owner fill this in within 5 seconds without having to think? [your city] passes. [your core brand message] fails. When in doubt, rewrite the template so no fill-in is needed.
- **Zero-fill templates are not lazy — they are often the most useful.** A template that works as-is is the fastest one to use. Aim for roughly one-third of the pack to need no fills at all.

### Social caption packs ($19 social SKUs)

**Use the short gate. Ignore removed rules below.**

These packs failed when we optimized for **passing checklists** instead of **sounding like a real post**. The biggest manufactured pattern: every caption becoming *She came in → mirror → quoted client line* because rules required client beats, shape quotas, and register rotation.

#### Short gate (only checks that matter)

1. **Stylist post test** — Would a real owner post this verbatim after a normal week, without feeling like they're reading a template? If it sounds like a caption pack, rewrite.
2. **Hard bans only** — No **invented claims** (guaranteed results, #1 in town, fabricated stats/reviews). **Salon-style urgency and promos are allowed** — limited spots, book this week, slots filling up, seasonal pushes — when comps and real salon posts use them. Write like real salon social: CTAs, link in bio, enthusiasm encouraged.
3. **Variety by ear** — Read five templates in a row. If they share the same **structure** (not just topic), rewrite until the pack feels mixed.
4. **Result-first, not scenario-first** — The **category description** tees the situation (when to use this section). The **caption** is the post: lead with vibe, service, result, or punch. Do not re-explain why you're posting — the photo and category already did that. (KIT 04 lesson: explaining the situation in every caption read stiff.)
5. **Comps over rules** — Draft within earshot of Tier A lines in the comp file. If a global schema rule (punctuation, sentence count, watchout) conflicts with real comps, **comps win** for social packs.

**Do not use while drafting social captions:** voice anchors, Story/Punchy/Hook shape plans, pack targets for `?` or `!`, staccato percentages, setup→turn→beat formulas, mandatory client quotes, register % caps, watchouts #3–#4/#8–#10, expressivity quotas, mirror-test formulas, or **scenario narration** in the caption body.

#### Removed rules (why they manufactured copy)

| Removed | Why |
|---------|-----|
| Per-pack `?` / `!` / Story % targets | Forced mechanical diversity |
| Caption shape taxonomy + category shape plans | Same arc every time |
| Three voice anchors before drafting | Calibrated to formula, not voice |
| Rhythm & beat / staccato % (watchout #9) | Optimized sentence shape over meaning |
| Mirror test requiring client-visible payoff | Every line became fictional vignette + quote |
| Watchout #3–#4 (owner closers / client-beat endings) | Even when labeled "generic," agents applied these to salon packs → *She → mirror → quote* formula |
| Watchout #8 (vagueness trap) | Forced hyper-specific "She was nervous…" fiction |
| Watchout #10 (owner-outcome drift) | Swung copy to ops; then over-corrected to vignettes |
| Register 40% cap + Check 5 expressivity quotas | Mood rotation for the spreadsheet |
| "Earned !" register restrictions | Real stylists use `!` when they feel like it |
| Ban on performative warmth | Empty "we LOVE clients" is bad; warmth isn't |

#### What still applies

- Stage 1 comp research (for **ear**, not to copy structure)
- Fake urgency and invented claims stay banned
- Industry-specific vocabulary is **allowed** when the SKU is industry-specific (salon: client, chair, color, appointment, link in bio, book, DM)
- Check 4 distinctness (same situation twice is still filler) — but similar **structure** is the bigger problem; fix that first

#### What does **not** apply to social caption packs

- **Brand Alchemy marketing jargon ban** ([`BRAND_PLAYBOOK.md`](BRAND_PLAYBOOK.md)) — that governs how *we* talk to owners, not how owners talk to their customers
- **Identity Kit voice walkers** ([`CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md)) — those govern AI-generated personalized copy from intake (claim-safe, no fabricated metrics), not static ready-to-post templates
- Register quotas, shape targets, mirror-test formulas (see Removed rules table)

### Punctuation and length

**Social caption packs (voice 2):** follow **Tier A comps**, not the generic table below. Real salon posts use em dashes, fragments, `..`, and multiple `!` when the energy fits (see comp file). One-line captions are valid. Do not "clean up" comp rhythm into brochure sentences.

**Generic / email / KIT 01–03 reference packs only:**

Punctuation is one of the fastest ways to signal emotional register. Treat it as a writing choice, not cleanup.

| Mark | Rule | Why |
|------|------|-----|
| **Period** | Default. Use freely. Fragments are fine. | "We're here. Come see us." reads more human than an over-complete sentence. |
| **Exclamation point** | Zero or one per template. Energetic and Light registers only. Never reflexive. | One earns genuine emphasis. Two or more signal fake enthusiasm or an ad. |
| **Question mark** | Valid and useful. Use intentionally for engagement, hooks, and invitations. | "Have you been in lately?" creates a different relationship than "Come visit us." Use it when that shift is right. |
| **Colon** | Clean and direct. Good for announcements, subject lines, "here's what we offer" structures. | "New this week: [thing]." Efficient and confident. |
| **Em dash (—)** | **Banned from all templates.** | Reads as generated or over-edited. Not how an owner types a post. |
| **Ellipsis (...)** | **Banned from all templates.** | Reads as passive, passive-aggressive, or dated. Never the right signal. |
| **Multiple marks (!!, !?, ??)** | **Banned.** One punctuation mark ends a sentence. | Any doubling is an influencer or ad signal — wrong audience, wrong voice. |
| **ALL CAPS** | **Banned.** | Same problem as multiple marks. Shouts at the reader. |

**The Quiet register and punctuation:** Quiet templates often have no exclamation points, short sentences, and periods throughout. That restraint is the signal — the template does not try too hard. Do not dress up a Quiet template with punctuation to make it feel "more."

**The Confident register and fragments:** "Good at what we do. Come find out." is a complete thought in two fragments. That is allowed and often better than the grammatically complete version. Confidence does not need to explain itself with full sentences.

### Expressivity: write in multiple registers, not one consistent tone

**Social caption packs:** skip register planning. Tag `register` in JSON after drafting if useful for PDF variety — do not quota or rotate moods to hit percentages.

**Generic / KIT 01–03 reference packs only:** A pack where every template sounds the same is monotone even if every scenario is different. Within each category, and across the pack as a whole, consciously vary the emotional register. The six registers available for our audience:

| Register | What it sounds like | Example |
|----------|---------------------|---------|
| **Real** | Honest about the moment, no forced cheerfulness | "It's been a quiet week. We're here if you need us." |
| **Warm** | Personal, grateful, relationship-forward | "We're grateful for every person who walked through our door this month." |
| **Confident** | Brief, direct, does not over-explain | "We know what we're doing. Come find out." |
| **Energetic** | Something genuinely worth getting excited about | "Something new just landed and we're excited to show you." |
| **Light** | Easy, human, a little fun without being a brand mascot | "Monday is officially here. Come make it better." |
| **Quiet** | Understated, does not try too hard | "We're open. That's all." |
| **Wry** | Dry, self-aware, makes the reader smile without trying | "We've been called a hidden gem so many times we're starting to wonder if we need a bigger sign." |

Use the expressivity range from the brief to guide which registers to prioritize. **Generic / KIT 01–03 reference packs only:** no single register should appear in more than 40% of templates. **Social caption packs:** do not quota registers — tag them after drafting if useful.

### Voice walkers

**Do not apply one walker set everywhere.** See [Three voices](#stage-3-content-creation) above.

#### Platform walkers (Identity Kit AI output only)

From [`CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md) — for **generated** customer-brand strings tied to intake (bios, CSP sections, personalized blocks):

1. **Banned vocabulary** — SaaS/marketer-speak in *generated* kit copy ("leverage," "brand equity," "content strategy," etc.)
2. **Claim-safety** — no fabricated metrics, offers, or outcomes not in intake
3. **CTA rules** — inherit narrator profile; no ranking promises where prohibited
4. **Punctuation budget** — per product spec

#### Template pack walkers (generic email / non-social templates)

For **static templates** in generic packs (KIT 01–03, Email Blast Pack): lighter gate — customer-facing, claim-safe, no fake urgency. **Do not** import the full platform jargon list; owners are allowed to sound promotional in their own marketing.

#### Social caption packs

**No voice walker checklist.** Use the [short gate](#short-gate-only-checks-that-matter) only. Promotional language, booking CTAs, hooks, and enthusiasm are the product.

### Content quality watchouts: what flat looks like

**Generic / email / KIT 01–03 reference packs only.** Social caption packs (voice 2): use the [short gate](#short-gate-only-checks-that-matter) only — do not run this watchout list while drafting salon captions.

A template can pass voice checks and still fail the customer read test. These patterns make a pack feel generated rather than curated:

**1. Table-stakes language.** "We work hard," "we care about quality," "we take our time" — these are true for almost every business that stays open. A template built on a table-stakes claim gives the reader nothing they cannot already assume. Replace the claim with a moment, a behavior, or a structural angle that implies the same quality without naming it.

**2. The expected angle.** The most common failure mode is writing the most obvious, safest thing about the topic. "We're open" posts that only say "we're open." "Behind-the-scenes" posts that only say "we work hard before you see it." Templates that convert take an honest or slightly unexpected angle — a small admission, an implied contrast, a wry observation — rather than the most comfortable one.

**3. Explaining the emotion — to the owner.** *(Generic packs only — caused KIT 04 mirror-quote formula when applied to social captions.)* After a genuine moment, many templates add a sentence that names what the moment means **for the business**: "That's why we show up." "That's who we are." "That's what this work is for." "That's the whole job." "That's the win." These closers orient inward. **Fix:** end on the **client beat** — what they said, felt, or saw — not what it meant to you. *Allowed:* `'That's exactly what I wanted.'` / *Not allowed:* `That reaction is the whole job.`

**4. The philosophical closer pattern.** Any single owner-meaning closer can slip through once. When multiple templates in the same pack end with this structure, it becomes a formula. Cap owner-meaning closers at **zero** for social caption packs; use client reaction instead. If a draft ends on "that's the…", rewrite.

**5. Performing authenticity.** Words like "genuinely," "truly," "honestly" as modifiers often signal that the surrounding sentence is doing something inauthentic. "We genuinely love what we do" sounds less genuine than "We've been doing this for a long time and we're not done." Watch for modifier words compensating for a weak core claim. (Exception: "genuinely" is allowed when the surrounding structure earns it, e.g. "Made something this week we're genuinely proud of. Doesn't happen every week. This one did." — the staccato rhythm does the work, not the modifier.)

**6. Internal-facing perspective.** Templates that describe the business to itself ("we're a community," "we care about our customers," "this is more than a job") are oriented inward. The reader cannot verify these claims and has no particular reason to believe them. Templates that create a moment the reader can enter — that say something specific about what the reader will experience or belong to — convert better than self-descriptions. **Business-meta fails too:** jokes or asides about the business's marketing, posting strategy, or operations (even wry ones) are written for the owner, not the customer. If a follower would ask "why do I care about that?", rewrite.

**7. The weak first sentence.** Read only the first sentence of every template. Does it earn the second? The first sentence is the scroll-stopper. If it is forgettable — if it could be the first sentence of a hundred other posts — the template will not hold attention long enough to land.

**8. The "someone came in" vagueness trap.** "Someone came in this week and said something." "A customer stopped by." These setups imply specificity but deliver generality. Either anchor the setup with a specific emotional type ("A customer came in stressed and left calm") or drop the setup and start with the outcome.

**9. Staccato brochure drift.** Three or more short period-separated sentences that **describe the business** instead of **showing a moment** ("Independent salon in [town]. Good work. Normal people." / "New here? Most clients come from referrals. That's how we grow."). Reads like a label, not a post. **Fix:** use Story shape (setup → turn → beat), a `?` with payoff, or one specific client detail. Exception: intentional **Punchy** or **Quiet** templates in availability-style categories.

**10. Owner-outcome drift.** The post reports something **true about the salon** that **clients don't care about** when scrolling: schedule efficiency ("everyone left on time"), posting meta ("didn't pitch us"), vibe marketing ("we're not a silent spa"), process without payoff ("we plan on the questions before the result"), or staff-side wins ("busiest Saturday — that's the win"). **Fix:** lead or land on **client-visible outcome or feeling**. Behind-the-scenes is allowed only when it answers *what do I get because you work this way?* — comfort, trust, a result they'd want for themselves.

### Hype: use it, but anchor it

**Generic / email / KIT 01–03 reference packs only** (social caption packs: use comp energy; no hype % target).

Skipping hype entirely makes the pack feel flat and emotionally one-note. Generic hype makes it sound like every other template library ("excited to share," "good energy," "genuinely good week"). The rule is **earned hype** — energy tied to something real the reader can picture.

| Generic hype (avoid) | Earned hype (use) |
|----------------------|-------------------|
| "It's been a genuinely good week in [your town]!" | "We sold out by Friday. Restocking Monday." |
| "Good energy in the neighborhood!" | "Opening day was a blur. Thank you to everyone who showed up." |
| "We're excited to share what we've been working on!" | "Today's the day. We're open. Come see what we've been building." |
| "Something amazing happened this week!" | "She walked in frustrated with the color. When she saw the fix, she actually smiled." |

**When hype belongs:** openings and milestones, a real win worth announcing, something new landing, a busy week that exceeded expectations, seasonal or local moments with a reason to celebrate. These map to **Energetic** and **Light** registers — use them on purpose, not as filler.

**When hype doesn't belong:** routine "we're open" reminders, behind-the-scenes process posts, quiet customer moments, templates where the whole point is understatement. Not every post needs to peak.

**Target mix (generic packs only):** Roughly 15–20% of templates in a social pack should carry clear energy or celebration (about 5–6 of 30). The rest can stay Real, Warm, Confident, or Quiet. A pack with zero hype reads cautious; a pack where every other line shouts reads like an ad.

**How to write earned hype:** Name the thing first, then the feeling. "We're open" before "we're so excited." Or let the detail carry the energy: "Sold out by noon" needs no exclamation point. Use `!` when the moment supports it — openings, wins, invitations — not to rescue a flat sentence.

### Stage 3 output

A complete draft of all templates, organized by category, with **customer-facing** category descriptions (when to use each section — no writer steering) and a placeholder instructions page. Do not finalize the instructions page until Stage 4 is complete — it is written from what the templates actually need, not from what you imagine they will need.

---

## Stage 4: Review

**Six checks. All must pass before the product ships.** During drafting, use the Stage 3 template gate first; do not rely on Check 1 alone.

### Check 1: Walker pass

**Social caption packs:** skip — use Check 3 stylist post test instead.

**Identity Kit / AI-generated copy:** platform walkers from [`CUSTOMER_VOICE_AND_PRODUCT_LINE.md`](product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md).

**Other template products:** customer-facing, claim-safe, no fake urgency.

### Check 2: Owner use test ("the plumber test")

**Generic packs only.** Skip for industry-specific SKUs (e.g. KIT 04 Salons) — use the **stylist post test** instead.

Pick a business type that is not particularly glamorous and not obviously served by marketing tools: a plumber, an electrician, a house cleaner, a general contractor. For each template:

- Could this business use it today?
- Does the fill-in (if any) make sense for this business?
- Would this owner feel embarrassed to post it, or proud of it?

If more than 20% of templates fail for this business type, the pack has industry-narrowing problems that were not caught in writing.

### Check 3: Customer read test

Read each template from the **customer's perspective** — not the owner's. This is the marketing effectiveness check.

- For a social post: would a customer who sees this want to know more, visit, or feel warmly toward this business? Or does it read like background noise?
- **Social caption packs only:** **Stylist post test** — would a real owner post this verbatim without cringing? Fail if it sounds like a template library (especially the *She came in / mirror / quoted line* formula repeated across the pack).
- For an email: would a customer who receives this read it, take action, or at least not unsubscribe?
- For a promo post: does it communicate the offer clearly without sounding desperate or aggressive?

A template can be grammatically clean and voice-consistent and still fail this check by being inert — saying something true but not saying it in a way that moves anyone.

### Check 4: Distinctness check

Within each category, every template must be **meaningfully different** from the others. Not just synonyms or sentence reordering — different framing, different angle, different emotional register. If two templates in the same category are more than 70% structurally similar, replace one.

### Check 5: Expressivity check

**Generic / KIT 01–03 reference packs only.** Skip register quotas for social caption packs — use the stylist post test and structural variety by ear.

Read the pack as a whole and count how many distinct registers are present. A pack that passes the distinctness check but fails this one has scenario variety without emotional variety — it still reads as monotone.

- Does the pack hit at least 3 of the 6 registers defined in Stage 3?
- Does any single register appear in more than 40% of templates?
- Read five templates in a row without stopping. Do they feel like they could have been written by different people with different moods? If not, find which register is dominating and replace some of those templates.

The goal is that a buyer reading through the pack can feel the range — some templates are warmer, some are more direct, some are lighter. That variety is part of the product's value. A monotone pack feels generated, not curated.

### Check 6: Voice check

**Social caption packs:** skip Brand Alchemy voice check — use **stylist post test** (Check 3) only. Pack should sound like a stylist typed it, not like our marketing site.

**Generic / other template products:** Read the product as a whole and ask: does this feel like it came from Brand Alchemy's world? The signal is not polish — it is that it sounds like a knowledgeable friend who runs businesses and actually talks to owners. It should not sound like:

- A social media scheduler's template library
- A generic "tips for small business" blog post
- A marketing course workbook
- A product built for professional content creators

If the overall pack sounds like any of those, find where the drift happened — usually expected-angle defaults per category (fix steering descriptions and rewrite that category), not one-word edits across the pack.

### Stage 4 output

A reviewed, corrected final draft of all templates and the completed instructions page, ready for formatting. All six checks documented as passed.

---

## Stage 5: Format and Delivery

**Goal:** Package the product for purchase and download in a format that feels worth paying for.

### Format defaults

- **PDF** is the default for $19–$29 products. It feels like a real artifact, displays consistently across devices, and cannot be accidentally edited.
- Use the shared PDF chrome and layout primitives per [`PDF_CHROME.md`](PDF_CHROME.md).
- Keep layout clean and functional — not a design showcase. The buyer is trying to find a template, not admire the layout.

### Page organization

1. **Cover page** — product name, Brand Alchemy mark, price (optional)
2. **How to use this** — half a page maximum. Include: what the fill-ins mean, how to tell which template fits your situation, and one sentence connecting to Identity Kit for owners who have it
3. **Templates by category** — one category per page or section. Category name as a clear heading. Number each template within the category.
4. **No fluff pages** — no "thank you for your purchase," no five-page introduction, no worksheet pages unless the brief specifically calls for them

### Cover art pattern (social content packs)

**Shared layout, industry-specific photo** — same cover chrome for every social pack SKU (white title panel + full-bleed image below; see `generate-content-pack.mjs`). **Do not** use one generic “social media” stock image across all industries.

| Layer | Rule |
|-------|------|
| **Layout** | Shared — eyebrow, Source Serif title, italic `coverStatement`, photo fills remainder of Letter page |
| **Photo** | **One cover per industry SKU** — buyer should recognize their world at a glance |
| **File path** | `public/pdf-assets/social-content-pack-{industry}-cover.jpg` (e.g. `…-salon-cover.jpg`, `…-cafe-cover.jpg`) |
| **JSON** | `"coverPhoto": "../../public/pdf-assets/social-content-pack-{industry}-cover.jpg"` on the pack manifest |
| **Visual style** | Real environment (chair, tools, cup, job site) — per [`BRAND_GUIDELINES.md`](BRAND_GUIDELINES.md): atmospheric, grayscale or muted, no staged smiles, no text baked into the image, center-weighted for crop |
| **License** | **Free-license photography only** — Unsplash, Pexels, or equivalent with commercial use. Log photographer, URL, and license in [`public/pdf-assets/ATTRIBUTION.md`](../public/pdf-assets/ATTRIBUTION.md). |
| **Never** | **AI-generated images** (DALL·E, Midjourney, Stable Diffusion, Cursor image generation, etc.). If no suitable free photo exists, pick a closer comp or defer the SKU cover — do not synthesize. |
| **Compression** | JPEG preferred. **Crop to the PDF cover viewport** — `612×644` pt in `generate-content-pack.mjs` (full Letter width × remaining page height). Export at **2×** (**1224×1288** px) or 1×; aspect **~0.95:1** (slightly wider than tall). **Do not** use legacy `485×1024` portrait — that aspect gets center-cropped in the PDF and often shows blank wall. Bottom-weight the crop for salon interiors (chairs, mirrors) so the subject survives `objectFit: 'cover'`. Target **150–250 KB** at quality **85–90**. |
| **Avoid** | Phone mockups, Canva-style caption graphics, influencer stock, clipart, paid stock without a site-wide license, **neon signs / meme quotes**, visible business logos in frame, ornate or cluttered station shots |

**Product-type vibe (same industry, different product)** — cover photo should match what the pack is *for*, not just the industry:

| Product type | Salon example | Café example |
|--------------|---------------|--------------|
| **Social content pack** | Chair, mirror, salon floor — post-worthy, in-service energy | Counter, cup, morning light — something you'd photograph for the feed |
| **Email blast pack** (future) | Consultation nook, product shelf, appointment book — quieter, “written to inbox” | Menu board edge, pastry case — still life, less “hero shot” |
| **Promo & offer pack** (future) | Retail display, seasonal setup, gift-card moment | Special board, seasonal drink — offer-forward without text in the image |

**KIT 01 (internal generic framework)** may use a neutral cover; **shippable industry SKUs (KIT 04+)** each get their own asset. Prefer `social-content-pack-{industry}-cover.jpg` over legacy `*-photos-collage-sample.png` collages.

### PDF text constraints (social packs)

- **No emoji or Unicode symbols** in template body text — they often fail to render in `@react-pdf/renderer` (e.g. swipe arrows). Use plain words: “Swipe to see the before,” not `➡️`.
- **ASCII punctuation only** unless a symbol is verified in a generated PDF preview.

### File naming

`[product-slug].pdf` — example: `social-content-pack-salon.pdf`. No version suffix in the deliverable filename; iterate the JSON manifest and regenerate in place.

### Social pack intro (locked copy)

All **social** content packs (`packType: "social"` or slug `social-content-pack*`) share the same page-2 hook stack and pivot from [`packages/pdf-shell-sample/content/shared/social-pack-intro.json`](../packages/pdf-shell-sample/content/shared/social-pack-intro.json). **Do not** duplicate or edit per SKU — only `hookDescription` (and instructions) vary by industry.

**Locked lines (verbatim):**
1. You know you should post this week.
2. You open the app.
3. Stare at the blank screen.
4. Close it again.
5. You just don't know what to say. *(pivot — Inter, same scale as stack)*

Industry-specific value proposition follows in `hookDescription`.

### Content pack PDF layout (standard)

`generate-content-pack.mjs` is the **standard formatter** for $19–$29 template PDFs (social now; email/promo later with manifest tweaks). Cover → intro page → templates flow → footer chrome. Email packs may adjust intro structure later; social uses the shared hook above.

### Checklist before delivery

- [ ] All six Stage 4 checks passed
- [ ] Instructions page finalized (written after templates, not before)
- [ ] Fill-ins consistently formatted throughout ([brackets], not {curly} or _underscores_)
- [ ] Template count matches the brief range
- [ ] PDF layout reviewed at actual reading size (not just in a design tool)
- [ ] File named correctly and versioned

---

## Part 2: Kit briefs and production backlog

### Production strategy: industry-specific packs

All $19 content packs are industry-specific. Each product TYPE (social, email, promo, holiday, core content) will have a separate SKU per starting industry rather than one generic version that tries to work for everyone.

**Why:** Generic templates are forced to be vague. Industry-specific templates can be genuinely specific — a café pack can reference the morning prep list; a contractor pack can reference the job site and the estimate. Specificity is what makes a template feel worth using rather than worth skipping. This also solves the content quality problem that appears when writing for "any business."

**What this is not:** We are not creating dozens of industry packs all at once. We start with three industries, prove the format, then expand horizontally (more industries) and vertically (more product types).

**Starting industries — three packs ship first:**

| Industry | Rationale |
|---|---|
| **Salons & Beauty** | Largest buyer category for copy packs; Instagram-native; clearest content scenarios (before/after, client moment, availability, transformation); high purchase intent |
| **Cafés & Coffee Shops** | Massive market; posting is already cultural in this industry; rich specific angles (morning prep, regulars, seasonal drinks, the counter); easiest to write well |
| **Home Services** (plumbers, electricians, HVAC, contractors) | Huge underserved market; trades are notoriously bad at social and know it; specific before/after scenarios that no competing pack addresses |

**Full product × industry matrix (long-term vision):**

```
Product type            Salons   Cafés   Home Svcs   …more industries
Social Content Pack      $19      $19       $19
Email Blast Pack         $19      $19       $19
Promo & Offer Pack       $19      $19       $19
Holiday & Events Pack    $19      $19       $19
Core Content Pack        $29      $29       $29
```

Each cell is one SKU. The Local Kits (Google/Yelp) and Identity Kit remain industry-agnostic — they are the foundation layer. Content packs are the specific layer on top.

**Internal reference packs (KIT 01–03):** These are generic versions that proved the format, writing process, and PDF pipeline. They are NOT sellable products. They exist as internal frameworks that each industry-specific pack is built from.

---

These are the first products planned for production. Each brief is at a "ready to enter Stage 3" level — research has been validated through the article candidate log and general market knowledge. **Run the full Stage 1 pass (1a–1d) before writing begins.** Completed research lives in `docs/digital-product-research/`.

---

### KIT 01 — Social Content Pack *(internal framework only — not for sale)*

```
PRODUCT BRIEF: Social Content Pack (internal reference)
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Social Content Pack
  Price:             $19
  Funnel position:   Primary Identity Kit checkout bump; also available standalone

BUYER
  Starting state:    Posts inconsistently or not at all. Knows they should post but
                     blanks out on what to say. Has probably gone quiet for weeks at
                     a time. Does not want to become a "content creator."
  End state:         Has 30+ ready-to-use captions organized by situation. Can open
                     the pack, find a template that matches the week, fill in their
                     city or trade in under 30 seconds, and post.

CONTENT SPEC
  Format:            Ready-to-post. Zero-fill is valid and preferred; ~1/3 of templates
                     should need no modification at all. 1 fill allowed when the template
                     genuinely needs a local or trade reference to feel grounded.
  Fill-in standard:  [your city/town], [your trade or type of business] for most
                     templates. Customer moment and proud-of templates may use
                     one specific-detail fill ([what they came in with], [the result],
                     [the milestone]) when the owner can answer it in under 5 seconds.
  Template count:    30–35
  Categories:
    1. This is who we are (intro / first impression posts for new followers)
    2. We're open / come see us (presence + availability, not promotional)
    3. Behind how we work (process, a day in the business, what care looks like)
    4. A customer moment (a situation from this week, no names needed)
    5. Local life (referencing the neighborhood, the town, the season)
    6. Something we're proud of this week (a small win, no context needed)

EXPRESSIVITY RANGE
  Required registers: Real, Warm, Confident, Light
  1–2 Wry templates per pack (dry self-awareness reads as distinctly human)
  At least 1–2 Quiet templates per pack (the understated ones often resonate most)
  Avoid: every template sounding grateful/warm — that is the default drift for this category

CONSTRAINTS
  Off-limits:        Marketing jargon — "content strategy," "algorithm," "engagement,"
                     "brand voice," "authentic," any term a professional marketer uses
                     that a small business owner would not. Nothing that sounds like it
                     was written for a content creator.
                     Note: urgency, humor, social proof, specific outcomes, and direct
                     CTAs are not off-limits — they work because they are human. Use them.
  Industry rule:     Must work for a plumber, a florist, and a café. No word that
                     implies a product business (shop, items, stock), service business
                     (clients, appointments), or food business (menu, taste) unless
                     paired with alternatives in the same template.
  Standalone rule:   Works without Identity Kit. With Identity Kit voice playbook,
                     the owner can swap in their own phrases — note this in instructions.

QUALITY BAR
  A template ships when: a hair salon owner can grab it, type her city, and post it
                         in under 3 minutes without it sounding like a template.
  A template fails when: it requires more than one fill-in that needs thinking;
                         OR it uses any word on the off-limits list;
                         OR a customer reading it would have no particular response.

CATALOG CONTEXT
  Sits next to:      Email Blast Pack ($19), Promo & Offer Pack ($19),
                     Core Content Pack ($29)
  Differentiated by: Social Content Pack = routine weekly presence.
                     Core Content Pack = broader routine updates (includes non-social).
                     Promo & Offer Pack = when you want to drive action.

STATUS
  Sample framework complete.
  PDF layout, content density, and typographic design are established.
  All 30 templates are working drafts that demonstrate voice, register variety, and
  category coverage — NOT final customer-facing copy.
  Next: full template rewrite to final voice spec → Stage 4 review → Stage 5 delivery.
```

---

### KIT 02 — Email Blast Pack

```
PRODUCT BRIEF: Email Blast Pack
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Email Blast Pack
  Price:             $19
  Funnel position:   Standalone; possible bump after Social Content Pack or local kit

BUYER
  Starting state:    Has a customer list (email, text, or a Facebook audience) and
                     wants to send something occasionally when there is news, a slow
                     week, or a seasonal moment — but freezes on what to write and
                     does not know how to start. Is not building an "email program."
  End state:         Has 15–20 complete, ready-to-send emails for specific moments.
                     Can open the pack, find the situation that matches today, copy it
                     into whatever they use to send emails, change the business name,
                     and send — without sounding like a corporate newsletter.

CONTENT SPEC
  Format:            Complete short emails: subject line + 3–5 sentence body + 1 CTA line.
                     Subject lines and bodies should be zero-fill wherever possible.
                     [your business name] is the only expected swap for most emails.
  Fill-in standard:  [your business name], [your town], [a date] only.
                     Subject lines must work as-is or with the business name swap.
  Template count:    15–20 complete emails
  Categories:
    1. We added something new (new offering, new product, new hours, new location)
    2. Slow week / come see us (availability, invite without desperation)
    3. We miss you (re-engagement for customers who haven't been in a while)
    4. Big week coming up (event, milestone, seasonal push)
    5. Quick update (hours change, brief note, one-sentence-news)
    6. Thank you (end of year, after a good season, genuine gratitude)

EXPRESSIVITY RANGE
  Required registers: Real, Warm, Confident
  At least 1 Light and 1 Quiet per pack
  Avoid: all emails sounding like the same warmly professional newsletter voice — that
         is exactly what this pack must not sound like

CONSTRAINTS
  Off-limits:        "Subscriber," "campaign," "open rate," "drip," "sequence,"
                     "click here," "limited time offer," "don't miss out," "act now,"
                     any email marketing vocabulary. Emails must sound like the owner
                     typed them personally, not like MailChimp suggested them.
  Industry rule:     Must work for a restaurant, a home services company, and an
                     Etsy seller. No vocabulary that implies a specific business type.
  Standalone rule:   Works without Identity Kit. With Identity Kit, the owner can
                     pull their brand voice phrases in — note in instructions.

QUALITY BAR
  A template ships when: a bakery owner can copy it into their email sender, swap
                         in the business name, and send it today without it sounding
                         like a newsletter from a chain.
  A template fails when: it uses email marketing vocabulary the owner would not
                         recognize; OR it sounds like it was generated for a professional
                         marketer; OR the subject line would get ignored by most people.

CATALOG CONTEXT
  Sits next to:      Social Content Pack ($19), Email Content Pack ($29)
  Differentiated by: Email Blast Pack = occasional one-off sends for specific moments.
                     Email Content Pack = welcome sequences and early email programs
                     (for owners building a more structured email list).

STATUS
  Brief
```

---

### KIT 03 — Promo & Offer Pack

```
PRODUCT BRIEF: Promo & Offer Pack
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Promo & Offer Pack
  Price:             $19
  Funnel position:   Standalone; natural next step after Social Content Pack for
                     owners who have regular posting handled but need the "ask" posts

BUYER
  Starting state:    Can post regular content but freezes when they need to actually
                     ask for the sale, promote a specific thing, or drive foot traffic.
                     Is afraid of sounding pushy, desperate, or like a car dealer ad.
                     Defaults to saying nothing rather than sounding wrong.
  End state:         Has 25–30 posts for "ask" moments — each written in a warm,
                     direct owner voice that communicates clearly without pressure.
                     Can match a template to any promotion situation and post
                     without embarrassment.

CONTENT SPEC
  Format:            Ready-to-post. Zero-fill strongly preferred here — "ask" posts lose
                     their directness when loaded with brackets. [your town] is the one
                     acceptable fill when local grounding helps.
  Fill-in standard:  [your trade/type of business], [your town] only.
                     Note: some templates will be booking-model specific (fitness studio,
                     salon, service with scheduled appointments). Every category must
                     include at least one non-booking alternative so walk-in and
                     retail businesses are covered.
  Template count:    25–30
  Categories:
    1. We have room / availability this week (not desperate — confident and inviting)
    2. Something new we offer (introduce a new offering without a hard pitch)
    3. Come see us this weekend (weekend or near-future traffic push)
    4. Book before [date] (time-bounded invite without manufactured scarcity)
    5. Here's what we do (clear explanation post — the "this is why you'd hire us")
    6. A quiet week (honest, relatable, direct ask — the hardest to write well)

EXPRESSIVITY RANGE
  Required registers: Confident, Real, Energetic (for new offerings)
  At least 2 Light templates (the "ask" category is the most likely to go too serious)
  Avoid: any pressure framing even accidentally — this is the highest-risk category for
         tipping into sales aggression; review every template against the customer
         read test specifically for this

CONSTRAINTS
  Off-limits:        "Limited time offer," "SALE," "don't miss out," "act now,"
                     "last chance," fake urgency signals, exclamation marks in multiples,
                     ANY all-caps for emphasis, aggressive or pressure-based framing.
                     No templates that would embarrass the owner to post.
  Industry rule:     Must work for a plumber, a fitness studio, and a gift shop. The
                     "ask" framing must be industry-agnostic.
  Standalone rule:   Works without Identity Kit. Pairs naturally with the Social
                     Content Pack (presence + ask as a pair).

QUALITY BAR
  A template ships when: a general contractor could post it to promote their
                         availability this week and it sounds like a person, not an ad.
  A template fails when: it uses pressure language; OR a customer reading it would
                         feel sold at rather than invited; OR it would only work for
                         one type of business.

CATALOG CONTEXT
  Sits next to:      Social Content Pack ($19), Email Blast Pack ($19)
  Differentiated by: Social Content Pack = presence and visibility.
                     Promo & Offer Pack = driving action and asking for business.
                     These two are natural pairs.

STATUS
  Internal framework only — not for sale.
```

---

### KIT 04 — Social Content Pack: Salons & Beauty *(first to ship)*

```
PRODUCT BRIEF: Social Content Pack — Salons & Beauty
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Social Content Pack: Salons & Beauty
  Price:             $19
  Funnel position:   Standalone; possible bump after Identity Kit or Google/Yelp Kit

BUYER
  Starting state:    Owns or works at a salon, beauty studio, nail studio, or esthetician
                     practice. Posts inconsistently — often only when something big happens.
                     Knows social media matters but freezes on what to say between
                     transformation posts. Has seen competitors posting more and wonders
                     what they're actually saying.
  End state:         Has 35 captions for the situations that actually come up — a great
                     client moment, a quiet Tuesday with open appointments, a question for
                     the feed, a before/after that deserves more than just the photo. Can
                     post without writing from scratch.

CONTENT SPEC
  Format:            Ready-to-post captions. Short (2–4 sentences). Social-first.
  Fill-in standard:  [your town], [your specialty or service], and one specific-detail fill
                     per customer moment template ([what they came in wanting], [the result]).
                     Owners in this industry have rich specific details — invite them in.
  Template count:    35
  Social rhythm:     [removed — do not use shape targets or pack quotas; see Stage 3
                     Social caption packs short gate]
  Categories:        [7 named scenario buckets × 5 templates each]
    1. If you're new here (first impression)
    2. Open chair this week (open slot, slow day, appointment reminder)
    3. What you can expect (behind the chair, process, what care looks like here)
    4. A client moment (transformation, result-first — photo does the work)
    5. The regulars (salon vibe, team, personality — not a loyalty speech)
    6. A win this week (transformation you're proud of, seasonal punch, hot take)
    7. Start a conversation (poll/question posts — replies over reach, no fresh result)

EXPRESSIVITY RANGE
  Social caption packs: no register quotas — short gate only (see Stage 3).
  Tag registers in JSON after drafting if useful; do not plan mood rotation upfront.
  Empty "we LOVE our clients!" is bad; real warmth, humor, promos, and `!` are fine when comps do it.

CONSTRAINTS
  Industry-specific allowed vocabulary: "chair," "appointment," "the look," "the result,"
    "client," "transformation," "the color," "the cut" — these narrow to beauty but are
    correct for this pack.
  Off-limits:        Invented claims (#1 in town, guaranteed results). Franchise/Groupon chain voice.
                     Salon promos and comp-style urgency are **allowed** in templates.
  Comp reference:    `docs/digital-product-research/KIT-04-competitor-caption-examples.md`
                     (24+ Tier A lines — required before drafting)
  Standalone rule:   Works without Identity Kit. With Identity Kit voice playbook,
                     the owner can inject their salon's specific personality.
  Perspective:       Use (I/we) notation **only** where solo stylist vs salon voice genuinely differs;
                     default to **we** for team/salon/policy lines. Solo stylist swaps on marked templates only.

QUALITY BAR
  A template ships when: a solo esthetician can grab it, add her town, and post it
                         in under 2 minutes and it sounds like her — not like a
                         social media manager wrote it.
  A template fails when: it could have been written by a chatbot about any beauty brand;
                         OR it uses language a neighborhood nail studio would never say;
                         OR it narrates the posting situation instead of leading with result/vibe;
                         OR it repeats the same caption structure across the pack.

STATUS
  Stage 3 ship-ready in `packages/pdf-shell-sample/content/social-content-pack-salon.json` · `output/social-content-pack-salon.pdf`
  Comp library: Tier A complete (June 2026)
  Next: Stage 4 full-pack review (short gate only)
```

---

### KIT 05 — Social Content Pack: Cafés & Coffee Shops

```
PRODUCT BRIEF: Social Content Pack — Cafés & Coffee Shops
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Social Content Pack: Cafés & Coffee Shops
  Price:             $19
  Funnel position:   Standalone

BUYER
  Starting state:    Owns or manages an independent café, coffee shop, or espresso bar.
                     Posting is sporadic — sometimes a latte art photo, sometimes nothing
                     for three weeks. Knows regulars would engage but doesn't know what to
                     say beyond "we're open."
  End state:         Has 30 captions for the actual moments of café life — the early
                     morning before anyone walks in, a regular's order, a slow Tuesday,
                     something new on the menu, a week that felt right.

CONTENT SPEC
  Format:            Ready-to-post captions. Short. Social-first.
  Fill-in standard:  [your town], [the drink or item], [the specific detail].
                     Cafés have inherently specific details — lean into them.
  Template count:    30
  Categories:
    1. Who we are (neighborhood café identity, what kind of place this is)
    2. We're open / come in (morning presence, slow day, weekday invite)
    3. The craft (what goes into the work, the prep, the care before the doors open)
    4. A regular moment (a customer interaction, a returning face, a first-timer)
    5. Local life (neighborhood energy, the block, the season)
    6. This week (a win, a milestone, a good run of days)

EXPRESSIVITY RANGE
  Required registers: Warm, Quiet, Real, Wry
  Avoid: corporate coffee chain voice — no "crafted with care," no "hand-selected beans,"
         no influencer language; should sound like the person behind the counter

CONSTRAINTS
  Industry-specific allowed vocabulary: "espresso," "the bar," "the regulars," "the cup,"
    "the morning rush," "the prep list" — these narrow to cafés and are correct for this pack.
  Off-limits:        Coffee chain vocabulary, influencer aesthetics, "cozy vibes."

QUALITY BAR
  A template ships when: the person who opens at 6am reads it and thinks "yes, that's us."
  A template fails when: it could apply to any café chain or sounds like a lifestyle brand.

STATUS
  Brief pending — content not yet written.
```

---

### KIT 06 — Social Content Pack: Home Services

```
PRODUCT BRIEF: Social Content Pack — Home Services
─────────────────────────────────────────────────────────────────────

SKU
  Name:              Social Content Pack: Home Services
  Price:             $19
  Funnel position:   Standalone; strong candidate for Local Kit bump

BUYER
  Starting state:    Runs a plumbing, electrical, HVAC, general contracting, or similar
                     home services business. Has almost no social media presence —
                     knows they "should post" but genuinely has no idea what to say.
                     Their work is unsexy to them (they do it every day) but deeply
                     reassuring to homeowners (who are anxious about everything breaking).
  End state:         Has 30 captions that reframe everyday work as trustworthy and
                     confidence-building — without sounding like an ad or a franchise.

CONTENT SPEC
  Format:            Ready-to-post captions. Short. Social-first.
  Fill-in standard:  [your town], [the job or trade], [what it was / what it took / how long].
                     The specific detail is the whole post — owners know it in 2 seconds.
  Template count:    30
  Categories:
    1. Who we are (how long we've been here, what kind of company this is)
    2. We're available (slow week, booking open, come find us)
    3. The work (what a job actually looks like, what it takes, what most people don't see)
    4. A customer moment (the problem they'd been living with, the fix, the relief)
    5. Local life (serving this town, being part of the neighborhood)
    6. A win (a job well done, a week that came together, a milestone)

EXPRESSIVITY RANGE
  Required registers: Confident, Real, Wry, Warm
  Avoid: contractor bravado ("we get it done!") and corporate contractor voice
         ("our team of professionals"); should sound like the person who answered the phone

CONSTRAINTS
  Industry-specific allowed vocabulary: "the job," "the call," "on-site," "the fix,"
    "the estimate," "the homeowner" — correct for this pack.
  Off-limits:        Aggressive availability pressure, urgency language, fake reviews
                     or testimonial framing, anything that sounds like a Yelp ad.

QUALITY BAR
  A template ships when: a solo plumber reads it and thinks "I would actually post that."
  A template fails when: it sounds like it came from a franchise marketing team.

STATUS
  Brief pending — content not yet written.
  High priority: largest underserved market in this category.
```

---

## Process checklist (quick reference)

| Stage | Done when |
|-------|-----------|
| **1 Research** | Demand confirmed, owner language collected, competitive audit complete, pattern synthesis + template count locked |
| **2 Brief** | All fields complete, quality bar defined in plain English |
| **3 Content** | All templates written; template gate passed (incl. rhythm for social packs); instructions drafted |
| **4 Review** | All 6 checks passed: walker, owner use, customer read, distinctness, expressivity, voice |
| **5 Format** | PDF complete, delivery checklist passed, file named and versioned |

---

*Companion documents: `PRODUCTS_PRICING_AND_INCLUDES.md`, `ACQUISITION_FUNNEL_AND_SKU_MAP.md`, `TARGET_AUDIENCE.md`, `BRAND_PLAYBOOK.md`, `product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md`*
