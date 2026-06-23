# Product Requirement Document
## Brand Alchemy: Daily Execution Engine (Codename: DEE)
### Version 1.1 — Updated from v1 PRD after strategic review

---

## Status

**Pre-build / strategic validation.** No code exists yet. This document governs architecture, scope, and open decisions before development begins. Review against `ACQUISITION_FUNNEL_AND_SKU_MAP.md` before each milestone.

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

## 2. Business Model

### 2.1 Subscription tiers

**One plan. No watermarks. No locked features.**

| Model | Price | Notes |
|-------|-------|-------|
| Monthly | **$25/month** | Full access to all tools |
| Annual | **$199/year** | ~$16.60/month — push this as the primary offer |

Rationale for annual-first pricing: predictable revenue, lower churn, and the per-month equivalent undercuts Canva Pro ($15/mo) on a value-per-feature basis once Brand DNA integration is factored in.

### 2.2 AI credit budget

Every account receives **150 AI generation credits/month** for copy generation. Image processing, resizing, color overlays, logo stamping, and background removal are **not** credit-consuming — they run client-side with no API cost.

**Overage:** $5 for 50 additional credits. Single-click purchase, no new plan required.

### 2.3 Cost structure

| Operation | Cost | Processing location |
|-----------|------|-------------------|
| Background removal | **~$0.00** | Browser (ONNX Runtime / WebGPU) |
| Copy generation (gpt-4o-mini) | **~$0.0003/call** | Server (Next.js edge function) |
| 150 credits fully used | **~$0.045/month/user** | — |
| Gross margin target | **>99%** | — |

Storage: logos and Brand DNA profiles stored in S3-compatible bucket. Cost negligible at early scale.

---

## 3. The Identity Kit Integration (Critical Path)

This is the feature that makes the DEE a Brand Alchemy product rather than a generic tool. It must be built before or alongside the core canvas features.

### 3.1 What already exists

The `brand-context.v1.schema.json` (at `docs/product-platform/schemas/`) defines a machine-readable output format for fulfilled Identity Kit orders. It includes:

- `voiceProfile` — `narratorId`, `tonePreset`, `ctaType`, `contentPillarNames`
- `visualProfile` — `paletteId`, `paletteDisplayName`, `selectedStyle`, `moodAdjectives`
- `sections` — keyed outputs including `csp.captionStarters`, `csp.contentPillars`, `voice.ctaVariations`, `brief.idealCustomer`

This schema is the data bridge. When a Kit order is fulfilled, the `brand-context.json` file is the artifact the DEE reads from.

### 3.2 Auto-population flow

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

### 3.3 Cold-start fallback (non-Kit users)

For users who have not purchased an Identity Kit, provide archetype-based onboarding:
- Pick your business type (café, salon, home services, retail shop, etc.)
- Pick your brand tone from 4-5 plain-language options ("Warm and neighborhoody," "Confident and direct," "Wry and a bit different," etc.)
- Upload your logo and pick brand colors

This produces a provisional Brand DNA profile sufficient to generate decent output on day one. Quality climbs when they connect or purchase an Identity Kit. This becomes a natural upsell trigger within the app: "Your Brand DNA is estimated — get an Identity Kit for captions that actually sound like you."

---

## 4. Copy Quality Architecture

This section documents how the DEE avoids the most common AI copy failure mode: generic, enthusiasm-heavy marketing language that the business owner immediately recognizes as not sounding like them.

### 4.1 The failure mode

Default gpt-4o-mini output, given minimal context, regresses toward its training distribution — which is dominated by generic marketing copy. "Your coffee, your way! ☕✨ Swing by today!" Owners recognize this on the second or third use and stop trusting the tool.

### 4.2 The situation taxonomy (from pack work)

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

### 4.3 The register system (from pack work)

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

### 4.4 Few-shot examples in system prompts

The tested captions from the social pack work are not wasted — they become the few-shot examples that teach the model what each register actually looks like for these business types:

- **Wry / café:** "AI is taking jobs? I think we're safe."
- **Real / café:** "The usual? Already on the counter."
- **Confident / salon:** "Big change? We talk it through first. No surprises."
- **Warm / salon:** "We've been called a hidden gem so many times we're starting to wonder if we need a bigger sign."

3-5 examples per register per business type, injected into the system prompt. This is dramatically more reliable than describing the tone in prose.

### 4.5 Hard prohibitions in system prompt

Injected as explicit rules, not suggestions:

- No exclamation marks unless register is Energetic
- No emoji unless the user's Brand DNA explicitly includes them
- Do not reference the business in third person
- No "community," "journey," "authentic," "passionate" (generic marketing words)
- Max 2 sentences for short version; max 4 for long version
- Do not open with the business name
- Do not use the word "just"

Any prohibited words from the owner's Brand DNA Voice Playbook (`sections.voice.prohibitedWords`) are appended to this list.

### 4.6 Two outputs, user selects and edits

Every generation produces:
1. **Short and punchy** — 1-2 sentences, designed for feed posts with a strong image
2. **Narrative story** — 3-4 sentences, designed for Stories or when the image needs more context

The user selects one, edits inline if needed, and exports. The edit step is a quality safety valve and, if edit behavior is logged, provides signal for prompt refinement over time. Output is never auto-published — there is always a human review moment.

---

## 5. Technical Architecture

### 5.1 Stack

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

### 5.2 Architecture diagram

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

### 5.3 Canvas engine — two layout modes

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

### 5.4 Background removal — known limitations and mitigations

The `@imgly` model is ~40MB, downloaded once and cached in IndexedDB. On first use this creates a meaningful delay, especially on mobile over spotty connections (café basement, retail floor). Mitigations:

- Show a two-state loading indicator: "Loading brand tools (first time only)" → "Removing background"
- Cache aggressively in IndexedDB after first load — subsequent uses are fast
- Pre-warm the model in the background during onboarding, before the user tries to use it
- Provide a manual crop / no-removal fallback so the tool is not blocked if the model fails

WebGPU is not universally supported on iOS Safari. WASM fallback is the default path for a significant portion of the target audience. WASM on an older iPhone is slower but functional — do not treat WebGPU as a required dependency.

**Do not** make background removal the first experience. Let the user do a simple layout (photo + brand overlay + logo stamp) first, then introduce background removal as an enhancement. This avoids the 40MB download becoming a first-impression problem.

### 5.5 Mobile performance requirements

- Compress phone camera images (5–12MB) client-side to max 2048px before any processing layer
- Canvas layouts and saved design palettes must remain interactive without connectivity (offline-capable UI)
- PWA installable — add to home screen, standalone display mode
- Zero media logging — product images never touch Brand Alchemy servers

---

## 6. Feature Scope

### 6.1 Milestone 1 — Brand DNA storage and Next.js core

- Next.js project setup, PWA manifest, Tailwind + Shadcn
- Supabase schema for user accounts and Brand DNA profiles
- `brand-context.json` import flow (from Identity Kit fulfillment)
- Manual Brand DNA onboarding (archetype fallback for non-Kit users)
- Logo upload to S3-compatible storage
- Stripe subscription setup (monthly + annual plans)

### 6.2 Milestone 2 — HTML5 Canvas engine

- 1:1 post layout: image placement, brand color overlay, logo stamp
- 9:16 story layout: background image, opacity overlay, text containers
- Brand font loading (safe Google Web Fonts + custom upload path)
- Export to JPEG/PNG, no watermark
- CORS-safe asset loading for logos from bucket

### 6.3 Milestone 3 — Background removal

- `@imgly/background-removal-web` integration
- IndexedDB model caching with two-state loading UX
- WebGPU → WASM fallback
- Model pre-warm during onboarding
- Manual crop fallback

### 6.4 Milestone 4 — Copy generation engine

- Situation picker UI (7 situations, 3-5 word user note)
- System prompt construction from Brand DNA:
  - Tone preset → register selection
  - Prohibited words injection
  - Few-shot examples by register and business type
  - Hard prohibition list
- gpt-4o-mini call via Next.js edge function
- Two-output display (punchy / story), inline edit, copy to clipboard
- Credit tracking and overage UI

### 6.5 Milestone 5 — Billing and credit management

- Stripe subscription webhooks
- Monthly credit reset
- Overage top-up purchase (single-click, $5 / 50 credits)
- Credit usage display in app
- Grace period handling (expired subscription — read-only mode, not deletion)

---

## 7. Open Decisions

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

## 8. What Success Looks Like (v1)

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

## 9. Relationship to Existing Docs

| Doc | Relationship |
|-----|-------------|
| `ACQUISITION_FUNNEL_AND_SKU_MAP.md` | DEE replaces content pack PDFs as Phase 3 in product ladder. Update SKU table when DEE launches. |
| `docs/product-platform/schemas/brand-context.v1.schema.json` | Critical integration schema — `voiceProfile`, `visualProfile`, and `sections` are the DEE's Brand DNA input |
| `docs/product-platform/CUSTOMER_VOICE_AND_PRODUCT_LINE.md` | Voice system that DEE copy engine inherits |
| `content/contentPacks.ts` | Situation taxonomy and register system from pack work — reference for prompt architecture, not shipped as product |
| Identity Kit repo — `IDENTITY_KIT_PRD.md` | Fulfillment output is DEE's primary input — coordinate on `brand-context.json` delivery mechanism |
| Camentra repo | Photo capture / retouch layer that complements DEE — Camentra handles the photography side, DEE handles the brand application and copy side |
