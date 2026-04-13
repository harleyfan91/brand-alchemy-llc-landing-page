# Brand Alchemy — Article Writing Schema

## Purpose

**Scope boundary:** This file starts **after** a topic is chosen. It governs **deeper research on that one article** (Stage 2: stats, named sources), **structure**, **full draft**, and **publish QA**. For **finding ideas**, building the backlog, and filling the **candidate brief**, use **`ARTICLE_RESEARCH_SYSTEM.md`** first.

This document governs how every Brand Alchemy article is researched, structured, written, and checked before publication. It is the companion to `ARTICLE_RESEARCH_SYSTEM.md`, which covers topic discovery and candidate briefs. This document picks up where that one leaves off: a candidate brief exists, and now an article needs to be produced.

Hand this document to an AI writing session alongside the specific candidate brief from the research system. The AI should follow all stages in order. No stage should be skipped.

---

## The Five Stages

```
Stage 1 → Brief review
Stage 2 → Data research
Stage 3 → Structural plan
Stage 4 → Full draft
Stage 5 → QA and publish prep
```

Each stage is defined in detail below.

---

## Stage 1: Brief Review

Before writing a single word, confirm these inputs are present and complete. If any field is missing, return to `ARTICLE_RESEARCH_SYSTEM.md` and complete the candidate brief first.

**Required inputs from the candidate brief:**

| Field | Why it matters |
|-------|---------------|
| Working title | Sets the H1 and the scope |
| Format type | Explainer / How-to / Decision guide — determines structure |
| Awareness stage | Sets how much context the intro needs to provide |
| Core question | The single question the article must answer completely |
| Reader starting point | Determines what the article can assume vs. must explain |
| Reader end state | The test for whether the article is complete |
| Off-limits | Jargon, audience types, tools to exclude |
| Gap vs. existing | The angle that makes this worth reading vs. what already exists |
| Product adjacency (primary) | Which product fits, if any |
| AI draft prompt seed | The system prompt fragment for the draft pass |
| Homepage category | Must match `Articles.tsx` / future index: Brand Basics, Social Media, Get Found, Website, or Reputation |
| Platform-sensitive | Yes or No — if Yes, Stage 5 platform/policy QA applies |

**Format check:**
- Explainer → the reader doesn't know the concept yet; the article must define before it advises
- How-to → the reader knows the problem; go faster, be more prescriptive
- Decision guide → the reader is mid-paralysis; help them choose, not just understand

Confirm the format before proceeding to Stage 2.

---

## Stage 2: Data Research

**This stage must happen before drafting. It is not optional.**

The reason: Brand Alchemy articles need a minimum fact density to perform in AI search (GEO). Vague claims ("many businesses struggle with...") are unpickable by AI systems and unconvincing to owners. Specific, sourced claims ("63% of customers will update a negative review if the business resolves the issue") do both. The data research stage finds those claims before writing begins so they can be woven in naturally, not retrofitted awkwardly.

### What to collect in Stage 2

For each article, find and record **3–6 data points** that meet all of the following:

1. **Specific** — a number, a percentage, a named study, a named source. "Research shows" is not a data point. "BrightLocal's 2025 consumer review survey found that 20% of consumers look for reviews from the past two weeks" is.
2. **Relevant** — directly supports the article's core question, not just loosely related to the topic
3. **Current** — from 2023 or later where possible; note the year for every stat
4. **Owner-accessible** — something a small business owner would find credible and useful, not an academic metric they'd need to interpret

### Where to look

- Named consumer surveys (BrightLocal, Edelman, HubSpot, Pew Research)
- Platform-specific data (Google, Yelp, Meta official statistics)
- Industry research organizations (Nielsen Norman Group for UX claims)
- News coverage of published studies (secondary is fine if the original is cited)
- Brand Alchemy candidate brief — some articles already have data points captured from the first research pass; use those as the starting set and fill gaps

### What to avoid

- Undated statistics
- Claims that cite "a study" without naming it
- Vendor-produced statistics that clearly serve the vendor's interests (unless corroborated)
- Data older than 2022 unless it's foundational and no more recent version exists

### Stage 2 output format

Record findings in this format before moving to Stage 3:

```
DATA POINTS FOR: [Article working title]
─────────────────────────────────────────────────────────────────────

[1]
Stat:    [Exact claim]
Source:  [Named source + year]
Use for: [Which section or argument this supports]

[2]
Stat:    [Exact claim]
Source:  [Named source + year]
Use for: [Which section or argument this supports]

[... continue for all 3–6 data points]
```

Only proceed to Stage 3 when at least 3 valid data points are logged.

---

## Stage 3: Structural Plan

Map the article before writing prose. This takes 5–10 minutes and prevents the most common AI draft failure: good sentences in the wrong order.

### The universal skeleton

Every Brand Alchemy article follows this skeleton regardless of format. Format-specific variations are noted below.

```
[SEO METADATA]
  - URL slug
  - Title tag (H1)
  - Meta description

[HERO IMAGE]
  Required on every article. See Visual planning below for spec and brand rules.

[ANSWER BLOCK]
  40–80 words. Directly answers the core question. Lives before the first H2.
  Note: the answer block comes AFTER the hero image and BEFORE the introduction.

[INTRODUCTION]
  2–3 short paragraphs. Frames the problem, confirms the reader is in the right place,
  previews what the article delivers. Target 120–160 words (same limits as Stage 4 intro rules).

[BODY — 3 to 6 H2 sections]
  Each H2 answers one sub-question. Each section: 100–300 words.
  CTA placement decision made here (see Stage 4 CTA rules).
  Body visuals (process diagrams, stat callouts, comparison tables) are placed
  inline within sections where they add the most value. See Visual planning below.

[CTA — optional, 0 or 1 per article]
  If used: transition block after the last body H2 (see Stage 4 CTA Pattern B), or an
  inline mention at the relevant step (Pattern A). Never in the closing paragraph.

[FAQ SECTION]
  H2: "Quick answers" or "[Topic]: common questions"
  3–5 questions, each with a 1–3 sentence direct answer.
  Comes after the CTA block when a CTA exists, otherwise after the last body H2.

[CLOSING]
  2–4 sentences. The takeaway, not a summary. What they should do first.
  Comes after the FAQ. No product CTA here — CTAs live only in the body or the optional
  transition block before the FAQ.
```

### Format-specific body structure

**Explainer format**
The body builds understanding progressively: define the concept, show why it matters, clarify common misconceptions, and end with a concrete first step. Avoid giving the impression that the concept is complex — the goal is to make it feel manageable.

```
H2: What [concept] actually means (in plain English)
H2: Why it matters for a local business
H2: The most common mistake owners make with [concept]
H2: What "good enough" looks like in practice
H2: The first step you can take today
```

**How-to format**
The body is sequential — steps in the order they should be done. Each H2 is an action, not a description. Use numbered steps within each H2 if there are sub-actions. Make it clear at every step what the outcome of that step looks like.

```
H2: Before you start — what you need (30 seconds)
H2: Step 1: [Action verb + outcome]
H2: Step 2: [Action verb + outcome]
H2: Step 3: [Action verb + outcome]
H2: What to do if [common friction point]
H2: Keeping it up week to week
```

**Decision guide format**
The body gives the reader the criteria for deciding, then helps them apply those criteria. Avoid false balance — the article should reach a conclusion. Owners came here because they're stuck; give them a landing place.

```
H2: The real question you're trying to answer
H2: When [Option A] is the right move
H2: When [Option B] is the right move
H2: The one thing that matters most
H2: Here's what we'd do in your situation
```

### Plan the sections before writing

Write just the H2s and a 1-sentence description of what each section covers. Assign data points from Stage 2 to specific sections. Note CTA placement if one is being used. Note any body visuals planned (see Visual planning below). Only when this skeleton is approved should drafting begin.

---

### Visual planning

Decide which visuals this article needs as part of Stage 3 — not after the draft is written. Retrofitting visuals into a finished article is how you get images that decorate rather than add meaning.

**The core principle: every visual must do work text can't do as efficiently.** A photo of a person working at a desk does nothing a paragraph can't do. A process diagram of a three-step review-asking sequence replaces 200 words and is easier to follow. That's the standard.

---

#### Hero image (required on every article)

Every article gets a hero image. This is standard across editorial content — readers expect it, and it meaningfully affects bounce rate and time-on-page signals that feed SEO.

**Context:** Brand Alchemy does not currently have custom photography. This is not a problem — the options below are ordered to reflect what works best given that reality. Custom photography, if it becomes available, slots in as a future option alongside or ahead of Option 2.

**What to use (in priority order):**

1. **Branded typographic card** — The title or a short pull phrase from the article, set in Playfair Display on a dark or neutral background, with the β△ mark in the corner. No photography needed. This is the default approach for Brand Alchemy articles and should be used whenever no strong visual anchor exists for the topic. It signals that content is the product — consistent with the knowledgeable-friend voice — and always looks on-brand. The card can be templated once and generated per article by swapping the title text (5-minute production task in Figma or Cursor).

2. **Grayscale-treated stock** — When the article topic has a clear visual anchor (a counter or storefront for a Google Business profile piece, a close-up of a phone for a review article), atmospheric stock photography applied with the site's existing grayscale treatment becomes intentional brand texture rather than borrowed imagery. The critical rule: **search for the environment of the topic, not the action.** A desk surface, a café counter, hands on a keyboard, a shop window — these work. A person confidently holding a phone and smiling does not. The grayscale filter strips away the "stock-ness" of a photo; full-color lifestyle imagery with recognizable staged scenes triggers banner blindness regardless of treatment. Best sources: Unsplash architecture, texture, and object categories — not the business or workplace categories.

3. **Original photography** — Future state when available. Real photos of local business environments (counters, storefronts, hands at work, products) are the highest-trust option. When this becomes available, it replaces Option 2 and the typographic card becomes reserved for concept-heavy articles with no clear visual.

**What to never use:**

- Full-color generic stock imagery (people smiling at laptops, staged office scenes, generic handshake photos)
- Images with text overlaid that duplicates the H1 (redundant and clutters mobile)
- Images with heavy filters, gradients, or treatments inconsistent with the site's clean aesthetic
- Any image that reads as "this is a stock photo" in full color — if the grayscale treatment is what makes it work, apply it; if grayscale still doesn't save it, use a typographic card instead

**Technical spec:**
- Dimensions: 1200 × 630px minimum (covers both article page and social sharing previews)
- Format: WebP with JPEG fallback
- File size: under 150KB after compression
- Alt text: descriptive, 10–15 words, includes primary keyword naturally — not "hero image" or the article title verbatim

---

#### Body visuals (optional, format-dependent)

Most articles benefit from one body visual. Some need none. A few (particularly data-heavy how-tos) can support two. Never add a visual because the article "looks like it needs one" — every body visual earns its place by making something clearer than prose could.

**When a body visual genuinely helps:**

| Situation | Visual type to use |
|-----------|-------------------|
| 3+ steps that build on each other | Process diagram (simple numbered flow) |
| Data points that are more meaningful side-by-side | Stat callout block or simple bar chart |
| Two options being compared | Side-by-side comparison table |
| A concept that has a spatial or structural relationship | Conceptual illustration or labeled diagram |
| A checklist the reader will want to reference later | Styled checklist graphic (can be saved or printed) |

**Format guidance by article type:**

- **Explainer** → usually 0–1 body visuals. A simple conceptual diagram can replace a complex paragraph, but many explainers are served better by clear prose alone.
- **How-to** → 1 body visual is often the right call. A process diagram showing the full sequence of steps before the step-by-step prose gives readers a mental map to orient from.
- **Decision guide** → 0–1 body visuals. A comparison table or decision tree can crystallize the "which one is right for me" question. Only use if the comparison has 3+ dimensions worth showing.

**Brand requirements for all custom visuals:**

Custom charts, diagrams, and infographics must follow the brand system. They should not look like Canva defaults or generic template output.

- **Color palette:** Neutral gray base (`--ba-gray-*` token range). Use a single accent color from the brand token set for emphasis — not a rainbow of colors. Reserve black for primary labels and white for backgrounds.
- **Typography:** Playfair Display (serif) for any display headline within the visual. Inter (sans-serif) for labels, callouts, and body text within the visual.
- **The β△ mark:** Include a small β△ attribution mark or "Brand Alchemy" wordmark in the corner of any standalone infographic or diagram that could be shared outside the article. This is a brand signal, not a watermark.
- **No drop shadows, gradients, or rounded-corner overuse.** The site's aesthetic is clean and flat — visuals should match.
- **Borders and dividers:** Use thin rules (0.5–1px, gray) rather than colored borders to separate elements within a visual.

**Technical spec for body visuals:**
- Width: 100% of the content column (typically 720px rendered)
- Format: SVG preferred for diagrams and charts (scales perfectly, small file size); PNG/WebP for any raster content
- Alt text: required. Describe what the visual shows, not just what it is ("Bar chart showing that 63% of customers update a negative review after the business responds" not "bar chart")
- Caption: optional but recommended for data visuals. 1 sentence, source attributed if the data came from external research.

---

#### The branded summary infographic (optional, high-effort, high-return)

For articles where the content naturally summarizes into a standalone shareable format — typically data-heavy how-tos or articles with 5+ discrete steps — a branded summary infographic can be worth the production effort.

This is the one visual format that goes beyond article support and becomes its own asset: it gets shared, pinned, embedded, and linked to independently. Multiple SEO sources (The HOTH, Backlinko, HubSpot) cite infographic-bearing articles generating significantly more inbound links than text-only equivalents — commonly referenced as ~178% more, though exact figures vary by study. Verify against current sources before repeating this stat in an article.

**When it's worth producing:**
- The article has 5+ steps or 4+ data points that relate to each other
- The content is genuinely evergreen (will still be accurate in 2 years)
- There's a natural "one-page summary" version of the article that would be useful on its own

**When it's not worth it:**
- The article is primarily narrative or voice-driven (infographics strip out what makes it good)
- The content will date quickly (policy changes, platform-specific steps)
- You don't have design time available — a mediocre infographic is worse than none

**If producing a summary infographic:**
- It lives at the bottom of the article body, before the FAQ section
- It's also saved as a standalone asset for potential social distribution
- It carries the β△ mark and "brandalchemy.com" URL in the footer
- The surrounding paragraph should introduce it: *"Here's the short version if you want to save it."*

---

## Stage 4: Full Draft

Execute the Stage 3 structural plan. All rules below — for metadata, the hero image asset, the answer block, introduction, body sections, CTAs, FAQ, and closing — apply during this stage. Work through them in skeleton order: metadata → hero image → answer block → intro → body sections → CTA (if applicable) → FAQ → closing.

Do not write sections out of order. Writing the closing before the body is complete produces summaries of what you intended to write, not of what you wrote.

---

### SEO metadata fields

These must be completed before or alongside the draft, not after. They are part of the article, not an afterthought.

**URL slug**
- Lowercase, hyphens only, no stopwords (a, the, for, in, of)
- Should match the core question phrase exactly where possible
- Max 60 characters
- Examples: `how-to-ask-for-google-review` / `what-is-brand-voice` / `google-business-profile-trustworthy`

**Title tag (H1)**
- 50–60 characters
- Primary keyword in the first 40 characters
- Question format preferred for this content type ("How to..." / "What is..." / "Which...")
- Do not duplicate the meta description
- Do not use brand name in H1 (it appears in the page title separately)
- Example: `How to ask for a Google review (without feeling pushy)` → 53 chars ✓

**Meta description**
- 140–155 characters
- One sentence that states what the reader gets from reading this
- Active voice, no filler phrases ("In this article we will...")
- Include primary keyword naturally
- End with a soft action signal or outcome: "...so you can grow your review count without guesswork."
- Example: `A simple script for asking happy customers to leave a Google review — in person, by text, or email — without feeling awkward about it.` → 139 chars ✓

**Schema type**
Assign one of the following. This tells the developer which structured data markup to implement:
- `Article` — every article gets this as a baseline
- `HowTo` — add this for all how-to format articles
- `FAQPage` — add this for the FAQ section on any article that has one (nearly all of them)
- These can stack: a how-to article gets `Article` + `HowTo` + `FAQPage`

---

### The answer block

**Position:** Immediately after the hero image, before the introduction and before the first H2 (same as GEO QA: first *text* block after the hero). No subheading. No label.

**Length:** 40–80 words. Hard limits — not a target range to approximate.

**Purpose (three things at once):**
1. Answers the core question directly for the reader who won't read further
2. Gives AI systems a clean, extractable answer block at the highest-weighted position on the page
3. Filters in the right reader ("yes, this is exactly what I was looking for") and filters out the wrong one

**Rules:**
- Must be self-contained — someone who reads only this block gets a complete answer
- No hedging ("it depends" as a standalone answer is disqualifying — it leaves the reader exactly where they started). Note: structured branching is not hedging. "If you're a service business, do X; if you're retail, do Y" is decisive — it gives the reader a landing place based on their situation. The test is whether the reader ends the block knowing what to do, not whether the block is simple.
- No "in this article" framing
- Plain language — zero marketing vocabulary
- Written in second person ("you" / "your business") to maintain the knowledgeable-friend voice

**Example (Candidate 09 — How to ask for a Google review):**
> The most effective time to ask for a review is immediately after a good experience — in person, before the customer walks out. If you miss that moment, a follow-up text or email within 24 hours is the next best option. Google now lets you generate a direct review link from your Business Profile dashboard, which removes almost all the friction. Keep it simple and don't offer anything in return — that violates Google's policy.

That's 73 words, answers the question completely, and gives the reader an immediate action.

---

### Introduction

**Length:** 120–160 words across 2–3 short paragraphs.

**Structure:**
1. Open on the problem or the feeling — not a definition, not a statistic, not "welcome to this article." One or two sentences that make the reader feel recognized. *"You know you should be asking customers for reviews. Actually doing it is another thing."*
2. Name what's blocking them. One sentence that identifies the specific friction this article addresses. This is where an awareness-stage match matters — for "Don't know the problem" articles, name the concept; for "Know the problem" articles, name the specific stuck point.
3. State what the article delivers. One plain sentence: *"Here's a simple script for asking — in person, by text, or email — and what to avoid so it doesn't backfire."*

**Rules:**
- No rhetorical questions as openers ("Have you ever wondered...?")
- No statistics in the introduction unless they're used to name the scale of the problem, not prove a claim
- No "in today's digital landscape" or any variant of that construction — ever

---

### Body sections

**Per-section rules:**
- Each H2 is a complete sub-question that can be understood without reading the others
- Length per section: 100–300 words. Shorter for steps; longer for explanations
- At least one data point must appear in the body (from Stage 2). Aim for one per 300–400 words of body copy
- Paragraphs: 2–4 sentences. Single-sentence paragraphs are allowed for emphasis but not as a default
- Active voice throughout. If you catch a passive construction, rewrite it
- Use H3 sparingly — only when a section genuinely has sub-topics, not to add visual structure for its own sake

**Data point integration rules:**
- Cite the source in-line parenthetically: *(BrightLocal, 2025)* or *"according to BrightLocal's 2025 consumer survey"*
- Don't lead a paragraph with a statistic — establish the point first, then use data to support it
- Never use a statistic without the source
- Round numbers cleanly: "roughly two in three customers" reads better than "63.4% of customers" in body copy; either is fine as long as the source is attributed

**Banned words and phrases (never use in body copy):**

| Banned | Use instead |
|--------|-------------|
| leverage | use |
| utilize | use |
| synergy / synergize | [delete or rewrite] |
| game-changer | [be specific about what changes] |
| deep dive | [just do it] |
| at the end of the day | [delete] |
| holistic | [be specific] |
| digital landscape | [delete] |
| in today's world | [delete] |
| seamlessly | [delete] |
| robust | [be specific] |
| journey (as metaphor) | [be specific] |
| empower / empowering | [be specific] |
| optimize (for general use) | improve, fix, adjust |
| marketing strategy | marketing plan, what you're doing |
| brand equity | [define what you mean] |
| engagement | [specify: comments, replies, visits] |
| content | posts, articles, photos, captions |
| personas | customers, the people you're trying to reach |
| funnel | [be specific about the moment] |

---

### CTA rules

**Decision tree — run this for every article:**

```
1. Is there a product that naturally solves something the article just addressed?
      NO  →  No CTA. End at the closing paragraph.
      YES →  Continue to question 2.

2. Is the adjacency genuine — would a knowledgeable friend actually recommend this here?
      NO  →  No CTA. A forced mention damages trust more than no mention.
      YES →  Continue to question 3.

3. Which CTA pattern fits?
      The product is a tool/template for a specific step  →  Inline mention
      The product is the logical next step after reading  →  Transition block
```

**CTA Pattern A: Inline contextual mention**
Use when: A specific product solves the exact problem being discussed at a specific point in the body.
Position: Inside the body, at the step where the product is relevant. Not in its own section — embedded in the paragraph.
Length: 1–2 sentences.
Tone: A recommendation, not a pitch.

> *The Google Core Kit includes 30 review response templates written for your industry — for positive and negative reviews — so you're not writing these from scratch each time.*

Note what's absent: no price, no "buy now," no urgency language, no "click here." Just a plain description of what the product does in the context where it matters.

**CTA Pattern B: Transition block**
Use when: The product is the natural next step after the full article — the reader has learned the concept, now they need the tools to execute it.
Position: After the last body H2, before the FAQ section.
Length: 3–5 lines.
Format: A visually distinct callout block (implementation detail for the developer — light border, slight background tint). Not a banner. Not a full product card.

```
[CALLOUT BLOCK]

  If you want the templates already built:
  
  The Google Core Kit includes step-by-step profile setup, 30 review
  response templates, and photo angles for your industry.
  
  → View the Google Core Kit
```

Again: no urgency language, no price in the CTA block (price lives on the product page), no superlatives.

**What a CTA should never do:**
- Interrupt the flow of a how-to mid-step
- Claim the product is essential when the article just showed how to do the thing without it
- Use "limited time," "don't miss out," "transform your business," or any high-pressure framing
- Appear more than once per article
- Link to a product that isn't directly relevant to the article's core question

---

### FAQ section

**Position:** After the last body H2, after the CTA block if one exists, before the closing.

**Heading:** Use one of these options, not a custom label:
- "Frequently asked questions"
- "[Topic]: common questions"

**Count:** 3–5 questions. No more.

**Question format:** Write exactly how an owner would type it into Google or ask it aloud. Full sentences, conversational.
- Good: *"Can I offer a discount in exchange for a Google review?"*
- Bad: *"Google review incentives policy"*

**Answer format:** 1–3 sentences. Direct and complete. Every FAQ answer must stand alone — it should make sense to someone who only reads that question and its answer, with no surrounding context.

**Purpose (dual):**
1. Captures PAA (People Also Ask) traffic for adjacent queries
2. Gives AI systems additional extractable Q&A pairs from the same page — one of the highest-cited GEO signals

**Example FAQ block (Candidate 09):**

> **Can I offer a discount in exchange for a Google review?**
> No — this violates Google's review policies and can result in reviews being removed or your Business Profile being suspended. Ask for honest reviews, not incentivized ones.

> **What's the best time to ask for a Google review?**
> Immediately after a good experience, while the customer is still with you. If you miss that moment, a follow-up text or email within 24 hours is the next most effective window.

> **How do I get my Google review link?**
> Log into your Google Business Profile, go to your dashboard, and click "Ask for reviews." Google will generate a direct link you can copy, share, or turn into a QR code.

> **What if a customer says yes but never leaves the review?**
> It happens. Send one follow-up — a text or email 2–3 days later — with the direct link. If they still don't, let it go. Repeated reminders damage the relationship and aren't worth it.

---

### Closing paragraph

**Length:** 2–4 sentences.

**Purpose:** Land the one thing the reader should do first. Not a summary — the article already covered everything. A closing should feel like the last thing a friend says before you leave: direct, warm, specific.

- Good: *"Start with the in-person ask. It's uncomfortable the first couple of times and then it isn't. Everything else — the text, the email, the QR code — builds from there."*
- Bad: *"We hope this article has helped you understand how to get more Google reviews for your small business. If you have any questions, feel free to reach out!"*

No sign-off. No "thanks for reading." No invitation to share or subscribe (those live in site chrome, not article body).

---

## Stage 5: QA and Publish Prep

Run every article through this checklist before it is considered complete. Every item is a binary pass/fail.

### Content QA

- [ ] The answer block is 40–80 words and self-contained
- [ ] The introduction is under 160 words and contains no rhetorical questions or "digital landscape" language
- [ ] Every H2 answers exactly one sub-question
- [ ] No section is over 300 words without a clear reason
- [ ] At least 3 data points are in the body, each with a named source and year
- [ ] No banned words or phrases appear anywhere in the article
- [ ] The article fully answers the core question from the candidate brief — no partial answer, no vague "it depends" without a landing place (structured if/then guidance counts as resolution; see answer block rules)
- [ ] The reader end state (from the brief) is achievable after reading this article

### Voice QA

- [ ] Written in second person throughout ("you" / "your business")
- [ ] Could be read aloud by a knowledgeable friend without sounding like a blog post
- [ ] No paragraph starts with "I" (this is a brand voice, not a personal essay)
- [ ] No sentence uses passive voice where active is possible
- [ ] Reading level: run through Hemingway Editor or equivalent — aim for Grade 7–8, hard ceiling Grade 9

### SEO QA

- [ ] URL slug is under 60 characters, lowercase, hyphenated, no stopwords
- [ ] Title tag is 50–60 characters, primary keyword in first 40 characters
- [ ] Meta description is 140–155 characters, active voice, includes primary keyword
- [ ] One H1 (the title), H2s for major sections, H3s only where genuinely needed
- [ ] At least 2 internal links are present — until inter-article links exist, link to live product pages (/identity-kit, /local-business) and section anchors (#services, #products, #articles) where relevant; do not invent URLs for articles not yet published
- [ ] All images have descriptive alt text (not "image1.jpg" or "photo of person")
- [ ] Schema type(s) assigned: Article + HowTo (if applicable) + FAQPage (if FAQ section exists)

### GEO QA

- [ ] Answer block is the first content after the hero image — no intro paragraph, no decorative element before it
- [ ] Each H2 section is modular — it answers its question without requiring the reader to have read the previous section
- [ ] FAQ section has 3–5 questions, each answerable in 1–3 sentences
- [ ] Author attribution is visible on the published page (name, date published) — byline follows [BRAND_PLAYBOOK.md](BRAND_PLAYBOOK.md) (*Content, articles, and SEO*): default **Brand Alchemy** unless a named contributor is documented for that piece
- [ ] Data points use named sources, not "studies show" or "research suggests"

### Visual QA

- [ ] Hero image is present
- [ ] Hero image is either: (a) a branded typographic card, or (b) atmospheric/textural stock in grayscale — not a full-color lifestyle or staged business scene
- [ ] If grayscale stock was used: the photo passes the "environment not action" test — no identifiable staged scenes, no smiling people, no generic office imagery
- [ ] Hero image alt text is 10–15 words, descriptive, includes primary keyword naturally
- [ ] Hero image is under 150KB after compression, WebP format with JPEG fallback
- [ ] Any body visuals earn their place — each one makes something clearer than prose alone
- [ ] All custom visuals (diagrams, charts, infographics) use the brand palette: neutral gray base, single accent color, no rainbow color schemes
- [ ] All custom visuals use Playfair Display for any headline text and Inter for labels/body text
- [ ] Any standalone infographic or diagram carries the β△ mark or "Brand Alchemy" attribution
- [ ] All body visual alt text describes what is shown, not just the visual type
- [ ] No body visual uses drop shadows, heavy gradients, or treatments inconsistent with the site aesthetic
- [ ] If a summary infographic was produced, it lives before the FAQ section with an introductory sentence

### CTA QA

- [ ] If a CTA is present, it appears only once
- [ ] The product mentioned in the CTA is directly relevant to the article's core question
- [ ] No urgency language, price, or superlatives in the CTA copy
- [ ] If no CTA is present, the decision not to include one was intentional (not an oversight)

### Platform and policy QA

*Apply this section to any article that references platform-specific features, policies, or UI steps (Google Business Profile, Yelp, social platforms, etc.)*

- [ ] All platform UI steps (e.g. "click Ask for reviews in your dashboard") verified against current platform as of publish date — these change without notice
- [ ] All policy statements (e.g. incentivized review rules, response moderation timelines) verified as current — flag in article metadata for annual re-check
- [ ] A comment or note is added to the article file or CMS record: "Re-verify platform steps and policies annually or after any major Google/Yelp update"

### Final check

- [ ] The article could be read without knowing anything about Brand Alchemy and still be completely useful
- [ ] The article does not require the reader to buy anything to get value from it
- [ ] The article sounds like Brand Alchemy, not like a generic marketing blog
- [ ] All product claims, kit contents, and any pricing references match current product descriptions in the codebase and acquisition funnel doc — if anything has changed since the candidate brief was written, update before publishing

If any item fails, fix it before marking the article ready for publication.

---

## Quick reference: article spec at a glance

| Element | Specification |
|---------|--------------|
| Answer block | 40–80 words, after hero image, before introduction, self-contained |
| Introduction | 120–160 words, 2–3 paragraphs |
| Body | 3–6 H2 sections, 100–300 words each |
| Data points | Minimum 3, named source + year, woven into body |
| FAQ section | 3–5 questions, 1–3 sentence answers each |
| Closing | 2–4 sentences, action-oriented, no sign-off |
| Total length | 1,200–2,000 words (excluding metadata and FAQ) |
| Reading level | Grade 7–8 target, Grade 9 ceiling |
| CTAs | 0 or 1 per article, contextual adjacency required |
| Schema | Article (always) + HowTo + FAQPage where applicable |
| Title tag | 50–60 characters |
| Meta description | 140–155 characters |
| URL slug | Under 60 characters, hyphenated |
| Hero image | Required. 1200×630px min, WebP + JPEG, under 150KB. Default: branded typographic card. Grayscale stock as alternative — atmospheric/textural only, no staged lifestyle scenes. |
| Body visuals | 0–2 per article. Must earn their place. Brand palette + typography. |
| Custom visual fonts | Playfair Display headlines, Inter labels |
| Custom visual colors | Neutral gray base, one brand accent, no gradient fills |
| Attribution mark | β△ mark on any standalone diagram or infographic |
| Summary infographic | Optional. Use when 5+ steps or data points form a natural standalone asset. |

---

*Companion document: `ARTICLE_RESEARCH_SYSTEM.md`*
*Last updated: April 2026*
