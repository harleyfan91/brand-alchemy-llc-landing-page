# Product Requirement Document
## Brand Alchemy: Daily Execution Engine (Codename: DEE)
### Version 1.1 — Updated from v1 PRD after strategic review

---

## Status

**Pre-build / strategic validation.** No code exists yet. This document governs architecture, scope, and open decisions before development begins. Review against `ACQUISITION_FUNNEL_AND_SKU_MAP.md` before each milestone.

All pre-build blocking items are tracked in [`DEE_PREBUILD_CHECKLIST.md`](DEE_PREBUILD_CHECKLIST.md) in this folder. That file is the task tracker; this PRD is the stable spec.

---

## Identity Kit Verification Requirements

**This section is written to be handed to an agent working in the Identity Kit repo.** The DEE's primary differentiator — and the feature that justifies its price above competitors — depends entirely on the Identity Kit generating a specific machine-readable output at fulfillment. Before any DEE development begins, the Identity Kit repo must confirm or implement the following.

### What the DEE needs from the Identity Kit

The DEE reads a file called `brand-context.json` (schema at `docs/product-platform/schemas/brand-context.v1.schema.json` in this repo) when a customer connects their Kit order. The DEE uses this file to pre-populate the owner's entire Brand DNA profile — colors, fonts, voice tone, content pillars, prohibited words, CTA style, and caption starters — so the owner never enters this information manually.

**The DEE cannot function as a differentiated product without this file.** Without it, the DEE becomes a generic tool that asks owners to manually describe their brand, which is exactly what competitors like Flick and Predis.ai already do at a lower price point.

### Required fields (DEE will break or degrade without these)

| Field path in `brand-context.json` | What the DEE uses it for | Required for |
|------------------------------------|--------------------------|-------------|
| `voiceProfile.tonePreset` | Maps to one of 7 copy registers (Wry, Real, Confident, Quiet, Warm, Energetic, Light) | Copy generation — core feature |
| `voiceProfile.narratorId` | Sets first/second/third person voice for captions | Copy generation |
| `voiceProfile.ctaType` | Selects CTA style (invite, direct, soft) for caption endings | Copy generation |
| `voiceProfile.contentPillarNames` | Pre-populates situation picker labels with owner's own language | Copy generation UX |
| `visualProfile.paletteId` | Maps to brand color set for canvas overlay and logo tinting | Canvas engine — core feature |
| `visualProfile.paletteDisplayName` | Human-readable color palette name shown in the UI | Canvas engine |
| `visualProfile.selectedStyle` | Informs layout style selection (minimal, bold, warm, etc.) | Canvas engine |
| `sections.voice.prohibitedWords` | Appended to the hard prohibition list in every system prompt | Copy quality |
| `sections.csp.captionStarters` | Injected as few-shot examples in the system prompt | Copy quality |
| `sections.csp.contentPillars` | Used to label and contextualize the situation picker | Copy generation UX |
| `sections.brief.idealCustomer` | Injected as audience context in the system prompt | Copy generation |

### Font requirements (canvas engine depends on these)

The canvas engine renders text overlays in the owner's brand fonts. The DEE needs to know which fonts to load for each Kit customer.

**Questions for the Identity Kit repo to answer:**

1. Does `brand-context.json` currently include any font references (font family names, Google Fonts slugs, or custom upload paths)?
2. If yes: are these fonts available as Google Web Fonts, or are they paid/custom fonts the owner may not have a license to redistribute?
3. If no: the DEE needs either (a) a font field added to the `brand-context.v1` schema, or (b) a mapping table from Identity Kit palette/style IDs to recommended web-safe font pairings that the DEE can maintain independently.

A canvas that renders the wrong font — or falls back to a generic system font — is one of the most immediately noticeable failures for an owner who just spent $79–149 on a brand document.

### Data transfer mechanism (unresolved — needs a decision)

The PRD's preferred approach is a **fulfillment webhook**: when an Identity Kit order is fulfilled, the `brand-context.json` is pushed to the DEE's Supabase instance automatically. The owner opens the DEE app and their brand is already loaded.

The fallback is **user-initiated import via order ID**: the owner enters their Kit order number in the DEE app and it fetches the file on demand.

**Questions for the Identity Kit repo:**

1. Is there currently a fulfillment webhook or API endpoint that fires when a Kit order is completed?
2. If yes: what does the payload look like, and can `brand-context.json` be attached or referenced from it?
3. If no: what is the current fulfillment process, and what would it take to add a webhook call?
4. Are `brand-context.json` files currently stored somewhere accessible by an external service (S3, Supabase storage, a CDN path per order)?

### Supabase infrastructure question

The DEE plans to use Supabase for user accounts and Brand DNA storage. The Identity Kit likely uses Supabase already.

**Question for the Identity Kit repo:** Is there a shared Supabase project that both the Identity Kit and the DEE should write to, or should the DEE have a separate Supabase project? Using the same project simplifies the Brand DNA handoff (no cross-service transfer needed) but couples the two products at the database level.

### Schema version

The DEE is built against `brand-context.v1.schema.json`. If the Identity Kit plans to update the schema, the DEE needs to be notified before that change ships. Please flag any planned schema changes to this repo before implementing them.

---

## 1. Product Overview & Strategic Position

### 1.1 What it is

A mobile-first progressive web app (PWA) that takes the Brand DNA an owner defined in their Identity Kit and turns it into a usable daily content workflow — specifically: snap a photo, apply brand design guardrails, generate on-brand copy, export a ready-to-post social asset.

The core loop targets 60 seconds or less. It does not require design skill, copywriting knowledge, or any decisions about "what sounds good" — the Identity Kit already made those decisions. This tool executes them.

### 1.2 Why it exists (the implementation gap)

Business owners who buy Identity Kits receive a Voice & Content Playbook, Style Guide, and Brand Brief. Most do not use them consistently. Not because they lack motivation — because the gap between "here is your brand strategy document" and "here is today's Instagram post" is still enormous. This app closes that gap.

### 1.3 Where it sits in the product ladder

| Phase | Product | Role | Price |
|-------|---------|------|-------|
| 1 | Identity Kit | Brand foundation — voice, look, strategy | $79 / $149 |
| 2 | Local Ranking Kits | Execution — Google + Yelp listings | $39–$129 |
| **3** | **Daily Execution Engine** | **Activation — turn Brand DNA into daily posts** | **$25/mo or $199/yr** |

The DEE is only meaningfully differentiated from Canva, Later, and Buffer because of the Identity Kit connection. Without that Brand DNA data flowing in, it is a worse version of existing tools. **This integration is the non-negotiable core feature — not a nice-to-have.**

### 1.4 Why content packs are being discontinued as standalone SKUs

The standalone social caption pack ($19 PDF) model was deprecated after strategic review. Key findings:

- Etsy competitors produce 1,500+ template packs (visual + copy) for $10–15 using AI at scale, making the quantity/price comparison unfavorable at a glance
- The quality advantage of Brand Alchemy's curated captions is invisible before purchase
- Production cost per pack was high relative to return (35 captions took 15+ iterations to get right)
- The packs work much better as *output from the DEE* than as static PDF products — the same situations, registers, and phrasing logic becomes the AI prompt architecture

**The pack work is not wasted.** The situation taxonomy (7 categories), register system (Wry, Real, Confident, Quiet, Warm, Energetic, Light), and tested captions become the few-shot prompt examples and prompt constraints that power copy generation in the DEE.

---

## 2. Competitive Landscape

This section exists to sharpen scope decisions and ensure the DEE is differentiated before a line of code is written. Read before finalizing milestones.

### 2.1 Tools doing overlapping pieces

The following tools are actively used by hospitality and small-business owners. They are grouped by which part of the DEE workflow they address.

---

**Photo → branded visual post (closest to DEE's canvas layer)**

| Tool | What it does | Pricing | Hospitality focus? | Key gap vs DEE |
|------|-------------|---------|-------------------|----------------|
| **Feedo AI** (feedoai.com) | Upload a food photo → AI removes background, applies brand logo/colors, generates a publish-ready poster and caption. ~20 seconds per post. | ~$9–49/mo | ✅ Restaurant-only | No brand DNA from intake — brand kit is self-entered colors/logo only. Copy is generic, not register-aware. No Identity Kit handoff. |
| **Pebblely** (pebblely.com) | Product photo → AI replaces background with a styled scene (40+ themes or custom prompt). Multiple aspect ratios. | $19–39/mo (200–500 images/mo) | ❌ E-commerce focused | No caption generation. No brand kit logic. Primarily for product catalog photography, not daily social posts. |
| **Adpicto** (adpicto.com) | Upload logo, colors, 10–30 reference photos → AI generates images that derive from your brand references (not just overlays). Copy tied to same project. Uses GPT-image-2 + Google Nano Banana 2. | ~$14.99/mo | ❌ General SMB | Brand kit is manual. No structured brand DNA, no prohibited words, no register system, no Identity Kit connection. |

---

**AI copy / brand voice (closest to DEE's copy generation layer)**

| Tool | What it does | Pricing | Key gap vs DEE |
|------|-------------|---------|----------------|
| **Flick — Iris** (flick.social) | Brand Hub: set brand voice, content pillars, prohibited words, products/services. AI (Iris) generates captions and a content calendar from your Brand Hub. Brand voice can be pulled from linked Instagram or website URL. | From £11/mo | No photo compositing. Brand Hub is manually entered — not imported from a brand DNA intake. No situation taxonomy or register system. |
| **Predis.ai** | Brand kit (colors, fonts, logo) + AI image/carousel/video generation + caption writing + scheduling. Credit-based. | $19–212/mo | Brand kit is visual only (no voice profile, prohibitions, or tone registers). Generates volume at the cost of brand specificity. |

---

**All-in-one for restaurants / hospitality (closest to DEE's intended audience)**

| Tool | What it does | Pricing | Key gap vs DEE |
|------|-------------|---------|----------------|
| **Feedo AI** | (see above) | $9–49/mo | (see above) |
| **SocialChef** (socialchef.ai) | AI writes copy, selects/generates images, creates platform-optimized posts, auto-publishes. Brand kit auto-applied to all designs. Built for restaurants, local service businesses. | Not public | Full content lifecycle management — scheduling and auto-posting included. The DEE (v1) is export-only, which is simpler but leaves scheduling to the owner. |
| **Mavic AI** (mavic.ai) | Brand AI learns your F&B brand once. Generates food lifestyle imagery from a product photo (no photographer needed), writes captions, schedules. Uses Gemini, GPT, Claude. | Not public | AI-generated food imagery (stylized, not a composite of the owner's real photo). The DEE uses the owner's actual photo — more authentic for hospitality where regulars recognize the space. |
| **Skenly** (skenly.ai) | Extracts brand kit from existing site/socials. Connects to POS (Square, Toast) — generates posts driven by actual sales/menu data. Auto-publishes 3 posts + 1 story + 1 ad per week. WhatsApp approvals. Claude + fal.ai + Remotion stack. Pilot running May 2026. | ~€29–199/mo (est.) | Most sophisticated in this category. POS integration and auto-pilot mode are features the DEE is explicitly not building in v1. Skenly does not have Identity Kit–depth brand DNA — it scrapes the surface from existing online presence. |
| **NGAZE.AI** (ngaze.ai) | Multi-location restaurant social: brand-approved templates, content calendar, publishing. HQ controls with location-level customization. Template-based, not AI-generative. | Not public | Template-based content, not AI-generated. Built for chains and multi-location operators, not a single café or salon. |

---

### 2.2 Where the DEE is differentiated

None of these tools do all three things the DEE does together:

1. **Brand DNA from a structured intake** — not scraped from a website, not manually entered colors. The Identity Kit produced a voice profile, tone preset, prohibited words, content pillars, and caption starters through a deliberate intake process. That depth is the DEE's primary moat.

2. **Situation taxonomy + register system** — the 7 situations and 7 registers are not just prompt helpers; they are the constraint architecture that prevents the model from regressing to generic marketing copy. No current competitor structures copy generation this way.

3. **Owner's real photo, not AI-generated imagery** — Feedo, Mavic, and Skenly either composite or generate the photo. The DEE applies brand design to the owner's actual photo. For a café or salon where regulars recognize the space and the food, this is the more authentic and trustworthy output.

### 2.3 Where competitors are ahead (be honest about this)

| Area | Who's ahead | Implication |
|------|------------|-------------|
| Auto-publishing | SocialChef, Skenly, Feedo | DEE v1 is export-only. This is a real gap if owners want zero manual steps. Defer to v2 if usage data shows friction. |
| AI food photography | Mavic AI | If owner photos are consistently poor quality, Mavic's generative imagery may outperform a composite of a bad photo. The DEE's quality gate (Section 5) becomes important here. |
| POS / operational data | Skenly | Daily specials driven by real inventory/sales data is a compelling hook the DEE doesn't attempt. Could be explored as a v2 integration if Identity Kit customers request it. |
| Scheduling + calendar | Flick, Predis.ai, SocialChef | Not in DEE scope v1. The tradeoff is simplicity; the risk is that owners still need another tool for scheduling, which adds friction to the overall workflow. |
| Volume output | Predis.ai | For owners who want to post 30+ times/month across platforms, Predis.ai at $19/mo is a better fit. DEE is not trying to win on volume. |

### 2.4 Pricing context

| Tool | Entry price | What you get | Notes |
|------|------------|-------------|-------|
| Feedo AI | ~$9/mo | ~15 posts/mo, brand logo/colors applied | Most direct v1 competitor |
| Adpicto | $14.99/mo | Brand-reference AI image + caption | General SMB |
| Predis.ai | $19/mo | 1,300 credits, 1 brand kit, no auto-posting | Volume-focused |
| Flick | £11/mo (~$14) | Brand Hub, caption AI, scheduling | Copy-focused |
| SocialChef | ~$29/mo (est.) | Full content lifecycle, hospitality-focused | Auto-publishing included |
| **DEE (planned)** | **$25/mo** | Brand DNA handoff, situation picker, register copy, brand canvas | **Identity Kit integration is the price justifier** |

At $25/mo the DEE is priced above Feedo and Flick. That premium needs to be earned by the Identity Kit handoff and copy quality — which are invisible until the user experiences the first generation. This reinforces the importance of a low-friction trial path for Kit customers.

---

## 3. Business Model

### 3.1 Subscription tiers

**One plan. No watermarks. No locked features.**

| Model | Price | Notes |
|-------|-------|-------|
| Monthly | **$25/month** | Full access to all tools |
| Annual | **$199/year** | ~$16.60/month — push this as the primary offer |

Rationale for annual-first pricing: predictable revenue, lower churn, and the per-month equivalent undercuts Canva Pro ($15/mo) on a value-per-feature basis once Brand DNA integration is factored in.

### 3.2 AI credit budget

Every account receives **150 AI generation credits/month** for copy generation. Image processing, resizing, color overlays, logo stamping, and background removal are **not** credit-consuming — they run client-side with no API cost.

**Overage:** $5 for 50 additional credits. Single-click purchase, no new plan required.

### 3.3 Cost structure

| Operation | Cost | Processing location |
|-----------|------|-------------------|
| Background removal | **~$0.00** | Browser (ONNX Runtime / WebGPU) |
| Copy generation (gpt-4o-mini) | **~$0.0003/call** | Server (Next.js edge function) |
| 150 credits fully used | **~$0.045/month/user** | — |
| Gross margin target | **>99%** | — |

Storage: logos and Brand DNA profiles stored in S3-compatible bucket. Cost negligible at early scale.

---

## 4. The Identity Kit Integration (Critical Path)

This is the feature that makes the DEE a Brand Alchemy product rather than a generic tool. It must be built before or alongside the core canvas features.

### 4.1 What already exists

The `brand-context.v1.schema.json` (at `docs/product-platform/schemas/`) defines a machine-readable output format for fulfilled Identity Kit orders. It includes:

- `voiceProfile` — `narratorId`, `tonePreset`, `ctaType`, `contentPillarNames`
- `visualProfile` — `paletteId`, `paletteDisplayName`, `selectedStyle`, `moodAdjectives`
- `sections` — keyed outputs including `csp.captionStarters`, `csp.contentPillars`, `voice.ctaVariations`, `brief.idealCustomer`

This schema is the data bridge. When a Kit order is fulfilled, the `brand-context.json` file is the artifact the DEE reads from.

### 4.2 Auto-population flow

```
Kit purchase → fulfillment → brand-context.json generated
                                    │
                         DEE app reads brand-context.json
                                    │
                         Brand DNA profile pre-populated:
                         - Colors from visualProfile.paletteId
                         - Tone from voiceProfile.tonePreset + narratorId
                         - CTA type from voiceProfile.ctaType
                         - Content pillars from voiceProfile.contentPillarNames
                         - Caption starters from sections.csp.captionStarters
```

The user should never have to manually enter what the Identity Kit already produced. The onboarding for a Kit customer is: connect your order → confirm your logo upload → done.

### 4.3 Cold-start fallback (non-Kit users)

For users who have not purchased an Identity Kit, provide archetype-based onboarding. Match the 3 active Identity Kit industries exactly (post-sprint narrowing):
- Pick your business type: **Café / Coffee Shop**, **Restaurant / Bar**, **Salon / Beauty**
- Pick your brand tone from 3 plain-language options that map to the Kit's presets: "Warm and welcoming" (→ Warm register), "Confident and direct" (→ Confident register), "Bold and full of energy" (→ Energetic register)
- Upload your logo and pick 1-2 brand colors

Do not include industry types the Identity Kit no longer supports — DEE cold-start archetypes must stay in sync with the active Kit industry catalog.

This produces a provisional Brand DNA profile sufficient to generate decent output on day one. Quality climbs when they connect or purchase an Identity Kit. This becomes a natural upsell trigger within the app: "Your Brand DNA is estimated — get an Identity Kit for captions that actually sound like you."

---

## 5. Copy Quality Architecture

This section documents how the DEE avoids the most common AI copy failure mode: generic, enthusiasm-heavy marketing language that the business owner immediately recognizes as not sounding like them.

### 5.1 The failure mode

Default gpt-4o-mini output, given minimal context, regresses toward its training distribution — which is dominated by generic marketing copy. "Your coffee, your way! ☕✨ Swing by today!" Owners recognize this on the second or third use and stop trusting the tool.

### 5.2 The situation taxonomy (from pack work)

Never let users generate from a blank prompt. The situation picker anchors the copy before the model generates anything. The 7 situations from the social content pack work map directly to prompt contexts:

| Situation | Prompt anchor |
|-----------|--------------|
| If you're new here | New follower, intro energy, local pride |
| Open / available this week | Hours, walk-ins, slow day, capacity |
| What goes into it | Process, craft, behind the scenes |
| A regular moment | Familiar order, returning customer, quiet moment |
| The regulars / team | Shop vibe, crew personality, community |
| A win this week | New item, result you're proud of, seasonal |
| Start a conversation | Poll energy, question for replies, casual |

User selects a situation, adds a 3-5 word note ("new latte on the menu"), and the model generates against that specific context. This is the most important quality lever.

### 5.3 The register system (from pack work)

Brand DNA `tonePreset` maps to a named register that constrains model output:

| Register | Character |
|----------|-----------|
| Wry | Dry, self-aware, a little sideways — never cruel |
| Real | Honest, direct, no performance |
| Confident | Says something specific, doesn't hedge |
| Quiet | Understated, lets the moment speak |
| Warm | Genuine, neighborhoody, not saccharine |
| Energetic | Up, forward, movement — not hype |
| Light | Easy, low-stakes, playful |

### 5.4 Few-shot examples in system prompts

The tested captions from the social pack work are not wasted — they become the few-shot examples that teach the model what each register actually looks like for these business types:

- **Wry / café:** "AI is taking jobs? I think we're safe."
- **Real / café:** "The usual? Already on the counter."
- **Confident / salon:** "Big change? We talk it through first. No surprises."
- **Warm / salon:** "We've been called a hidden gem so many times we're starting to wonder if we need a bigger sign."

3-5 examples per register per business type, injected into the system prompt. This is dramatically more reliable than describing the tone in prose.

### 5.5 Hard prohibitions in system prompt

Injected as explicit rules, not suggestions:

- No exclamation marks unless register is Energetic
- No emoji unless the user's Brand DNA explicitly includes them
- Do not reference the business in third person
- No "community," "journey," "authentic," "passionate" (generic marketing words)
- Max 2 sentences for short version; max 4 for long version
- Do not open with the business name
- Do not use the word "just"

Any prohibited words from the owner's Brand DNA Voice Playbook (`sections.voice.prohibitedWords`) are appended to this list.

### 5.6 Two outputs, user selects and edits

Every generation produces:
1. **Short and punchy** — 1-2 sentences, designed for feed posts with a strong image
2. **Narrative story** — 3-4 sentences, designed for Stories or when the image needs more context

The user selects one, edits inline if needed, and exports. The edit step is a quality safety valve and, if edit behavior is logged, provides signal for prompt refinement over time. Output is never auto-published — there is always a human review moment.

### 5.7 Three copy quality tiers (Core, Pro, cold-start)

**Finding from Identity Kit field audit (Jun 2026):** The gap between Core and Pro is quality, not viability. Core Kit customers have real, usable data — narrator, tone preset, content pillars, palette, ideal customer snapshot, industry avoid-terms, and deterministic caption scaffolds. All of it is already computed during PDF assembly; it just needs to be serialized into `brand-context.json` at fulfillment (see checklist IK-1). Pro adds AI-rewritten caption starters that make output sound like the specific owner, not just their business type.

| Tier | What DEE receives | Copy quality |
|------|-------------------|-------------|
| **No Kit** (cold-start) | Archetype + tone picker selection, logo, colors | Generic — sounds like a business of this type |
| **Core Kit** ($79) | Narrator ID, tone preset, content pillar names, palette, style, ideal customer snapshot, industry avoid-terms, deterministic caption scaffolds | Good — sounds like this kind of business with this voice |
| **Pro Kit** ($149) | Everything above + AI-rewritten caption starters (`csp.captionStarters`), richer content pillar one-liners | Best — sounds like this specific owner |

**Core is not a fallback.** A Core Kit customer connecting to the DEE gets a voice-profile-constrained, situation-anchored, prohibited-words-filtered output that is already better than anything a competitor produces from manual brand entry. The tier ladder should be framed as improvement, not as "you need Pro to use this properly."

**In-app upsell for Core Kit customers:** After the first 3 generations, surface a soft prompt — "Your captions sound like your kind of café. Pro Kit customers get copy trained on your exact starters and the words you never use." Link to Identity Kit Pro upgrade. Do not block generation; make it aspirational.

**In-app upsell for cold-start users:** After 3 generations — "You're working from a general profile. An Identity Kit gives DEE your actual voice, colors, and the words that sound like you." Link to `/identity-kit`.

**Implementation note:** The DEE's system prompt builder must branch gracefully on which fields are present in `brand-context.json`. If `csp.captionStarters` is absent, fall through to the generic few-shot library. If `voice.prohibitedWords` is absent, use the DEE's hard prohibition list only. No field should be required at runtime.

### 5.8 Tone → register mapping (DEE-side, no Kit schema change needed)

The Identity Kit produces 3 tone presets. The DEE uses 7 registers. The mapping is DEE's responsibility.

| Kit `tonePreset` | Primary DEE register | Character |
|------------------|---------------------|-----------|
| `friendly` | Warm | Genuine, neighborhoody, not saccharine |
| `professional` | Confident | Says something specific, doesn't hedge |
| `bold` | Energetic | Up, forward, movement — not hype |

The remaining 4 registers (Wry, Real, Quiet, Light) are not directly mappable from a 3-option picker. In v1, they are available as a manual override in the situation picker for users who know their voice. A secondary register nudge (e.g. `friendly + Quiet` for a slower-paced café) is a v2 consideration.

---

## 6. Visual Context and Photo Intelligence

### 6.1 The gap the PRD does not address (by design — read before building)

The current copy generation architecture relies entirely on the user to select the right situation. The system has no understanding of what is actually in the photo. This is an intentional v1 simplification, but it carries a real risk: if owners pick situations that don't match the photo, the caption will feel off. That erodes trust in the tool faster than weak copy does.

This section documents the decision explicitly so it is not skipped by accident.

### 6.2 Comparison to Camentra's model problem

Camentra's AI coach required a vision model to perform nuanced photographic judgment across multiple categories (food, product, real estate) — quality tier, sharpness, blur type, composition, professional vs casual presentation — all in a single call with a long, rule-heavy prompt. Getting a model that could do this reliably, at acceptable cost, took weeks of testing and eventually revealed a large gap between a general-purpose model's training distribution and the actual use case.

The DEE's visual intelligence requirement is structurally simpler:

| Factor | Camentra | DEE |
|--------|----------|-----|
| Domain | Food, product, real estate, people | Hospitality only (food/drink, interiors, salon, team) |
| Task | Nuanced coaching (quality tier, blur type, tool names) | Basic classification (what category is this photo?) + optional quality gate |
| Inference location | On-device (React Native, no reliable network assumed) | Cloud (PWA, network assumed) |
| Label space needed | Broad — multiple photography categories | Narrow — 4–5 hospitality content types |
| Quantization required | Yes — on-device model had to be quantized for mobile | No — cloud API call, no on-device model |

The DEE can avoid the weeks-long model search because the domain is narrow, the task is lighter, and running a cloud API per photo is straightforward in a PWA context.

### 6.3 Options

**Option A — User-driven only (v1 scope, recommended to ship first)**

Do not add any photo intelligence layer in v1. The situation picker is intentional, not a gap. The owner knows what they just photographed. Owners who pick the wrong situation are rare; most know whether they're posting a new menu item or a quiet Tuesday moment.

- No additional AI cost per photo
- No model selection work
- Validate whether users actually pick wrong situations before building the solution to a problem that may not exist
- Defer Option B to v2 if session data shows repeated caption mismatches or low edit rates

**Option B — Lightweight visual context (v2 scope)**

Add one Gemini 2.0 Flash vision call per photo — classify against 5 hospitality labels and flag obvious quality issues. Pre-select the most likely situation in the picker and surface a soft quality warning if needed.

Labels (narrow by design — do not expand without evidence):
1. Food or drink (plated dish, cup, glass, baked item)
2. Café or restaurant interior (room, counter, seating, ambience)
3. Salon or spa (chair, mirror, workstation, styling tools)
4. Team or people (staff, client, owner, candid moment)
5. Exterior or signage (storefront, entrance, window, sign)

Cost: ~$0.0015 per photo (Gemini 2.0 Flash). At 30 photos/month per active user, that is $0.045/user/month — negligible against the subscription margin.

Implementation: one Next.js edge function, same pattern as the copy generation call. The model already recognizes hospitality content without custom training. No quantization, no label sifting.

**Quality gate (optional addition to Option B):**

Before compositing, run a basic quality check: is the image blurry, severely underexposed, or too dark to use? Return a soft warning ("This photo might be hard to read with an overlay — want to try a different one?") rather than blocking export. Do not attempt the level of quality coaching Camentra does — that is a different product.

### 6.4 Decision

| Decision | Status | Notes |
|----------|--------|-------|
| Ship v1 with user-driven situation picker only | **Recommended** | Validate usage before adding vision layer |
| Add Gemini Flash visual context call | **v2 — defer** | Build if session data shows situation mismatches or if users ask for it |
| On-device photo intelligence | **Not recommended** | Adds quantization complexity with no benefit in a PWA context; use cloud |
| Full quality coaching (Camentra-style) | **Out of scope** | Different product; do not let this creep into DEE scope |

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js (React) | PWA support, edge functions, good mobile perf |
| UI | Tailwind CSS + Shadcn | Consistent with brand system expectations |
| Image compositing | HTML5 Canvas API | Client-side, no server media processing |
| Background removal | `@imgly/background-removal-web` (ONNX Runtime Web) | No API cost; runs in browser |
| Copy generation | OpenAI API (gpt-4o-mini) via Next.js edge functions | Low cost, fast, constrained output |
| Brand DNA storage | Supabase (consistent with Identity Kit infrastructure) | Matches existing deployment docs |
| Logo / asset storage | S3-compatible bucket | Existing pattern in Identity Kit fulfillment |
| Billing | Stripe (subscriptions + one-time credit top-ups) | Consistent with Identity Kit payment docs |

### 7.2 Architecture diagram

```
[ PWA: Next.js + Tailwind ]
           │
    ┌──────┴───────┐
    ▼              ▼
[ Client-side ]   [ Server-side (Next.js edge) ]
  HTML5 Canvas      OpenAI API (gpt-4o-mini)
  ONNX Runtime      Brand DNA prompt injection
  Background rm     Stripe webhook handling
  Asset stamping    brand-context.json import
```

### 7.3 Canvas engine — two layout modes

**1:1 Grid Post**
- Centres or offsets isolated product image
- Overlays brand secondary color as tint matrix
- Stamps logo in a restricted quadrant (configurable: top-right, bottom-left)
- Applies brand font to any overlay text

**9:16 Story Overlay**
- Full-bleed image background
- Opacity overlay using brand primary or secondary color
- Structural text containers drawn natively using brand header font
- Caption text rendered in brand body font

Design guardrails are automatic — the owner cannot accidentally choose an off-brand color or font because the system only exposes their Brand DNA options.

### 7.4 Background removal — known limitations and mitigations

The `@imgly` model is ~40MB, downloaded once and cached in IndexedDB. On first use this creates a meaningful delay, especially on mobile over spotty connections (café basement, retail floor). Mitigations:

- Show a two-state loading indicator: "Loading brand tools (first time only)" → "Removing background"
- Cache aggressively in IndexedDB after first load — subsequent uses are fast
- Pre-warm the model in the background during onboarding, before the user tries to use it
- Provide a manual crop / no-removal fallback so the tool is not blocked if the model fails

WebGPU is not universally supported on iOS Safari. WASM fallback is the default path for a significant portion of the target audience. WASM on an older iPhone is slower but functional — do not treat WebGPU as a required dependency.

**Do not** make background removal the first experience. Let the user do a simple layout (photo + brand overlay + logo stamp) first, then introduce background removal as an enhancement. This avoids the 40MB download becoming a first-impression problem.

### 7.5 Mobile performance requirements

- Compress phone camera images (5–12MB) client-side to max 2048px before any processing layer
- Canvas layouts and saved design palettes must remain interactive without connectivity (offline-capable UI)
- PWA installable — add to home screen, standalone display mode
- Zero media logging — product images never touch Brand Alchemy servers

---

## 8. Feature Scope

### 8.1 Milestone 1 — Brand DNA storage and Next.js core

- Next.js project setup, PWA manifest, Tailwind + Shadcn
- Supabase schema for user accounts and Brand DNA profiles
- `brand-context.json` import flow (from Identity Kit fulfillment)
- Manual Brand DNA onboarding (archetype fallback for non-Kit users)
- Logo upload to S3-compatible storage
- Stripe subscription setup (monthly + annual plans)

### 8.2 Milestone 2 — HTML5 Canvas engine

- 1:1 post layout: image placement, brand color overlay, logo stamp
- 9:16 story layout: background image, opacity overlay, text containers
- Brand font loading (safe Google Web Fonts + custom upload path)
- Export to JPEG/PNG, no watermark
- CORS-safe asset loading for logos from bucket

### 8.3 Milestone 3 — Background removal

- `@imgly/background-removal-web` integration
- IndexedDB model caching with two-state loading UX
- WebGPU → WASM fallback
- Model pre-warm during onboarding
- Manual crop fallback

### 8.4 Milestone 4 — Copy generation engine

- Situation picker UI (7 situations, 3-5 word user note)
- System prompt construction from Brand DNA:
  - Tone preset → register selection
  - Prohibited words injection
  - Few-shot examples by register and business type
  - Hard prohibition list
- gpt-4o-mini call via Next.js edge function
- Two-output display (punchy / story), inline edit, copy to clipboard
- Credit tracking and overage UI

### 8.5 Milestone 5 — Billing and credit management

- Stripe subscription webhooks
- Monthly credit reset
- Overage top-up purchase (single-click, $5 / 50 credits)
- Credit usage display in app
- Grace period handling (expired subscription — read-only mode, not deletion)

---

## 9. Open Decisions

These need resolution before or during development — they are not blocked, but they carry downstream consequences.

| Decision | Options | Recommendation |
|----------|---------|----------------|
| DEE domain | `brandalchemyllc.com/app` vs `app.brandalchemyllc.com` | Subdomain — keeps app infrastructure separate from marketing site |
| Identity Kit data transfer mechanism | Auto-push from fulfillment webhook vs user-initiated import via order ID | Fulfillment webhook preferred (zero friction); requires coordination with Identity Kit API |
| Multi-profile support | One profile per account vs multiple (for multi-location owners) | v1: one profile per account. Multi-profile is v2 scope. |
| Scheduling / publishing | Build in-app posting or export-only | v1: export-only. In-app posting requires platform API approvals and adds significant scope. |
| Analytics | In-app post performance tracking | Not v1. No platform API dependency required for launch. |
| Non-Kit user upsell trigger | When to surface the Identity Kit upsell | Show after first 3 generations: "Your Brand DNA is estimated — get an Identity Kit for copy that actually sounds like you." |
| Content pack SKUs | Remove from site vs keep as identity kit add-on | Recommend: remove standalone PDFs from site. Retain the situation taxonomy and register work as internal prompt infrastructure for DEE. Revisit as a DEE export feature (PDF of generated captions) later if demand exists. |

---

## 10. What Success Looks Like (v1)

A sole-proprietor café or salon owner who has an Identity Kit:

1. Opens the DEE app on their phone
2. Brand DNA is already loaded from their Kit
3. Takes a photo of their new drink or workspace
4. Picks "A win this week" from the situation menu
5. Types "new seasonal latte"
6. Sees two caption options that sound like their voice, not generic marketing copy
7. Edits one word, taps export
8. Posts to Instagram directly from camera roll

**Total time: under 3 minutes.** No design decisions. No copywriting. No brand guide reference. The strategy they bought is working.

---

## 11. Relationship to Existing Docs

| Doc | Relationship |
|-----|-------------|
| `ACQUISITION_FUNNEL_AND_SKU_MAP.md` | DEE replaces content pack PDFs as Phase 3 in product ladder. Update SKU table when DEE launches. |
| `docs/product-platform/schemas/brand-context.v1.schema.json` | Critical integration schema — `voiceProfile`, `visualProfile`, and `sections` are the DEE's Brand DNA input |
| `docs/product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md` | Voice system that DEE copy engine inherits |
| `content/contentPacks.ts` | Situation taxonomy and register system from pack work — reference for prompt architecture, not shipped as product |
| Identity Kit repo — `IDENTITY_KIT_PRD.md` | Fulfillment output is DEE's primary input — coordinate on `brand-context.json` delivery mechanism |
| Camentra repo | Photo capture / retouch layer that complements DEE — Camentra handles the photography side, DEE handles the brand application and copy side |
