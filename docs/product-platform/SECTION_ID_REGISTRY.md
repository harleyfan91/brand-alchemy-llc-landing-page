# Section ID registry — cross-SKU consumption map

**Canonical home:** umbrella repo `docs/product-platform/`.  
**Implementation detail:** Section ID modes, scaffolds, and PDF assembly live in `identity-kit/OUTPUT_TRANSLATION_SPEC.md` §1.

Section IDs are **stable API names** for structured generation outputs. Do not rename after ship; add `v2` suffix if shape breaking.

---

## Identity Kit — foundation outputs (writes to brand context)

| Section ID | Product surface | Mode (v1) | In `brand-context` |
|------------|-----------------|-----------|---------------------|
| `brief.idealCustomer` | Brand Brief | ai_enhanced | yes |
| `csp.oneLiner` | Content Starter Pack | ai_enhanced | yes |
| `csp.elevator` | Content Starter Pack | ai_enhanced | yes |
| `csp.paragraph` | Content Starter Pack | ai_enhanced | yes |
| `csp.homepageDirections` | Content Starter Pack | ai_enhanced | yes |
| `csp.bioShort` | Content Starter Pack | ai_enhanced | yes |
| `csp.bioLong` | Content Starter Pack | ai_only | yes |
| `csp.captionStarters` | Content Starter Pack | ai_only | yes |
| `csp.contentPillars` | Content Starter Pack | hybrid | yes |
| `voice.ctaVariations` | Voice p3 + CSP p2 | ai_only (anchored) | yes |
| `voice.email.welcome` | Voice Playbook p3 | ai_only | yes |
| `voice.email.followUp` | Voice Playbook p3 | ai_only | yes |
| `voice.beforeAfter.pro` | Voice Playbook p3 | ai_only | yes |
| `strategyMemo.*` | Brand Strategy Memo | ai_only | yes (Pro-E+) |
| `brandAudit.*` | Brand Audit | ai_only | yes (conditional) |

Core `ai_enhanced` rewrites (Brief, Style, Voice p1–2, Guide, Quick Start) — full list in identity-kit OUTPUT spec — also persist to `kit_section_outputs` when Pro fulfillment ships; export subset to `brand-context.sections` for downstream products (voice traits, messaging themes, sample phrases prioritized).

---

## Downstream products — read-only consumption

| Product SKU | Required `brand-context` paths | Must not regenerate |
|-------------|-------------------------------|---------------------|
| **Social Content Pack** | `voiceProfile`, `sections.csp.captionStarters`, `sections.csp.contentPillars`, `sections.voice.ctaVariations`, `intake.step3` | Pillar names, CTA type, brand strategy |
| **Email Content Pack** | `voiceProfile`, `sections.csp.bioLong`, `sections.voice.email`, `sections.csp.paragraph`, `intake.step1.transformation` | Welcome/follow-up **voice** — extend with new templates only |
| **Core Content Pack** | `sections.csp.contentPillars`, `sections.csp.oneLiner`, `intake.step1.offer` | Offer line, pillar themes |
| **Holidays & Events Pack** | `voiceProfile`, `sections.csp.captionStarters` (style reference) | Seasonal **templates** only |
| **Google / Yelp local kits** | `voiceProfile`, `sections.voice.samplePhrases` (when exported), narrator `cta_type` | Full Voice Playbook PDF text |
| **Camentra** (future) | `visualProfile` (`palette`, `style`, `moodAdjectives`) | Photography direction from kit Look folio |

**Extend vs duplicate:** Channel packs add **volume and format** (more posts, more emails, seasonal layouts). They call small AI batches only where templates need variation — not full kit re-generation.

---

## Render aliases (no independent Section ID)

| Alias | Source Section ID | Surfaces |
|-------|-------------------|----------|
| CSP page 2 CTAs | `voice.ctaVariations` | CSP + Voice Playbook p3 |

---

## Adding a new Section ID

1. Propose in umbrella repo (this file + schema if export shape changes).
2. Add row to identity-kit `OUTPUT_TRANSLATION_SPEC.md` §1.
3. Implement scaffold + AI + walker in identity-kit.
4. Add consumption row if a downstream SKU reads it.
