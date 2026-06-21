# Studio Intake Operations

_Internal reference — intake flow, email templates, and tooling stack._

---

## Intake Flow

1. **Lead submits inquiry** via `/studio/intake`
2. **Auto-confirmation sent** by form tool (Tally) immediately on submit
3. **Matt reviews submission** within 3 business days
4. **Manual intake response sent** by Matt — includes call context, prep questions, and payment/booking link
5. **Lead pays $200 deposit + books 60-min discovery call** via calendar tool
6. **Discovery call** — structured diagnostic, not a pitch
7. **Decision** — proceed to advisory package, defer, or decline. $200 credited toward the advisory package fee if they proceed.

---

## Email Templates

### Auto-Confirmation (sent by Tally on submit)

**Subject:** We received your inquiry — Brand Alchemy Studio

---

Thanks for reaching out, your submission is in. We'll review it and follow up within 3 business days.

— Brand Alchemy Studio

---

### Full Intake Response (sent manually by Matt after review)

**Subject:** Next steps — Brand Alchemy Studio

---

Hi [Name],

Thanks for inquiring, your situation looks like a fit for what we do here.

The next step is a 60-minute discovery call. This isn't a sales pitch, it's a structured diagnostic. We'll map your current setup, identify where the biggest operational leverage is, and determine whether one of our advisory formats makes sense for your business right now.

To get the most out of the call, it helps to come in thinking about three things: where your revenue sits currently, the one problem that's costing you the most right now, and anything you've already tried that hasn't worked.

Our fee for the discovery call is $200, credited toward your advisory package fee if we move forward. Use the link below to book a slot and complete payment, that locks in your time. From there, we'll do preliminary research on your business and provide a custom analysis of how we can work together.

[CALENDAR + PAYMENT LINK]

If you have questions before then, you can reach me directly at info@brandalchemyllc.com.

Looking forward to it.

— Matt
Brand Alchemy Studio

---

## Tooling Stack

### Form — Tally
**Cost:** Free tier covers all basic needs  
**Why:** Generous free plan, clean embeds, webhook and email notification support, easy Supabase integration via webhooks or Zapier/Make  
**Use for:** `/studio/intake` form submissions  
**Setup:** Create form at tally.so → set `STUDIO_INTAKE_FORM_URL` in `content/studio.ts` to the Tally form URL

---

### Calendar + Payment — Cal.com + Stripe
**Cost:** Cal.com free tier (self-hosted or cloud) · Stripe: no monthly fee, 2.9% + 30¢ per transaction (~$6 per $200 booking)  
**Why:** Cal.com is the only free-tier calendar tool with native Stripe payment integration. Calendly requires a paid plan ($8–12/mo) for payment support.  
**Use for:** $200 deposit + slot booking in the intake response  
**Setup:** Connect Cal.com event to Stripe → set event price to $200 → paste booking URL into intake response template

---

### Database — Supabase
**Cost:** Free tier (500MB database, 50k monthly active users)  
**Why:** Already familiar, generous free tier, direct Postgres access, easy webhook ingestion  
**Use for:** Storing all lead submissions — email, business type, industry, referral source, status  
**Schema:** See below

---

### Email — Gmail / Google Workspace
**Cost:** Free (Gmail) or $6/mo (Google Workspace with custom domain)  
**Why:** Manual responses sent directly — no drip tool needed at this stage  
**Recommendation:** Use `info@brandalchemyllc.com` (already referenced in copy) via Google Workspace for professional sends

---

## Supabase — Lead Database Schema

```sql
create table studio_leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact
  name            text not null,
  email           text not null,
  phone           text,

  -- Business context (matches intake form fields)
  business_name   text,
  business_type   text,         -- e.g. "Tattoo Studio", "Streetwear Brand"
  services_needed text,         -- free text from form
  how_found       text,         -- referral source

  -- Internal tracking
  status          text not null default 'submitted',
                  -- submitted | reviewed | call_booked | active | declined | deferred
  notes           text,         -- Matt's internal notes
  call_booked_at  timestamptz,
  deposit_paid    boolean not null default false
);
```

**Status lifecycle:**
- `submitted` — form received, not yet reviewed
- `reviewed` — Matt has read it, intake response sent
- `call_booked` — lead paid $200 and booked a slot
- `active` — moved to full strategy advisory package
- `declined` — not a fit, politely declined
- `deferred` — good fit but wrong timing, follow up later

---

## Next Setup Steps (in order)

1. [ ] Create Tally form → set live URL in `content/studio.ts`
2. [ ] Create Supabase project → run schema above → connect Tally webhook to insert leads
3. [ ] Set up Cal.com account → connect Stripe → create $200 Discovery Call event
4. [ ] Add cal.com booking URL to intake response template above
5. [ ] Confirm `info@brandalchemyllc.com` is active on Google Workspace
