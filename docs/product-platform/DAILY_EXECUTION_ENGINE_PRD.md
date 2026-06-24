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
| `visualProfile.paletteId` | Maps to brand color set — used to generate the 4 named style presets (Warm, Bold, Natural, Studio) | Style gallery — core feature |
| `visualProfile.paletteDisplayName` | Human-readable color palette name shown in the UI | Style gallery |
| `visualProfile.selectedStyle` | Informs which style preset is shown first in the gallery (minimal → Natural, bold → Brand Bold, warm → Brand Warm) | Style gallery default |
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

A mobile-first PWA that turns any photo from a hospitality owner's phone into a polished, on-brand social asset. Point at the new latte, the counter, the team — the app applies brand color treatments, image enhancements, and typography automatically. Background removal, subtle brightness and warmth adjustments, and text overlays for promotions are all built in. Caption generation is integrated at the end, powered by the same Brand DNA that drives the visual output.

**The product is the visual.** The caption supports it. An owner opens this app because they want their posts to look like their brand without hiring a designer — not because they want AI to write for them.

The core loop targets 60 seconds or less. It does not require design skill, copywriting knowledge, or any decisions about colors or fonts — the Identity Kit already made those decisions. This tool executes them.

### 1.2 Why it exists (the implementation gap)

Business owners who buy Identity Kits receive a Voice & Content Playbook, Style Guide, and Brand Brief. Most do not use them consistently. Not because they lack motivation — because the gap between "here are your brand colors and fonts" and "here is today's Instagram post that actually uses them" is still enormous.

Generic tools like Canva are too open-ended — owners stare at a blank canvas and reach for the wrong template. Competitors like Feedo and Pebblely apply visual treatments but without the Identity Kit's depth: they use manually-entered logo and color, with no voice profile, no prohibited words, no typography system. The DEE closes the gap by applying the owner's full Brand DNA automatically — visuals first, copy integrated.

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

1. **Brand DNA from a structured intake drives the visual output** — color treatments, typography, and text overlay styles all come from the Identity Kit's `visualProfile` and `voiceProfile`. Competitors use manually-entered logo + colors. The DEE uses a full brand system. That depth is visible in the first post the owner exports.

2. **Owner's real photo, not AI-generated imagery** — Feedo, Mavic, and Skenly either composite or generate the photo. The DEE applies brand design to the owner's actual photo. For a café or salon where regulars recognize the space and the food, this is the more authentic and trustworthy output. Authenticity is a competitive advantage at the local level.

3. **Situation taxonomy + register system for copy** — the 7 situations and 7 registers are not just prompt helpers; they are the constraint architecture that prevents the model from regressing to generic marketing copy. No current competitor structures copy generation this way. This makes the caption quality clearly different — owners feel it on the second use.

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

For users who have not purchased an Identity Kit, provide archetype-based onboarding. Match the 4 active Identity Kit industries:
- Pick your business type: **Café / Coffee Shop**, **Restaurant / Bar**, **Salon / Beauty**, **Boutique / Gift Shop / Maker Goods**
- Pick your brand tone from 3 plain-language options that map to the Kit's presets: "Warm and welcoming" (→ Warm register), "Confident and direct" (→ Confident register), "Bold and full of energy" (→ Energetic register)
- Upload your logo and pick 1-2 brand colors

The boutique/maker category is photographically distinct from hospitality: owners are regularly photographing physical products (jewellery, candles, ceramics, packaged goods) against whatever background is available. This category benefits most from background removal and studio-style preset backgrounds — factor this into the preset library design (see Section 7.3).

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
| Background preset assets | CDN (Cloudflare or Vercel edge) | Static images (studio white, bokeh, marble, linen, wood) — small library, served at edge for fast compositing |
| Billing | Stripe (subscriptions + one-time credit top-ups) | Consistent with Identity Kit payment docs |

### 7.2 Architecture diagram

```
[ PWA: Next.js + Tailwind ]
           │
    ┌──────┴──────────────┐
    ▼                     ▼
[ Client-side ]           [ Server-side (Next.js edge) ]
  HTML5 Canvas              OpenAI API (gpt-4o-mini)
  ONNX Runtime (BG rm)      Brand DNA prompt injection
  Style preset pipeline     Stripe webhook handling
  Auto-enhance              brand-context.json import
  Text overlay rendering
  Static BG asset compositing
```

### 7.3 Canvas engine — swipe gallery UX and visual features

The canvas engine is the primary product surface. The core interaction model is a **swipe gallery**: the owner takes or uploads a photo, the app instantly renders it with a default style applied, and they swipe through named presets to find the look they want. No dropdowns, no sliders, no technical decisions. Everything runs client-side — no server media processing, no API cost per style, photo pixels never leave the device.

**Interaction model**

```
Photo selected → auto-enhance applied instantly
                        │
            Full-size preview of current style
                        │
       Scrollable thumbnail row below (5–6 named presets)
       Tap or swipe to switch — preview updates immediately
                        │
       Format picker (1:1 · 4:5 · 9:16)
                        │
       Optional: Add text overlay
                        │
       Next → Caption + export
```

The owner makes one meaningful choice: which style feels right. Everything else — colors, font, treatment strength — comes from Brand DNA automatically.

**Named style presets**

Presets are combinations of background treatment + color treatment. They have friendly names, not technical labels. The active preset library is split by industry because the photography needs differ significantly.

| Preset | Background | Color treatment | Best for |
|--------|-----------|-----------------|---------|
| **Studio Clean** | BG removed → neutral white/off-white | Minimal brand tint | Product shots, salon results, food on clean surface |
| **Bokeh** | BG removed → softly blurred version of original | Warm brand tint | Any subject — keeps organic feel |
| **Brand Warm** | Original photo | Warm brand palette overlay, low opacity | Interior shots, team moments, atmosphere |
| **Brand Bold** | Original photo | Stronger brand primary color overlay | Promotional, announcement-style posts |
| **Natural** | Original photo | Auto-enhance only (brightness, contrast, warmth) | Candid moments, already-good photos |
| **Lifestyle** *(boutique/maker only)* | BG removed → textured background (marble, linen, wood grain) | Minimal brand color accent | Product photography — physical goods on a surface |

The Lifestyle preset and Studio Clean preset both require background removal. The ONNX model is pre-warmed during onboarding so it is not a first-use delay when the owner reaches the style gallery.

**Background replacement assets (no AI generation — static library)**

For presets that replace the background, the DEE uses a curated static asset library. No generative AI is required for v1 — background removal (client-side) is composited over a high-quality static image:

| Background | Used by | Description |
|-----------|--------|-------------|
| Studio white | Studio Clean | Clean neutral — works for any subject |
| Soft bokeh blur | Bokeh | Blurred version of the original background |
| Warm marble | Lifestyle | Cream/warm marble slab — jewellery, candles, ceramics |
| Linen texture | Lifestyle | Neutral fabric — packaged goods, gift items |
| Dark wood grain | Lifestyle | Rich warm surface — coffee products, leather goods |
| Muted outdoor | Bokeh variant | Soft green/neutral outdoor bokeh |

These are static image assets stored in the app bundle or CDN. Compositing is: remove BG → resize/crop to format → composite subject over background → apply brand color treatment. All Canvas API.

**Auto-enhance (fires on every photo, before style is chosen — user-toggleable)**
- Brightness normalisation: lift underexposed phone photos to a consistent baseline
- Contrast stretch: recover flat images
- Warmth adjustment: slight warm push for food and interior photos (can be tuned by brand)
- Sharpening: light unsharp mask for slightly soft phone camera output
- Runs in under 200ms client-side. The owner sees a noticeably better version of their photo before they pick a style.
- A visible On/Off toggle on the style gallery screen lets the owner disable it per photo if they prefer the original. Default is On.

**Text overlay (optional promotional layer)**
- Template presets: New Today, Sale, Hours, Event, Custom
- Owner writes the text; brand font applied automatically from Identity Kit font spec
- **Text color picker**: owner cycles through their 3 brand palette colors (Primary, Secondary, Accent) via circular swatches — they are not picking hex codes, just choosing which of their brand colors the text renders in. Default is Primary.
- Position: 3×3 dot grid — covers all 9 positions (corners, edges, center)
- Single line for v1 — multi-line is v2
- Rendered natively in Canvas using brand font (Google Web Font or system fallback)

**Important — palette hex values required at runtime:** The Canvas text and overlay rendering needs actual hex color values, not palette IDs. `visualProfile.paletteId` is a reference key; the DEE must resolve it to hex values at render time. This requires either (a) the Identity Kit to include resolved hex values in `brand-context.json`, or (b) the DEE to maintain a palette lookup table keyed on `paletteId`. This is a concrete open item — see checklist IK-1.

**Format picker**
- 1:1 — standard feed post
- 4:5 — portrait feed post, more screen area in feed
- 9:16 — story / reel full-bleed format

**What is not in v1 (generative — v2 scope)**
- AI-generated backgrounds from a text prompt
- Generative additions (steam on a cup, props, product styling elements)
- Perspective correction
- AI-generated lifestyle scenes from reference photos

These are real features worth building — they are deferred because the static preset library covers the core need at zero per-image cost, and generative AI backgrounds ($0.04–0.10 per image) require a separate credit model and processing time that adds friction to a flow designed to complete in under 2 minutes.

### 7.4 Background removal — known limitations and mitigations

The `@imgly` model is ~40MB, downloaded once and cached in IndexedDB. On first use this creates a meaningful delay, especially on mobile over spotty connections (café basement, retail floor). Mitigations:

- Show a two-state loading indicator: "Loading brand tools (first time only)" → "Removing background"
- Cache aggressively in IndexedDB after first load — subsequent uses are fast
- Pre-warm the model in the background during onboarding, before the user tries to use it
- Provide a manual crop / no-removal fallback so the tool is not blocked if the model fails

WebGPU is not universally supported on iOS Safari. WASM fallback is the default path for a significant portion of the target audience. WASM on an older iPhone is slower but functional — do not treat WebGPU as a required dependency.

**Do not** trigger background removal before it is needed. Pre-warm the model during onboarding, but do not run it until the owner selects a preset that requires it (Studio Clean, Bokeh, or Lifestyle). The Natural and Brand Warm/Bold presets work on the original photo — these are good first-load styles that keep the UI feeling instant while the ONNX model finishes warming.

### 7.5 Mobile performance requirements

- Compress phone camera images (5–12MB) client-side to max 2048px before any processing layer
- Canvas layouts and saved design palettes must remain interactive without connectivity (offline-capable UI)
- PWA installable — add to home screen, standalone display mode
- Zero media logging — product images never touch Brand Alchemy servers

**Export to camera roll — iOS PWA caveat:** Standard PWA export (`canvas.toBlob()` → object URL → programmatic download) saves to the Files app on iOS, not directly to the Photos/camera roll. Options:
- **Web Share API** (`navigator.share({ files: [file] })`) — supported on iOS 15.1+ Safari. Triggers the native share sheet, owner can choose Photos. This is the correct v1 path.
- **Fallback**: direct download to Files app with a clear label ("Saved to Files — move to Photos manually"). Not ideal but functional.
- Do not attempt a native camera roll write without a proper iOS wrapper — PWA cannot access the Photos library directly. If a native shell (Capacitor, Expo) is ever added in v2, this becomes trivial.

"Save to camera roll" in the UI should be labeled "Share / Save" to set accurate expectations on iOS. Test on physical iOS hardware before launch — simulator behavior differs.

---

## 8. Feature Scope

### 8.1 Milestone 1 — Brand DNA storage and Next.js core

- Next.js project setup, PWA manifest, Tailwind + Shadcn
- Supabase schema for user accounts and Brand DNA profiles
- `brand-context.json` import flow (from Identity Kit fulfillment)
- Manual Brand DNA onboarding (archetype fallback for non-Kit users)
- Logo upload to S3-compatible storage
- Stripe subscription setup (monthly + annual plans)

### 8.2 Milestone 2 — HTML5 Canvas engine (primary product surface)

This is the core milestone. The visual tool is the reason owners open the app.

**Swipe gallery**
- Full-size photo preview with active style applied
- Scrollable thumbnail row of 5–6 named presets — tap to switch, preview updates immediately
- Dot indicator showing current position in the preset sequence
- Presets are industry-aware: hospitality set vs boutique/maker set loaded based on business type

**Style presets**
- Studio Clean: BG removal → neutral white composite → minimal brand tint
- Bokeh: BG removal → blurred original background → warm brand tint
- Brand Warm: original photo → low-opacity brand palette overlay
- Brand Bold: original photo → stronger brand primary color treatment
- Natural: auto-enhance only
- Lifestyle (boutique/maker): BG removal → static textured background (marble, linen, wood) from asset library

**Auto-enhance**
- Fires on every photo before the gallery renders
- Brightness normalisation, contrast stretch, warmth adjustment, light sharpening
- All Canvas API — under 200ms, no server call

**Text overlay**
- Template presets: New Today, Sale, Hours, Event, Custom
- Brand font rendering (Google Web Font or fallback)
- Position: Top / Center / Bottom
- Single line, v1

**Format picker**: 1:1, 4:5, 9:16

**Export**: save to camera roll, JPEG/PNG, no watermark, no server upload

**Background asset library**: static images bundled or CDN-served — neutral white, bokeh blur, marble, linen, dark wood, soft outdoor. No generative AI in v1.

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

A sole-proprietor café owner who has an Identity Kit:

1. Opens the DEE app on their phone
2. Brand DNA is already loaded from their Kit
3. Takes a photo of their new seasonal latte
4. Picks the "Warm" treatment — one tap, photo looks on-brand instantly
5. Adds a text overlay: "New today: Oat Cardamom Latte" in their brand font
6. Picks "A win this week," types "new seasonal latte," taps generate
7. Sees a caption that sounds like them, not a template
8. Saves to camera roll — photo and caption ready to post

**Total time: under 2 minutes.** No Canva. No design decisions. No copywriting. The brand document they bought is doing its job — invisibly, every day.

The visual output is what stops the scroll. The caption is what makes them come back tomorrow.

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
