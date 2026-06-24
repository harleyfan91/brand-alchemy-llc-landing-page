# DEE Pre-Build Checklist

**Purpose:** Track every blocking item that must be resolved before or alongside each build milestone. This is the task tracker — the PRD (`DAILY_EXECUTION_ENGINE_PRD.md`) is the stable spec. Update status here as items are resolved; do not modify the PRD to reflect task progress.

**Status values:** `OPEN` · `IN PROGRESS` · `DONE` · `DEFERRED`

---

## Before any code is written

### IK-1 — Identity Kit `brand-context.json` verification
**Owner:** Identity Kit repo agent  
**Status:** `IN PROGRESS` — field-level audit complete Jun 2026 (see IK-2)  
**Blocking:** Milestone 4 / Kit handoff. Milestones 1–2 are independent — proceed in parallel.

**Corrected understanding after full audit:**

The gap is **export and API, not generation**. The data DEE needs for Core customers is already computed during PDF assembly — it is just never serialized into `brand-context.json` or exposed via API. Identity Kit needs one assembler function and a real fulfillment storage + lookup layer; it does not need to rebuild how the Kit generates its outputs.

| Assumption in original PRD | Reality after audit | Action |
|----------------------------|---------------------|--------|
| `brand-context.v1.schema.json` exists | ✅ Confirmed | None |
| `brand-context.json` generated at fulfillment | ❌ Not serialized — but **inputs already exist** in assembly code | Identity Kit adds `buildBrandContext(form)` using existing functions |
| Fulfillment webhook / order API | ❌ Stubs only | Identity Kit adds real persistence + `GET /fulfillment/:orderId/brand-context` |
| CSP sections (`csp.captionStarters`) | ⚠️ Pro path only — but **Core scaffolds exist** (`buildCaptionStarterStubs`) | Core stubs are usable; Pro adds AI-rewritten versions |
| `voiceProfile.ctaType`, `contentPillarNames` | ⚠️ Data exists in narrator profiles, not exported | Include in `buildBrandContext()` export |
| `sections.voice.prohibitedWords` | ⚠️ Schema mismatch — data is at `industryProfiles.avoidTerms` | Export avoidTerms as `sections.voice.prohibitedWords`, or rename schema field |
| Fonts in `brand-context` | ❌ Typography resolved in `typographyRecipes.ts` but not exported | Add `primaryFontFamily`, `secondaryFontFamily` to `visualProfile` from existing recipe |

**Open items for Identity Kit repo:**
- [ ] Build `buildBrandContext(form)` — deterministic assembler mapping intake + generation outputs → `brand-context.v1` shape. Reuse existing functions; don't re-derive.
- [ ] Add real fulfillment persistence: `{ orderId, tier, brand-context.json, pdfUrls }` in Supabase or S3 (resolve with BD-2)
- [ ] Build `GET /fulfillment/:orderId/brand-context` endpoint (order ID lookup minimum; webhook is optional)
- [ ] Add `primaryFontFamily`, `secondaryFontFamily` to `visualProfile` from `getRecipeForProfile(form)`
- [ ] Map `industryProfiles.avoidTerms` → `sections.voice.prohibitedWords` in export
- [ ] Wire `voiceProfile.ctaType` from `NarratorProfile.cta_type` (not from Core PDF CTA body)
- [ ] Flag any breaking schema changes to this repo before shipping

**Recommended first spike (both repos):** Identity Kit builds `buildBrandContext(form)` returning JSON → paste into a DEE prototype. Validates the full integration before any Supabase/webhook infrastructure.
---

### IK-2 — Identity Kit full field audit against DEE requirements
**Owner:** Identity Kit repo agent  
**Status:** `DONE` — Jun 2026  

Full field-by-field audit complete. Results incorporated into IK-1. Summary:

| Field | Status |
|-------|--------|
| `voiceProfile.tonePreset` | Data exists (`step3.tonePreset`), not exported |
| `voiceProfile.narratorId` | Data exists (`step1.brandNarrator`), not exported |
| `voiceProfile.ctaType` | Data exists on narrator profile, not exported (wrong path in Core PDFs) |
| `voiceProfile.contentPillarNames` | Data exists on narrator, not exported |
| `visualProfile.paletteId` | Data exists (`step6.selectedPalette`), not exported |
| `visualProfile.paletteDisplayName` | Data exists in catalog, not exported |
| `visualProfile.selectedStyle` | Data exists (`step6.selectedStyle`), not exported |
| `sections.voice.prohibitedWords` | Schema mismatch — data at `industryProfiles.avoidTerms` |
| `sections.csp.captionStarters` | Core: deterministic scaffolds exist. Pro: AI-rewritten, not shipped |
| `sections.csp.contentPillars` | Core: names real, one-liners templated. Pro: enhanced |
| `sections.brief.idealCustomer` | Core-ready via `idealCustomerSnapshotFromIntake()`, not exported |
| Fonts | `typographyRecipes.ts` resolves Google Font names for PDFs — not in schema |

**Conclusion:** All Core fields exist. The entire gap is serialization into `brand-context.json` and a real export/API layer. See IK-1 for action items.

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

### DEE-1 — Tone → register mapping (DEE-side work, no Kit change needed)
**Owner:** Matt / DEE build  
**Status:** `OPEN`  
**Blocking:** Milestone 4 (copy engine)

The Identity Kit produces 3 tone presets (`friendly`, `professional`, `bold`). The DEE uses 7 registers. The mapping lives entirely in DEE — no schema change needed.

Confirmed base map (from audit):

| Kit tone preset | Primary DEE register | Notes |
|-----------------|---------------------|-------|
| `friendly` | Warm | Neighborhoody, genuine |
| `professional` | Confident | Direct, specific |
| `bold` | Energetic | Forward, movement |

**Open:** Define "nudge" logic — should `professional` owners be able to slide toward Quiet or Real? Should `friendly` be able to go Light? A simple secondary register option in the situation picker (or derived from business type + situation combination) would add quality without complicating the UI. Decide before Milestone 4.

- [ ] Document the full 3→7 mapping in the DEE copy engine spec (or PRD Section 5.3)
- [ ] Decide on secondary register nudges (yes/no/how)

---

### DEE-2 — Cold-start archetypes: align with current hospitality focus
**Owner:** Matt / DEE build  
**Status:** `OPEN`  
**Blocking:** Milestone 1 (onboarding UI)

The PRD's cold-start fallback (Section 4.3) lists "café, salon, home services, retail shop, etc." — this predates the narrowing to hospitality. The Identity Kit is being narrowed to 3 industries this sprint. DEE cold-start onboarding should match exactly:

- [ ] Confirm the 3 active Identity Kit industries post-sprint (café / beauty / restaurant — or similar)
- [ ] Update DEE cold-start archetype picker to show only those 3
- [ ] Update PRD Section 4.3 to reflect the 3 industries
- [ ] Each archetype needs a pre-loaded register, a set of industry-appropriate situation anchors, and a few-shot library subset — map these before Milestone 1 UI is built

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
