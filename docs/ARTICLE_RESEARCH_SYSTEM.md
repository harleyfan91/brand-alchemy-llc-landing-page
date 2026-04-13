# Brand Alchemy — Article Research System

## Purpose

**Scope boundary:** This file is for **generating and logging article ideas** (topic discovery, classification, and **candidate briefs**). It is **not** where you gather named stats for a single article, outline H2s for the draft, or run publish QA — that lifecycle lives in **`ARTICLE_WRITING_SCHEMA.md`** once a topic is chosen.

This document has two functions:

1. **The research methodology** — a repeatable process for identifying future article candidates so every research pass produces consistent, usable output.
2. **Session 1 candidate log** — the full findings from the first research pass (April 2026), including 15 article candidates with all source signal, classification, and product adjacency notes preserved.

Future AI sessions should read this document before conducting a new research pass or briefing a new article. Nothing here should need to be re-discovered from scratch.

**Product and pricing truth:** When scoping **product adjacency**, kit contents, bumps, or any price mention in a brief, reconcile with [`ACQUISITION_FUNNEL_AND_SKU_MAP.md`](ACQUISITION_FUNNEL_AND_SKU_MAP.md), [`PRODUCTS_PRICING_AND_INCLUDES.md`](PRODUCTS_PRICING_AND_INCLUDES.md), and [`BRAND_SOURCE_OF_TRUTH.md`](BRAND_SOURCE_OF_TRUTH.md) so candidates stay aligned with the live catalog and honest scope.

---

## Part 1: Research Methodology

### Who this content is for

Brand Alchemy articles target **owner-operated small businesses**: local shops, service providers, trades, hospitality, Etsy sellers. The reader knows their business deeply but has little or no marketing background. They are not SaaS founders, growth marketers, or startup operators.

Write to the owner, not the industry. Avoid: funnels, KPIs, CTR, personas, organic reach, impressions, brand equity. Prefer: customers, reviews, posts, your profile, your logo, your voice, getting found.

### The three article formats Brand Alchemy uses

Every article belongs to exactly one of these three formats. The format determines the article's structure, its search moment, and how the AI draft should be briefed.

| Format | What it answers | Search moment | Example |
|--------|----------------|---------------|---------|
| **Explainer** | "What is X and does it matter to me?" | Owner doesn't know what they don't know yet | "What is a brand voice?" |
| **How-to** | "Walk me through doing X step by step" | Owner knows the problem, wants to act now | "How to ask for a Google review" |
| **Decision guide** | "Help me figure out what to do" | Owner is mid-paralysis, knows the category | "Which social platform is worth my time?" |

Avoid listicles ("10 ways to..."). They attract the wrong audience signal and dilute the knowledgeable-friend voice.

### Awareness stage

Every candidate also gets an awareness stage. This determines how much context the article needs to provide before getting to the point.

- **Don't know the problem** — Owner hasn't named the issue yet. Article must frame the problem before solving it. Usually pairs with Explainer format.
- **Know the problem** — Owner can name the issue but doesn't know how to address it. Get to the answer faster. Usually pairs with How-to.
- **Mid-action** — Owner has started something and hit a wall. Be prescriptive. Usually pairs with Decision guide.

### Where to research (in priority order)

**1. Google autocomplete and "People also ask"**
Type the beginning of an owner question ("how do I get more...") and capture the autocomplete suggestions exactly as they appear. These are real searches in real owner language. The "People also ask" section on results pages surfaces adjacent questions that belong in the same article or could become their own article. This is the single most valuable source for this audience.

**2. Reddit — r/smallbusiness, r/Etsy, r/entrepreneur**
Search these subreddits for threads with high upvotes and comments. Look for: threads where many commenters say "same question," posts that use full sentences rather than keyword fragments, and posts that open with a specific frustration. The post title often becomes the article title almost verbatim. Note: r/smallbusiness skews toward traditional brick-and-mortar, which matches the Brand Alchemy audience well.

**3. Google Search Console** (once the site has traffic)
Queries that are already landing on Brand Alchemy pages. These should be treated as the highest priority candidates because they represent demand the site is not yet capturing.

**4. Brand Alchemy intake form responses**
Owner language from the Identity Kit intake form is primary source material. Recurring themes in how owners describe their problems are article seeds. Flag and log these as they appear.

**What to avoid as primary sources**
Keyword tools (Ahrefs, Semrush) are calibrated for volume-first SEO and skew toward marketing professionals. They will surface topics that are too broad or aimed at the wrong audience. Use them only to validate volume after a candidate has already been identified from real owner language.

### Editorial balance across research passes

- **Google and Yelp:** Many real owner questions center on Google; intentionally surface **Yelp-adjacent** questions too (profiles, reviews, responses) so the backlog supports both sides of the local kit catalog, not only Google.
- **Physical locations and marketplace sellers:** r/smallbusiness skews brick-and-mortar and trades; complement with **r/Etsy** and similar when mining language so prompts and examples are not only cafés and salons.

### The research brief schema

When a research pass surfaces a candidate, capture it in this format. Every field is required before the candidate is considered complete enough to hand to a writer or AI.

```
ARTICLE CANDIDATE
─────────────────────────────────────────────────────────────

WORKING TITLE
  (Question-format preferred. Use owner language exactly.)

SOURCE SIGNAL
  Source channel:     (Google autocomplete / Reddit / Search Console / Intake form / Other)
  Source query/URL:   (The exact phrase or URL where this was found)
  Date researched:    (YYYY-MM-DD)

CLASSIFICATION
  Format type:        (Explainer / How-to / Decision guide)
  Awareness stage:    (Don't know the problem / Know the problem / Mid-action)
  Audience sub-type:  (General SMB / Retail / Services / Hospitality / All)
  Homepage category:  (Brand Basics / Social Media / Get Found / Website / Reputation — matches
                       categories in Articles.tsx and the future /articles index; assign to keep
                       research, site stubs, and editorial calendar consistent)

CONTENT STRATEGY
  Core question:      (The single question this article answers completely — one sentence)
  Reader starting point:  (What the reader knows and believes before reading)
  Reader end state:       (What they know or can do after reading)
  Off-limits:             (Jargon, tools, audience types to exclude)
  Gap vs. existing:       (Why existing search results don't fully answer this — what's missing)
  Platform-sensitive:     (Yes / No — if Yes, flag for annual re-verification of UI steps and policies)

PRODUCT ADJACENCY
  Primary:   (Which Brand Alchemy product fits most naturally — or "none")
  Secondary: (Any other product that could be mentioned without forcing it)
  How to link: (Soft mention / Step in the how-to / "If you want to go deeper")

AI DRAFT PROMPT SEED
  (2–4 sentences that form the system prompt for the AI draft pass. Should specify voice, audience,
  what to avoid, and the core answer the article must deliver.)

STATUS
  (Candidate / In brief / In draft / In polish / Published)
```

### Research pass cadence

Run a fresh research pass every **8–12 weeks** or whenever a new product launches. Each pass should produce 10–20 candidates. Classify them against the existing backlog to avoid duplication. If a candidate has already been identified, update its source signal log rather than creating a duplicate entry.

**Platform-sensitive articles** (anything covering Google Business Profile, Yelp, social platform features, or third-party policies) should be re-reviewed annually or after any major platform update — even if the article itself isn't due for a research pass. Mark these with `Platform-sensitive: Yes` in the candidate brief. When re-reviewing: check that UI steps still match current platform, verify policy language hasn't changed (especially around reviews and incentives), and update the article's "last verified" date in the CMS.

### Quality bar for candidates

A candidate is worth including in the backlog if it passes all four of these checks:

1. **Owner-language test** — Could a small business owner realistically type this question into Google or say it to a friend?
2. **Gap test** — Do existing search results fail to answer this in plain English? (If good answers already exist, the article needs a differentiator — usually voice and audience specificity.)
3. **Completeness test** — Can this article fully answer its core question in one piece without requiring the reader to go read three other things first?
4. **Integrity test** — Does the article help first, and connect to a product only if it genuinely fits? A forced product mention disqualifies the article.

---

## Part 2: Session 1 Candidate Log

**Session date:** April 2026
**Research sources used:** Google autocomplete, Reddit (r/smallbusiness), web search analysis of existing content across brand, social, local search, and reputation topic areas.
**Total candidates:** 15 (5 already stubbed as placeholders on the live site, 10 net-new)

---

### CANDIDATE 01

**Working title:** Branding vs. marketing — what does a small business actually need first?

**Source signal**
- Source channel: Existing site placeholder + Reddit r/smallbusiness pattern
- Source query: "branding vs marketing small business" / "do I need branding or marketing first"
- Date researched: April 2026

**Classification**
- Format type: Explainer
- Awareness stage: Don't know the problem
- Audience sub-type: General SMB
- Homepage category: Brand Basics

**Content strategy**
- Core question: What is the difference between branding and marketing, and which one should I focus on when I can't do both at once?
- Reader starting point: Knows their business needs help online but can't name why things aren't working. May have tried posting more or running an ad without results.
- Reader end state: Can name the distinction, knows that branding (how you look and sound) comes before marketing (how you promote), and has a clear starting point.
- Off-limits: Funnel language, B2B framing, agency jargon, "brand equity," "positioning matrix"
- Gap vs. existing: Most search results are written for marketers comparing disciplines. Very few address the owner who doesn't yet know what either word means in practice.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit ("Start with brand — here's how")
- Secondary: None
- How to link: Soft mention at the end — "If you want to skip the guesswork, the Identity Kit is built for this exact starting point."

**AI draft prompt seed**
You are writing for a small business owner — a restaurant, salon, shop, or service provider — who has never studied marketing and is trying to figure out where to start. Explain the difference between branding (how your business looks and sounds consistently) and marketing (how you promote yourself) in plain English, using real-world examples from local businesses. The article should reach a clear conclusion: branding comes first, because marketing amplifies whatever impression already exists. Do not use jargon. Do not write for marketers.

**Status:** Candidate (placeholder exists on live site)

---

### CANDIDATE 02

**Working title:** What is a brand voice, and do you actually need one?

**Source signal**
- Source channel: Google autocomplete + gap analysis
- Source query: "what is brand voice" / "does a small business need brand voice"
- Date researched: April 2026

**Classification**
- Format type: Explainer
- Awareness stage: Don't know the problem
- Audience sub-type: General SMB
- Homepage category: Brand Basics

**Content strategy**
- Core question: What does "brand voice" mean in practice, and is it something a small business actually has to think about?
- Reader starting point: Has heard the term but thinks it's for big companies. Writes captions or responds to reviews inconsistently without realizing it.
- Reader end state: Understands that brand voice is simply how your business sounds in writing (and why consistency matters), and knows the first step toward defining their own.
- Off-limits: Tone maps, brand archetypes, corporate frameworks, anything that requires a consultant to implement
- Gap vs. existing: Existing results explain brand voice well for marketers and agencies. Almost nothing is written for an owner who just wants to know if they need to care.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit (the Voice & Content Playbook is the core deliverable)
- Secondary: Social Post Starters (having a voice makes templates work better)
- How to link: Step in the how-to — "The Identity Kit builds this for you based on how you describe your own business."

**AI draft prompt seed**
You are writing for a small business owner who has heard the term "brand voice" and isn't sure if it applies to them. Define it simply: brand voice is how your business sounds in writing — the words you use, the tone you take, whether you're formal or casual, warm or direct. Use examples from local businesses (a bakery that writes like a neighbor, a plumber that writes like a no-nonsense pro). Explain why inconsistency is the actual problem. End with a concrete first step they can take today without hiring anyone. No jargon.

**Status:** Candidate (net-new)

---

### CANDIDATE 03

**Working title:** When is your logo good enough to stop worrying about it?

**Source signal**
- Source channel: Reddit r/smallbusiness (recurring thread pattern), Google autocomplete
- Source query: "is my logo good enough" / "do I need a new logo" / "how much should I spend on a logo"
- Date researched: April 2026

**Classification**
- Format type: Decision guide
- Awareness stage: Mid-action
- Audience sub-type: General SMB
- Homepage category: Brand Basics

**Content strategy**
- Core question: How do I know whether my logo is holding my business back, or whether it's fine and I should focus elsewhere?
- Reader starting point: Feels vaguely embarrassed by their logo but doesn't know if that feeling is worth acting on, or whether they can't afford a better one right now.
- Reader end state: Has a concrete checklist to evaluate their logo against (legibility, consistency, formats they have), and a clear sense of when to invest in a new one vs. when to move on.
- Off-limits: Design theory, color psychology deep dives, software recommendations, DIY logo tool reviews
- Gap vs. existing: Most results are either "hire a designer" ads or listicles about logo design principles. Almost nothing helps an owner decide whether to act or leave it.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit (includes logo use guidance and the β△ mark story as context)
- Secondary: None
- How to link: Soft mention — "The Identity Kit doesn't redesign your logo, but it defines how and where to use what you have consistently."

**AI draft prompt seed**
You are writing for a small business owner who is unsure whether their current logo is good enough or needs to be replaced. This is a decision guide, not a design lesson. Give them a practical checklist: Does it look blurry or pixelated when they send it digitally? Do they have it in the file formats they actually need? Does it look like something they're proud to put on a card or a window? The article should be reassuring — most logos are fine enough to work with — while being honest about the real warning signs. No design jargon. No pitching design services.

**Status:** Candidate (net-new)

---

### CANDIDATE 04

**Working title:** What are brand colors, and how do you know if yours are working?

**Source signal**
- Source channel: Google autocomplete, high-volume search pattern confirmed across multiple sources
- Source query: "what are brand colors" / "how to choose brand colors small business" / "do I need brand colors"
- Date researched: April 2026

**Classification**
- Format type: Explainer
- Awareness stage: Don't know the problem
- Audience sub-type: General SMB
- Homepage category: Brand Basics

**Content strategy**
- Core question: What are brand colors actually for, and how do I know whether mine are consistent enough?
- Reader starting point: Uses colors somewhat consistently (or completely inconsistently) without thinking about it strategically. May have a logo color but applies it unevenly across their posts and materials.
- Reader end state: Understands that brand colors are about recognition, not aesthetics — and knows the two-question test for whether theirs are working (would a regular customer recognize a post as yours without seeing your name?).
- Off-limits: Color psychology deep dives, hex codes, Canva tutorials, design software
- Gap vs. existing: Existing results (Canva, VistaPrint, Looka) explain color psychology and palette tools. None address the owner who already has colors and needs to know if they're consistent enough to move on.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit (defines and documents the color system as part of the brand kit)
- Secondary: None
- How to link: Soft mention — "The Identity Kit locks this down so you're not making the decision from scratch every time."

**AI draft prompt seed**
You are writing for a small business owner who has some version of brand colors — maybe from their logo, maybe just colors they've used — and wants to know if what they have is good enough. Explain what brand colors are actually for (recognition and consistency, not beauty) using real examples from local businesses. Give them a practical two-question test: Would a regular customer recognize your content without seeing your name? Do you use the same colors every time? End with what to do if the answer is no — which is to pick two or three and commit, not to redesign. No color theory, no software tutorials.

**Status:** Candidate (net-new)

---

### CANDIDATE 05

**Working title:** What should a small business post on social media each week?

**Source signal**
- Source channel: Existing site placeholder + high Reddit upvote pattern in r/smallbusiness
- Source query: "what to post on social media small business" / "what should I post this week"
- Date researched: April 2026

**Classification**
- Format type: Decision guide
- Awareness stage: Mid-action
- Audience sub-type: General SMB
- Homepage category: Social Media

**Content strategy**
- Core question: What is a simple, repeatable framework for posting on social media without needing to think about it from scratch every week?
- Reader starting point: Knows they should post but dreads figuring out what. Has probably posted inconsistently or gone quiet for weeks. Doesn't want to become a "content creator."
- Reader end state: Has a weekly rhythm (3–4 post types that rotate) and understands that showing up consistently with imperfect content beats posting nothing while waiting for the perfect idea.
- Off-limits: "Content strategy," engagement rate, algorithm talk, platform-specific tactics (keep it format-level), influencer framing
- Gap vs. existing: Most results are listicles of post ideas. Almost none give a simple, sustainable framework that doesn't assume the owner has hours per week to spend.
- Platform-sensitive: No

**Product adjacency**
- Primary: Social Post Starters (fill-in-the-blank captions for the framework)
- Secondary: Seasonal & Event Copy Pack
- How to link: Step in the how-to — "For the weeks when you're drawing a blank, the Social Post Starters are built exactly for this rhythm."

**AI draft prompt seed**
You are writing for a small business owner who wants to post on social media consistently but doesn't know what to post. Give them a simple weekly rhythm with 3–4 rotating post types (e.g., a behind-the-scenes moment, a customer highlight, a practical tip, a product or service spotlight). Make it clear that the goal is showing up, not going viral. Use concrete examples from local businesses like a café, a hair salon, and a home services company. The framework should work without a scheduling tool, a photographer, or a content strategist. Do not use marketing vocabulary.

**Status:** Candidate (placeholder exists on live site)

---

### CANDIDATE 06

**Working title:** Which social media platform is actually worth your time?

**Source signal**
- Source channel: Google autocomplete, Reddit r/smallbusiness (high upvote pattern)
- Source query: "which social media should I use for my small business" / "is Instagram or Facebook better for small business" / "do I need to be on TikTok"
- Date researched: April 2026

**Classification**
- Format type: Decision guide
- Awareness stage: Mid-action
- Audience sub-type: General SMB
- Homepage category: Social Media

**Content strategy**
- Core question: Given that I have limited time, which one or two social platforms are actually worth focusing on for a local business?
- Reader starting point: Feels pressure to be everywhere. Is probably on one platform inconsistently and has accounts on two others they never use. Has been told by someone to get on TikTok.
- Reader end state: Has a simple decision framework (where do your customers actually spend time, what kind of content can you realistically make) and permission to focus on one platform and do it well.
- Off-limits: Platform analytics, ad targeting, influencer comparisons, B2B platforms (LinkedIn) — *exception:* if the brief's audience sub-type is B2B-local (e.g. accountant, commercial cleaner), LinkedIn may be in scope; default for this candidate remains consumer-local
- Gap vs. existing: Most results are either platform comparison articles (written for marketers) or "all the platforms" listicles. Almost nothing helps an owner who just wants to know where to show up first.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Social Post Starters (once they've picked a platform, the starters work across Instagram, Facebook)
- Secondary: None
- How to link: Soft mention at the end.

**AI draft prompt seed**
You are writing for a small business owner — a café, salon, landscaper, or retail shop — who has been told they need to be on social media but doesn't know where to start. This is a decision guide, not a platform review. Help them answer two questions: Where do your customers actually spend time? What kind of content can you realistically make? Based on those answers, make a clear recommendation for local businesses (Instagram and/or Facebook for most; Google Business Profile posts count too). Give them permission to ignore the platforms that don't fit. No analytics, no ad talk, no jargon.

**Status:** Candidate (net-new)

---

### CANDIDATE 07

**Working title:** How to stay consistent on social media when you're too busy running the business

**Source signal**
- Source channel: Reddit r/smallbusiness (one of the most common recurring frustration threads), Google autocomplete
- Source query: "how to post consistently on social media small business" / "too busy to post on social media"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Social Media

**Content strategy**
- Core question: What is a realistic system for posting consistently when you have maybe 30–60 minutes a week to spend on it?
- Reader starting point: Knows they're posting inconsistently. Has probably tried to "do more" and then stopped. Feels guilty about it. Doesn't want a complicated scheduling system.
- Reader end state: Has a simple batching approach (one block of time per week or bi-weekly to capture a few pieces of content) and a realistic expectation of what "consistent" actually means for a small business.
- Off-limits: Scheduling apps, social media management tools, content calendars with elaborate systems, "batch your content" advice that assumes a studio setup
- Gap vs. existing: Most how-tos recommend scheduling tools or content calendars that require ongoing maintenance. Almost nothing addresses the owner who just needs to reduce friction, not build a system.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Social Post Starters (reduces the "what do I even say" block that causes the inconsistency)
- Secondary: Seasonal & Event Copy Pack
- How to link: Step in the how-to — "The biggest reason people stop posting isn't time, it's not knowing what to say. The Social Post Starters solve that part."

**AI draft prompt seed**
You are writing for a small business owner who posts on social media inconsistently because they run out of ideas or time. This is a practical how-to. The core advice: set aside one block of time (30–45 minutes) every one or two weeks, take 3–5 photos or short videos of things already happening in the business, write captions in batches using a simple fill-in pattern, and schedule or queue them immediately. Make it feel achievable, not like a system. Use examples from a restaurant, a hair salon, and a retail shop. Do not mention specific scheduling apps. Do not tell them to "invest in content creation."

**Status:** Candidate (net-new)

---

### CANDIDATE 08

**Working title:** How to make your Google Business profile look trustworthy

**Source signal**
- Source channel: Existing site placeholder + confirmed high-search-volume topic
- Source query: "how to optimize Google Business profile" / "how to make Google business profile look professional"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Get Found

**Content strategy**
- Core question: What are the specific things on a Google Business profile that make people feel confident enough to contact or visit a business?
- Reader starting point: Has claimed or set up a Google Business profile but feels like it's not doing enough. May have incomplete sections, no recent photos, or few reviews.
- Reader end state: Has a concrete checklist of the five or six things that actually move the trust needle (complete info, real photos, responded-to reviews, recent posts) and knows which ones to fix first.
- Off-limits: SEO ranking mechanics, keyword stuffing, Google Ads, API tools, anything requiring a developer
- Gap vs. existing: Most guides are either Google's own support documentation (too general) or SEO agency content (too technical). Very little is written from the perspective of what actually makes a customer feel comfortable.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Google Core Kit (profile walkthrough is one of the kit's core deliverables)
- Secondary: Photo Angles guide (Camentra adjacency)
- How to link: Step in the how-to — "The Google Core Kit includes a step-by-step walkthrough of every section of the profile, plus review templates written for your industry."

**Status:** Candidate (placeholder exists on live site)

---

### CANDIDATE 09

**Working title:** How to ask customers for a Google review without feeling weird about it

**Source signal**
- Source channel: Reddit r/smallbusiness (recurring thread: "how do I ask for reviews without being pushy"), BrightLocal 2025 consumer review survey patterns
- Source query: "how to ask for Google review" / "asking customers for reviews awkward" / "how to get more Google reviews politely"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Reputation

**Content strategy**
- Core question: How do I ask customers for a Google review in a way that feels natural rather than pushy or transactional?
- Reader starting point: Knows reviews matter. Has probably not asked for them because it feels uncomfortable. May have tried once and felt awkward.
- Reader end state: Has 2–3 natural scripts for asking in person, by text, or by email — and understands that timing (asking when the customer is still happy, right after the experience) is the most important variable.
- Off-limits: Review incentives (against Google policy — must be mentioned as a hard rule), review management software, automated SMS campaigns
- Gap vs. existing: Most results focus on tactics and templates but don't address the emotional friction of asking. The research shows that 63% of customers will change a negative review if the issue is resolved — this kind of context makes the article more reassuring and actionable.
- Platform-sensitive: Yes

**Key research finding to include:** Google formalized review request links and QR codes at the end of 2025 — owners can now generate a direct link or printable QR code from their Google Business Profile dashboard. This is a concrete tactic most owners don't know about yet. Offering incentives for reviews is explicitly against Google policy and can result in profile suspension.

**Product adjacency**
- Primary: Google Core Kit (30 review response templates + review request language)
- Secondary: Yelp Core Kit
- How to link: Soft mention — "The Google Core Kit includes review request language written for your specific industry so you don't have to write it from scratch."

**AI draft prompt seed**
You are writing for a small business owner who knows Google reviews matter but finds it awkward to ask for them. The article should acknowledge that feeling first, then move into practical scripts: one for in-person (at the moment of transaction), one for a follow-up text, one for a follow-up email. Emphasize timing over everything — asking when the customer is still happy, immediately after the experience, is the single most important factor. Include the specific note that Google now offers a direct review link and QR code from the Business Profile dashboard. Be clear that offering incentives (discounts, freebies) is against Google policy and can result in profile suspension. Tone: warm and direct, like a friend who's been through it.

**Status:** Candidate (net-new)

---

### CANDIDATE 10

**Working title:** Why does your business show up differently in Google Maps vs. Google Search — and what can you do about it?

**Source signal**
- Source channel: Reddit r/smallbusiness (frequently asked, rarely answered clearly), Google "People also ask"
- Source query: "why is my business not showing up on Google Maps" / "Google Maps vs Google Search small business" / "local pack vs search results"
- Date researched: April 2026

**Classification**
- Format type: Explainer
- Awareness stage: Don't know the problem
- Audience sub-type: General SMB (especially local businesses)
- Homepage category: Get Found

**Content strategy**
- Core question: Why does my business sometimes appear on Google Maps but not in regular search results (or vice versa), and is there anything I can do about it?
- Reader starting point: Has noticed the inconsistency but doesn't understand why it happens. May have searched for their own business and been confused by what they saw (or didn't see).
- Reader end state: Understands the difference between the local 3-pack (Maps-driven, tied to the Google Business Profile) and regular organic search (website-driven), and knows which one to focus on first as a local business with limited time.
- Off-limits: SEO technical details, backlinks, structured data, developer-level fixes
- Gap vs. existing: This is one of the most commonly asked questions in small business forums and one of the least clearly answered anywhere in plain English. A well-written explainer here would fill a genuine gap and capture a high volume of confused owner searches.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Google Core Kit (the profile walkthrough helps owners fix the Maps side)
- Secondary: None
- How to link: Soft mention — "The Google Core Kit includes a step-by-step profile walkthrough focused specifically on local visibility."

**AI draft prompt seed**
You are writing for a small business owner who has noticed that their business shows up differently — or not at all — depending on how they search on Google. Explain in plain English: Google has two different systems that determine local visibility. The Google Business Profile (free listing) powers Google Maps and the local 3-pack. The website powers regular organic search results. For most local businesses, fixing the Google Business Profile is the faster, higher-impact move. Make this feel like an explanation from a knowledgeable friend, not a technical manual. No SEO jargon. No mentions of backlinks, structured data, or anything requiring a developer.

**Status:** Candidate (net-new)

---

### CANDIDATE 11

**Working title:** What to say when someone leaves a bad review (without making it worse)

**Source signal**
- Source channel: Existing site placeholder + high-search-volume pattern confirmed across multiple sources
- Source query: "how to respond to negative reviews" / "what to say to bad Google review" / "responding to bad reviews without being defensive"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Reputation

**Content strategy**
- Core question: What should I actually say in response to a bad review, and what are the things I should never say?
- Reader starting point: Has received a bad review (or is afraid of getting one) and doesn't know whether to respond, what to say, or how to keep from making it worse. May have drafted something defensive and then deleted it.
- Reader end state: Has a simple response structure (acknowledge, don't argue, take it offline, close politely) and a clear list of things to avoid. Also understands that a thoughtful response to a bad review can actually build trust with future customers.

**Key research findings to include:**
- 93% of consumers read online reviews before visiting a business (BrightLocal)
- 63% of customers will change a negative review if the business fixes the issue (ReviewTrackers)
- 88% of people surveyed said they would look past negative reviews if they were answered adequately
- Google now moderates review responses before publishing them (as of late 2025) — can take 10 minutes to 30 days, so real-time back-and-forth is no longer possible
- Defensive responses are one of the most common owner mistakes — even subtle defensiveness ("we've never had this complaint before") reads as dismissive
- Never offer incentives in a public response (violates Google policy)

- Off-limits: Reputation management software, fake reviews (mention they violate platform policy), legal framing
- Gap vs. existing: Many guides exist on this topic but most are written for larger businesses with customer service teams. Very little is written from the perspective of an owner who is both the business and the person responding, often emotionally.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Google Core Kit and Yelp Core Kit (both include 30 review response templates)
- Secondary: None
- How to link: Step in the how-to — "The Google and Yelp Core Kits include 30 review response templates written for your industry — for positive and negative reviews — so you're not starting from scratch each time."

**AI draft prompt seed**
You are writing for a small business owner who has received a bad review online and doesn't know how to respond. The article should start by acknowledging how it feels (it stings, especially when you care about your business), then give a simple structure for a good response: acknowledge the experience, apologize for the frustration (without admitting fault if the facts are disputed), take the conversation offline, and close with a genuine invitation to make it right. Include a clear list of things to never say — especially subtle defensiveness like "we've never heard this before" or "we have hundreds of happy customers." Include the research finding that 63% of customers will update a negative review if the issue is resolved. Note that Google now moderates responses before publishing. Tone: calm, like a mentor who has been through this.

**Status:** Candidate (placeholder exists on live site — this replaces the vague "what to say when someone reviews your business" stub)

---

### CANDIDATE 12

**Working title:** How to turn a happy customer into a Google or Yelp review

**Source signal**
- Source channel: Reddit r/smallbusiness, Google autocomplete, high adjacency with Candidate 09
- Source query: "how to get more Yelp reviews" / "how to get customers to leave reviews" / "convert happy customers to reviews"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB (especially hospitality, retail, services)
- Homepage category: Reputation

**Content strategy**
- Core question: What is the most reliable way to convert a genuinely happy customer into a public review?
- Reader starting point: Has happy customers but very few reviews. Knows the disconnect exists but isn't sure how to close it. May feel like asking feels manipulative.
- Reader end state: Understands that the review gap is almost always about friction and timing, not about customer satisfaction — and has a simple system to reduce both.

**Key research findings to include:**
- 20% of consumers look for reviews from the past two weeks before trusting a business; 27% want reviews from the past month (BrightLocal 2025 survey). Recency matters as much as quantity.
- Asking at the moment of the experience (when the customer is still in front of you and happy) is the single most effective method.
- Google review request links and QR codes are now formalized (end of 2025) — owners can generate these directly from the Business Profile dashboard.
- You cannot offer incentives (discounts, freebies) in exchange for reviews — this violates both Google and Yelp policy.
- 7 in 10 customers change their perception of a brand after the business responds to a review — responding to existing reviews signals to new reviewers that their review will also be acknowledged.

- Off-limits: Review management software, automated campaigns, incentivized reviews (must flag as policy violation)
- Gap vs. existing: Candidate 09 focuses on the emotional friction of asking. This article focuses on the conversion mechanics — how to structure the ask, when to send it, what platforms to prioritize. They are complementary, not duplicates.
- Platform-sensitive: Yes

**Product adjacency**
- Primary: Google Core Kit + Yelp Core Kit (both include review request language for industry-specific contexts)
- Secondary: None
- How to link: Soft mention.

**AI draft prompt seed**
You are writing for a small business owner who has satisfied customers but not many online reviews. The article should explain that the review gap is almost always about friction (the customer didn't know it would help, didn't know how to do it, or forgot) and timing (asking days later is less effective than asking in the moment). Give practical steps: generate a Google review link from the Business Profile dashboard, create a QR code and put it on receipts or the counter, ask in person right after a good experience, follow up once by text or email. Note that review recency matters — fresh reviews count more than old ones. Flag clearly that incentivizing reviews violates Google and Yelp policy. Warm and direct tone.

**Status:** Candidate (net-new)

---

### CANDIDATE 13

**Working title:** Which website photos help customers trust you before they visit?

**Source signal**
- Source channel: Existing site placeholder + Camentra product adjacency
- Source query: "what photos should I put on my business website" / "website photos small business"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Website

**Content strategy**
- Core question: What specific types of photos belong on a small business website, and in what order do they matter?
- Reader starting point: Has a website that feels thin or generic. May be using stock photos or old, low-quality images. Not sure what customers actually want to see before visiting.
- Reader end state: Has a prioritized list of 5–6 shot types (storefront, team/owner face, work in progress or service being performed, before/after if applicable, interior/space, product or menu highlights) and knows which one to start with if they can only do one.
- Off-limits: Professional photography equipment requirements, expensive gear, anything implying they need to hire a photographer
- Gap vs. existing: Most content on this topic is either "hire a photographer" or generic stock photo advice. Very little is written from the perspective of "here are the six shots you can take with your phone this week that will make the biggest difference."
- Platform-sensitive: No

**Product adjacency**
- Primary: Photo Angles guide (9-angle PDF) + Camentra app
- Secondary: Google Core Kit (the photos section)
- How to link: Step in the how-to — "The Photo Angles guide includes industry-specific shot lists you can capture with your phone. Camentra shows you exactly how to frame each one."

**Status:** Candidate (placeholder exists on live site)

---

### CANDIDATE 14

**Working title:** What should your About page actually say?

**Source signal**
- Source channel: Google autocomplete, Reddit r/smallbusiness, high search volume confirmed
- Source query: "what to write on About page small business" / "how to write an About page" / "what should About us page say"
- Date researched: April 2026

**Classification**
- Format type: How-to
- Awareness stage: Know the problem
- Audience sub-type: General SMB
- Homepage category: Website

**Content strategy**
- Core question: What information and what tone belong on a small business About page to make visitors feel like they've found the right place?
- Reader starting point: Has an About page that either says too little (just a name and year founded), too much (a long history no one reads), or sounds like a corporate press release.
- Reader end state: Has a clear structure for an About page — who you are, who you serve, what you believe in, and a human moment — and understands that the goal is to make a visitor feel like they're in the right place, not to impress them with credentials.
- Off-limits: SEO keyword stuffing, lengthy brand history, formal corporate voice
- Gap vs. existing: Most About page advice is either generic ("be authentic!") or written for personal brands and freelancers, not local businesses. Very little addresses the owner who is the face of the business but doesn't know how much of themselves to put in.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit (Voice & Content Playbook provides the raw material for this page)
- Secondary: None
- How to link: Step in the how-to — "If you're not sure how to describe your own business in your voice, the Identity Kit's Voice & Content Playbook gives you the language to start from."

**AI draft prompt seed**
You are writing for a small business owner whose About page is either empty, generic, or sounds like a corporate bio. Explain what an About page is actually for: it's not a history lesson or a credentials list — it's the moment a visitor decides if they feel comfortable with you. Give them a simple four-part structure: who you are (one or two sentences, human and specific), who you serve (be precise about the customer), what you believe (one principle that guides how you work), and a human moment (the thing that makes you real — the story behind starting, the thing you care about most). Use examples from a plumber, a café, and a boutique. Keep each **sample About excerpt** under ~300 words (illustrations only — the shipped article still follows total length in `ARTICLE_WRITING_SCHEMA.md`). No corporate voice.

**Status:** Candidate (net-new)

---

### CANDIDATE 15

**Working title:** What makes a small business website look unprofessional — and how to fix it fast

**Source signal**
- Source channel: Reddit r/smallbusiness, Google autocomplete
- Source query: "why does my website look unprofessional" / "how to make my website look better" / "small business website mistakes"
- Date researched: April 2026

**Classification**
- Format type: Decision guide
- Awareness stage: Mid-action
- Audience sub-type: General SMB
- Homepage category: Website

**Content strategy**
- Core question: What are the specific things that make a small business website look untrustworthy or amateurish, and which ones can be fixed quickly without rebuilding anything?
- Reader starting point: Has a website and a vague sense that it's not working as well as it should. Doesn't know which specific things are holding it back.
- Reader end state: Has a concrete checklist of the 5–6 most common problems (outdated or missing photos, unclear homepage message, no visible reviews or trust signals, broken contact info, inconsistent fonts or colors, no mobile optimization) ranked by how quickly they can be fixed.
- Off-limits: Website redesign services, developer tools, technical SEO, anything requiring code
- Gap vs. existing: Most results are either generic design advice or "hire us to fix your site" landing pages. Very few give an honest, prioritized list of problems a non-technical owner can actually address themselves.
- Platform-sensitive: No

**Product adjacency**
- Primary: Identity Kit (brand voice + visual guidelines feed directly into a website refresh)
- Secondary: Photo Angles guide + Camentra (fixing the photos is often the highest-impact fix)
- How to link: Step in the decision guide — "Two of the most common problems — inconsistent look and weak photos — are exactly what the Identity Kit and Photo Angles guide address."

**AI draft prompt seed**
You are writing a decision guide for a small business owner who knows their website isn't doing its job but doesn't know specifically why. Give them a checklist of the six most common problems that make a site look unprofessional, ranked from easiest to hardest to fix: (1) outdated or missing photos — replace with phone photos this week; (2) vague or generic homepage message — can you tell in five seconds what this business does and who it's for?; (3) no visible trust signals — no reviews, no testimonials, no photos of real work; (4) broken or buried contact info; (5) inconsistent fonts, colors, or logo use; (6) site doesn't look right on a phone. For each, give one concrete fix they can do without a developer. Tone: practical and direct, like a friend who just reviewed your site and is giving honest feedback.

**Status:** Candidate (net-new)

---

## Backlog summary

| # | Working title | Category | Format | Stage | Status |
|---|----------------|----------|--------|-------|--------|
| 01 | Branding vs. marketing | Brand Basics | Explainer | Don't know | Placeholder |
| 02 | What is a brand voice? | Brand Basics | Explainer | Don't know | Net-new |
| 03 | When is your logo good enough? | Brand Basics | Decision guide | Mid-action | Net-new |
| 04 | What are brand colors? | Brand Basics | Explainer | Don't know | Net-new |
| 05 | What to post on social media each week | Social Media | Decision guide | Mid-action | Placeholder |
| 06 | Which social platform is worth your time? | Social Media | Decision guide | Mid-action | Net-new |
| 07 | How to stay consistent on social media | Social Media | How-to | Know the problem | Net-new |
| 08 | How to make your Google Business profile trustworthy | Get Found | How-to | Know the problem | Placeholder |
| 09 | How to ask for a Google review | Reputation | How-to | Know the problem | Net-new |
| 10 | Maps vs. Search — why they're different | Get Found | Explainer | Don't know | Net-new |
| 11 | What to say when someone leaves a bad review | Reputation | How-to | Know the problem | Placeholder |
| 12 | How to turn a happy customer into a review | Reputation | How-to | Know the problem | Net-new |
| 13 | Which website photos build trust | Website | How-to | Know the problem | Placeholder |
| 14 | What should your About page say? | Website | How-to | Know the problem | Net-new |
| 15 | What makes a website look unprofessional? | Website | Decision guide | Mid-action | Net-new |

**Recommended first five to write** (highest product adjacency + broadest reach):
1. Candidate 08 — Google Business profile (Google Kit)
2. Candidate 14 — About page (Identity Kit)
3. Candidate 09 — Ask for a review (Google Kit templates)
4. Candidate 02 — Brand voice (Identity Kit)
5. Candidate 07 — Social media consistency (Social Post Starters)

---

*Last updated: April 2026 — Session 1*
*Next research pass due: ~July 2026, or when the Identity Kit launches (to capture intake form language)*
