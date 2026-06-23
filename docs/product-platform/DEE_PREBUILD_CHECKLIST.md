# DEE Pre-Build Checklist

**Purpose:** Track every blocking item that must be resolved before or alongside each build milestone. This is the task tracker — the PRD (`DAILY_EXECUTION_ENGINE_PRD.md`) is the stable spec. Update status here as items are resolved; do not modify the PRD to reflect task progress.

**Status values:** `OPEN` · `IN PROGRESS` · `DONE` · `DEFERRED`

---

## Before any code is written

### IK-1 — Identity Kit `brand-context.json` verification
**Owner:** Identity Kit repo agent  
**Status:** `OPEN`  
**Blocking:** Milestones 1, 2, 4 (core DEE features depend on this data)

Full requirements written in the PRD under **"Identity Kit Verification Requirements"**. Summary of what needs to be confirmed or built:

- [ ] Does the Identity Kit currently generate a machine-readable `brand-context.json` at fulfillment?
- [ ] Does it include all required fields? (See PRD table: `voiceProfile.tonePreset`, `visualProfile.paletteId`, `sections.voice.prohibitedWords`, `sections.csp.captionStarters`, `sections.brief.idealCustomer`, etc.)
- [ ] Does `brand-context.json` include font references? If yes, are they Google Web Fonts or paid fonts?
- [ ] Is there a fulfillment webhook or API endpoint the DEE can hook into?
- [ ] Where are fulfilled `brand-context.json` files stored? (S3, Supabase storage, other?)
- [ ] Is there a shared Supabase project, or should the DEE have a separate one?

**How to use:** Copy the "Identity Kit Verification Requirements" section from the PRD and hand it to the Identity Kit repo agent as a standalone brief.

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
