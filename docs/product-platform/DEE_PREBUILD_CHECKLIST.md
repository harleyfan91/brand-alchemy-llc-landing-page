# DEE Pre-Build Checklist

**Purpose:** Track every blocking item that must be resolved before or alongside each build milestone. This is the task tracker — the PRD (`DAILY_EXECUTION_ENGINE_PRD.md`) is the stable spec. Update status here as items are resolved; do not modify the PRD to reflect task progress.

**Status values:** `OPEN` · `IN PROGRESS` · `DONE` · `DEFERRED`

---

## Before any code is written

### IK-1 — Identity Kit `brand-context.json` verification
**Owner:** Identity Kit repo agent  
**Status:** `IN PROGRESS` — initial audit complete Jun 2026  
**Blocking:** Milestone 4 specifically (Milestones 1–2 can proceed; see sequencing note below)

**Audit findings (Jun 2026):**

| Assumption in PRD | Identity Kit today | Action needed |
|-------------------|--------------------|--------------|
| `brand-context.v1.schema.json` exists | ✅ Exists in umbrella repo (`docs/product-platform/schemas/`) | None |
| `brand-context.json` generated at fulfillment | ❌ Not implemented — no generation code in identity-kit repo | Must be built in Identity Kit before DEE Milestone 4 |
| Fulfillment webhook / order API | ❌ Stub only — `/checkout`, `/fulfillment/:sessionId` return placeholder data | Must be built in Identity Kit |
| Pro CSP sections (`csp.captionStarters`, `csp.contentPillars`) | ❌ Pro-only, not shipped — Core is deterministic; CSP is future Pro work | CSP data will not be available for Core Kit customers in v1 |
| `voiceProfile.ctaType`, `contentPillarNames` | ⚠️ Schema defined; assembly from Kit fulfillment TBD | Depends on fulfillment build |
| Fonts in `brand-context` | ❌ Schema has no font fields | Font field must be added to schema OR DEE builds its own palette→font mapping |

**Items still open:**
- [ ] Identity Kit to build `brand-context.json` generation at fulfillment (Core fields first; Pro/CSP fields in a later pass)
- [ ] Identity Kit to build a real fulfillment API endpoint (webhook or order ID lookup) — current endpoints are stubs
- [ ] Font field decision: Identity Kit adds font refs to schema, OR DEE maintains a palette/style → Google Fonts mapping table independently (see UX-3)
- [ ] Confirm whether Identity Kit has a Supabase project and whether it should be shared (see BD-2)
- [ ] Identity Kit to flag any planned schema changes to this repo before shipping

**Sequencing implication (important):** DEE Milestones 1 and 2 (Brand DNA storage, canvas engine) do not depend on Identity Kit fulfillment being live. DEE should build the cold-start onboarding path first (archetype picker → tone → logo/colors) so the product works independently. The Kit integration layer slots in on top once Identity Kit ships fulfillment. Do not block the entire DEE build waiting for IK-1 — run them in parallel.

**Core vs. Pro distinction for copy quality:** The richest prompt data (`csp.captionStarters`, `csp.contentPillars`) is Pro-only in the Identity Kit. This means:
- Core Kit customers → DEE uses voice profile + situation taxonomy + few-shot library only (still good, but generic few-shots rather than the owner's own starters)
- Pro Kit customers → DEE injects the owner's actual caption starters as few-shot examples (highest quality, true differentiation)

This should be documented as a copy quality tier in the PRD and surfaced as an upsell moment inside the DEE for Core customers.

---

### IK-2 — Identity Kit full field audit against DEE requirements
**Owner:** Identity Kit repo agent  
**Status:** `OPEN`  
**Blocking:** Milestone 4

The initial audit confirmed the high-level picture. Before Milestone 4 (copy engine), the Identity Kit agent should do a field-by-field audit: for each field in the PRD required-fields table, confirm whether it is (a) generated and populated in fulfillment, (b) schema-defined but not yet generated, or (c) missing from the schema entirely. Output should be a completed version of the PRD requirements table with current status per field.

Ask the Identity Kit agent: *"Audit identity-kit against the required fields table in the DEE PRD's 'Identity Kit Verification Requirements' section. For each field, confirm: generated at fulfillment, schema-only, or missing entirely."*

---

### IK-3 — Core vs. Pro copy quality tier (DEE PRD update needed)
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 4, and PRD Section 5 copy quality architecture

The audit revealed that `csp.captionStarters` and `csp.contentPillars` are Pro-only in the Identity Kit — they are not shipped for Core customers. This creates two distinct copy quality tiers in the DEE that are not currently documented in the PRD:

- **Core Kit customer** → DEE injects voice profile + situation taxonomy + generic few-shot library (captions written for the business type, not the specific owner)
- **Pro Kit customer** → DEE additionally injects the owner's own caption starters as few-shot examples (highest quality; the owner's voice, not a template)

**Action:** Update PRD Section 5 (Copy Quality Architecture) to document both tiers explicitly, and add a note on surfacing the Pro Kit upsell inside the DEE for Core customers ("Your captions are good — Pro Kit customers get copy trained on their exact voice").

---

### BD-1 — Trial / free tier decision
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 1 (Stripe setup, onboarding flow)

Options:
- [ ] Kit customers get N free generations automatically (warmest path, no friction)
- [ ] 7-day free trial for all users
- [ ] Fixed free tier (e.g. 5 generations/month, watermark or no export)
- [ ] No trial — Identity Kit purchase is the qualification

Decision affects: Stripe configuration, onboarding copy, upsell trigger timing, and the Section 9 open decision on "non-Kit user upsell trigger."

---

### BD-2 — Supabase: shared vs. separate instance
**Owner:** Matt (pending IK-1 answer)  
**Status:** `OPEN`  
**Blocking:** Milestone 1 (Supabase schema work)

- [ ] Confirm whether Identity Kit has an active Supabase project
- [ ] Decide: same project (simpler Brand DNA handoff, tighter coupling) or separate (cleaner boundaries, extra transfer step)

---

### BD-3 — Deployment target confirmation
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 1  

- [ ] Confirm Vercel for Next.js hosting
- [ ] Confirm subdomain: `app.brandalchemyllc.com` (recommended in PRD Section 9)
- [ ] Confirm S3-compatible bucket provider (AWS, Cloudflare R2, Supabase Storage)

---

## Before Milestone 2 (Canvas engine)

### UX-1 — Screen-level user flows
**Owner:** Matt / design  
**Status:** `OPEN`  
**Blocking:** Milestone 2 (canvas build needs to know what surrounds it)

Map these flows before building any screens:
- [ ] **Onboarding — Kit customer path**: connect order → confirm logo → done. What screens? What error states (expired order, duplicate import)?
- [ ] **Onboarding — cold-start path**: business type → tone picker → logo/colors. How many steps? What's the minimum viable input to get to a first generation?
- [ ] **Core loop**: photo selection → canvas editor → copy generation → export. Are canvas and copy one screen or two? Can the user go back?
- [ ] **Paywall / trial touchpoints**: when does the paywall appear? What does it say?
- [ ] **Credit exhaustion**: what happens mid-session when credits run out?

This doesn't need Figma — a flow diagram or a doc listing each screen, its purpose, and its connections is enough.

---

### UX-2 — Canvas interaction model (rough wireframe)
**Owner:** Matt / design  
**Status:** `OPEN`  
**Blocking:** Milestone 2

The canvas is the most novel UI and the hardest to iterate on post-build. Decide before coding:
- [ ] How does the user place and scale their photo? (Auto-fit? Pan and zoom? Drag?)
- [ ] Logo placement: draggable or preset corner options?
- [ ] Can overlay opacity be adjusted by the user, or is it brand-locked?
- [ ] Can they preview with and without background removal before committing?
- [ ] Can they save drafts?
- [ ] What does the layout look like on a 375px wide iPhone screen?

A rough sketch (even paper) resolves most of these before a line of canvas code is written.

---

### UX-3 — Font strategy for the canvas
**Owner:** Matt (dependent on IK-1 answer)  
**Status:** `OPEN`  
**Blocking:** Milestone 2

- [ ] Confirm whether `brand-context.json` includes font references (see IK-1)
- [ ] If yes: are they Google Web Fonts (easy to load) or paid fonts (licensing problem)?
- [ ] If no: define the fallback — either (a) add a font field to the schema, or (b) maintain a mapping table from Kit palette/style IDs to recommended Google Fonts pairings
- [ ] Document the font loading strategy: how fonts are fetched, cached, and applied in the HTML5 Canvas context
- [ ] Define the fallback font for when a Kit font cannot be loaded

Rendering the wrong font in the canvas is immediately noticeable to an owner who just bought a brand document. This needs a specific policy, not a "we'll figure it out."

---

### UX-4 — Design system: inherit vs. own UI
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 1 (sets up Tailwind config and component foundation)

- [ ] Does the DEE inherit Brand Alchemy's marketing site visual identity (same type scale, colors, card styles)?
- [ ] Or does it have its own UI — still Brand Alchemy-adjacent but a distinct product app feel?
- [ ] If inheriting: copy `brand-tokens.css` from the marketing site repo and configure Tailwind to match
- [ ] If own: define the DEE's primary/accent colors, type scale, and component style before Milestone 1

---

## Before Milestone 4 (Copy generation)

### CP-1 — Few-shot caption examples
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 4 (copy generation engine)

The system prompt architecture requires 3–5 tested examples per register per business type. Current PRD has 4 examples (2 café, 2 salon).

**What needs to be written:**

| Register | Café (need) | Salon (need) |
|----------|-------------|-------------|
| Wry | 2 more | 3 needed |
| Real | 2 more | 3 needed |
| Confident | 3 needed | 3 needed |
| Quiet | 3 needed | 3 needed |
| Warm | 3 needed | 2 more |
| Energetic | 3 needed | 3 needed |
| Light | 3 needed | 3 needed |

Minimum: ~38 additional captions. Each must pass the same quality bar as the social content pack work — tested against the register definition, no generic marketing language, no prohibited words.

**This is content work, not code.** It should be done as a dedicated writing session before Milestone 4 begins, using the register definitions and prohibition list in PRD Section 5 as the quality filter.

---

### CP-2 — Situation taxonomy: café vs. salon specificity
**Owner:** Matt  
**Status:** `OPEN`  
**Blocking:** Milestone 4

The current 7 situations were developed primarily for cafés. Before building the situation picker, confirm:
- [ ] Do all 7 situations translate naturally to salons? ("Open / available this week" → appointment availability; "What goes into it" → technique or product; these work but need salon-specific prompt anchors)
- [ ] Should the prompt anchor language be business-type-specific? (e.g. "walk-ins, slow day, capacity" for café vs. "appointments, booking link, last-minute slot" for salon)
- [ ] Add salon-specific prompt anchor variants to PRD Section 5.2 before the copy engine is built

---

## Before launch

### LG-1 — Privacy and data policy
**Owner:** Matt  
**Status:** `DEFERRED` (not a launch blocker for a closed beta, but needed before public launch)

- [ ] Define exactly what data is stored: Brand DNA profile, credit counts, session metadata
- [ ] Confirm zero media policy: product photos never touch Brand Alchemy servers (already in PRD 7.5)
- [ ] Draft privacy policy covering Brand DNA data storage, account deletion (GDPR right to erasure), and Stripe payment data handling
- [ ] Confirm GDPR/CCPA applicability for EU café customers

---

## Resolved items

*(Move items here with resolution notes when done)*

---

*Last updated: Jun 2026*
