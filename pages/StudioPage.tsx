import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/hero-brand-shine.css';
import StudioHeader from '../components/StudioHeader';
import StudioFooter from '../components/StudioFooter';
import {
  STUDIO_CONTACT_EMAIL,
  STUDIO_INQUIRY_HREF,
  STUDIO_INQUIRY_IS_EXTERNAL,
  STUDIO_INSTAGRAM_URL,
  STUDIO_RETAINER,
  STUDIO_SPRINTS,
} from '../content/studio';

const PAGE_TITLE = 'Brand Alchemy | Studio — Consulting for Subculture Brands';

/**
 * DEV ONLY — flip to true to preview the testimonials placeholder block.
 * Keep false until real testimonials exist; the section is invisible to visitors when false.
 */
const SHOW_TESTIMONIALS_PLACEHOLDER = true;

/**
 * Replace with real testimonials before setting SHOW_TESTIMONIALS_PLACEHOLDER = true.
 * Fields: quote (no surrounding quotes), name, role (business type + rough location is enough).
 */
const TESTIMONIALS = [
  {
    quote: 'Placeholder — replace with real client quote before shipping.',
    name: 'Client Name',
    role: 'Tattoo Studio · City, ST',
  },
  {
    quote: 'Placeholder — replace with real client quote before shipping.',
    name: 'Client Name',
    role: 'Streetwear Brand · City, ST',
  },
] as const;


const SNAP_PANEL: React.CSSProperties = {
  scrollSnapAlign: 'start',
  height: '100vh',
};


const DARK_GRADIENT = 'linear-gradient(135deg, #0d0d0d 0%, #1a1816 40%, #0d0d0d 100%)';

const SPRINT_CARD_IMAGES: Record<(typeof STUDIO_SPRINTS)[number]['id'], string> = {
  'drop-allocation': '/studio-assets/sprint-a.jpg',
  'capacity-intake': '/studio-assets/sprint-b.jpg',
};

// ─── Reusable full-bleed panel with bottom-left text overlay ─────────────────

type ImagePanelProps = {
  src: string;
  scrubIntensity?: string;
  eyebrow: string;
  headline: string;
  subline: string;
};

const ImagePanel: React.FC<ImagePanelProps> = ({
  src,
  scrubIntensity = 'bg-black/55',
  eyebrow,
  headline,
  subline,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <section
      className="relative flex items-end justify-start overflow-hidden"
      style={SNAP_PANEL}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: DARK_GRADIENT }} aria-hidden />
      )}
      {/* gradient scrub stronger at bottom where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.82) 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full px-6 pb-16 sm:px-10 md:pb-20 lg:px-16 lg:pb-24">
        <div className="max-w-2xl">
          <h2
            className="font-serif text-3xl font-normal leading-tight md:text-4xl lg:text-5xl"
            style={{ color: 'var(--ba-studio-text)' }}
          >
            {headline}
          </h2>
          <p
            className="mt-4 max-w-xl text-sm font-light leading-relaxed md:text-base"
            style={{ color: 'var(--ba-studio-text-muted)' }}
          >
            {subline}
          </p>
        </div>
        <p
          className="mt-6 text-right text-[10px] font-bold uppercase tracking-[0.3em]"
          style={{ color: 'var(--ba-studio-text-muted)' }}
        >
          {eyebrow}
        </p>
      </div>
    </section>
  );
};

// ─── Primary CTA button (shared across sections) ─────────────────────────────

const InquiryButton: React.FC<{ className?: string }> = ({ className = '' }) =>
  STUDIO_INQUIRY_IS_EXTERNAL ? (
    <a
      href={STUDIO_INQUIRY_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 ${className}`}
      style={{ backgroundColor: 'var(--ba-studio-text)', color: 'var(--ba-studio-bg)' }}
    >
      Submit an inquiry
    </a>
  ) : (
    <Link
      to={STUDIO_INQUIRY_HREF}
      className={`inline-block rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-85 ${className}`}
      style={{ backgroundColor: 'var(--ba-studio-text)', color: 'var(--ba-studio-bg)' }}
    >
      Submit an inquiry
    </Link>
  );

// ─── Sprint card image band ───────────────────────────────────────────────────

const StudioImageBand: React.FC<{ src: string }> = ({ src }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="h-56 w-full shrink-0"
        style={{ backgroundColor: 'var(--ba-studio-surface)' }}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="h-56 w-full shrink-0 object-cover"
      onError={() => setFailed(true)}
    />
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const StudioPage: React.FC = () => {
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);

  // Scroll-driven hero image reveal: muted at rest → more vivid as user scrolls
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
      setHeroProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLE;
    const html = document.documentElement;

    /*
     * proximity — snaps to a panel only when the scroll position is within its
     * snap area (~50vh). Once you scroll past that zone into the content sections
     * below, it releases cleanly without trapping the user.
     * (mandatory would lock the browser to the last snap point, preventing scroll
     * into any non-snap content below panel 3.)
     */
    html.style.scrollSnapType = 'y proximity';

    return () => {
      document.title = 'Brand Alchemy | Business Consulting & Solutions';
      html.style.scrollSnapType = '';
    };
  }, []);

  return (
    <div className="ba-studio min-h-screen">
      <StudioHeader />

      <main className="relative flex-grow">

        {/* Panel 1 — Hero */}
        <section
          className="relative flex flex-col items-center justify-center overflow-hidden"
          style={SNAP_PANEL}
        >
          {!heroImageFailed ? (
            <img
              src="/studio-assets/hero.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{
                opacity: 0.65 + heroProgress * 0.22,
                filter: `brightness(${0.52 + heroProgress * 0.38}) saturate(${0.55 + heroProgress * 0.4})`,
              }}
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: DARK_GRADIENT }} aria-hidden />
          )}
          {/* overlay keeps hero text legible even as image brightens on scroll */}
          <div className="absolute inset-0 bg-black/51" aria-hidden />

          {/* Centered hook */}
          <div className="relative z-10 mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-6 text-center lg:px-8">
            <h1
              className="font-sans text-[clamp(2.4rem,7vw,5rem)] font-bold uppercase leading-[1.06] tracking-tight"
              style={{ color: 'var(--ba-studio-text)' }}
            >
              The gap between
              <span className="mt-2 block">DIY chaos</span>
              <span className="mt-2 block opacity-60">and a full agency.</span>
            </h1>
          </div>

          {/* Bottom — subtitle with sheen + compact scroll cue */}
          <div className="relative z-10 mb-8 flex flex-col items-center gap-3">
            <p
              className="studio-subtitle-shine text-[11px] font-light uppercase tracking-[0.28em]"
              style={{ color: 'var(--ba-studio-text-muted)' }}
            >
              Strategy consulting for independent brands
              <span className="studio-subtitle-shine__gloss" aria-hidden>
                Strategy consulting for independent brands
              </span>
            </p>
            <svg
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              style={{ color: 'var(--ba-studio-text-faint)' }}
            >
              <path
                d="M1 1 L7 6 L13 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Interstitial — primes the reader before the problem panels */}
        <div
          className="flex items-center justify-center px-6 py-20 sm:px-10 md:py-28 lg:px-16"
          style={{ scrollSnapAlign: 'none' }}
        >
          <p
            className="font-serif text-2xl font-normal leading-snug md:text-3xl"
            style={{ color: 'var(--ba-studio-text)' }}
          >
            We solve the problems your business keeps seeing:
          </p>
        </div>

        {/* Panel 2 — Drop brands / streetwear */}
        <ImagePanel
          src="/studio-assets/panel-2.jpg"
          eyebrow="Streetwear · Drops · Collectibles · Independent Labels"
          headline="A launch system your next drop can actually run on."
          subline="Allocation strategy, backward timelines, anti-bot protocols, and channel logic — documented and repeatable before the next release."
        />

        {/* Panel 3 — Tattoo studios / service collectives */}
        <ImagePanel
          src="/studio-assets/panel-3.jpg"
          eyebrow="Tattoo Studios · Piercing Clinics · Body Art Collectives"
          headline="Stop losing revenue to empty chairs."
          subline="Intake pipelines, tiered deposit systems, and booking infrastructure built for multi-artist studios that run on reputation."
        />

        {/* Offers — free-scroll content starts here */}
        <section className="relative z-10 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">

            {/* Strategy cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {STUDIO_SPRINTS.map((sprint) => (
                <article
                  key={sprint.id}
                  className="overflow-hidden rounded-xl border"
                  style={{
                    borderColor: 'var(--ba-studio-border)',
                    backgroundColor: 'var(--ba-studio-surface)',
                  }}
                >
                  <StudioImageBand src={SPRINT_CARD_IMAGES[sprint.id]} />
                  <div className="p-8 md:p-10">

                    {/* Name + price block */}
                    <div
                      className="border-b pb-6"
                      style={{ borderColor: 'var(--ba-studio-border)' }}
                    >
                      <h3
                        className="font-serif text-2xl font-normal leading-snug"
                        style={{ color: 'var(--ba-studio-text)' }}
                      >
                        {sprint.name}
                      </h3>
                      <div className="mt-4 flex items-baseline justify-between gap-4">
                        {/* Left: price(s) + first-client callout */}
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <p
                            className="text-2xl font-bold tabular-nums"
                            style={{ color: 'var(--ba-studio-text)' }}
                          >
                            {sprint.launchPrice ?? sprint.price}
                          </p>
                          {sprint.launchPrice && (
                            <>
                              <p
                                className="text-base tabular-nums line-through"
                                style={{ color: 'var(--ba-studio-text-muted)' }}
                              >
                                {sprint.price}
                              </p>
                              <p
                                className="text-base italic"
                                style={{ color: 'var(--ba-studio-text-muted)' }}
                              >
                                First client only
                              </p>
                            </>
                          )}
                        </div>
                        {/* Right: duration */}
                        <p
                          className="shrink-0 text-2xl font-bold tabular-nums"
                          style={{ color: 'var(--ba-studio-text)' }}
                        >
                          {sprint.duration}
                        </p>
                      </div>
                      <p
                        className="mt-3 text-xs font-light"
                        style={{ color: 'var(--ba-studio-text-muted)' }}
                      >
                        {sprint.format}
                      </p>
                    </div>

                    {/* Strategic services */}
                    <div className="mt-6">
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: 'var(--ba-studio-text-faint)' }}
                      >
                        Strategic services
                      </p>
                      <ul className="mt-3 space-y-2">
                        {sprint.advisory.map((item) => (
                          <li
                            key={item}
                            className="text-[11px] font-light uppercase tracking-[0.12em]"
                            style={{ color: 'var(--ba-studio-text-muted)' }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools & frameworks */}
                    <div
                      className="mt-6 border-t pt-5"
                      style={{ borderColor: 'var(--ba-studio-border)' }}
                    >
                      <p
                        className="text-[9px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: 'var(--ba-studio-text-faint)' }}
                      >
                        Tools & frameworks
                      </p>
                      <ul className="mt-3 space-y-2">
                        {sprint.tools.map((item) => (
                          <li
                            key={item}
                            className="text-[11px] font-light uppercase tracking-[0.12em]"
                            style={{ color: 'var(--ba-studio-text-muted)' }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p
                        className="mt-3 text-[10px] font-light italic"
                        style={{ color: 'var(--ba-studio-text-faint)' }}
                      >
                        Delivered in Notion or Google Docs
                      </p>
                    </div>

                    <p
                      className="mt-8 border-t pt-5 text-xs font-light leading-relaxed"
                      style={{
                        borderColor: 'var(--ba-studio-border)',
                        color: 'var(--ba-studio-text-muted)',
                      }}
                    >
                      Built for: {sprint.entryPoint}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Section CTA */}
            <div className="mt-14 text-center">
              <InquiryButton />
            </div>

          </div>
        </section>

        {/* Retainer — secondary, available after your strategy */}
        <section className="relative z-10 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-4xl border-t pt-10"
            style={{ borderColor: 'var(--ba-studio-border)' }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: 'var(--ba-studio-text-muted)' }}
            >
              After your strategy
            </p>
            <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2
                className="font-serif text-2xl font-normal"
                style={{ color: 'var(--ba-studio-text)' }}
              >
                {STUDIO_RETAINER.name}
              </h2>
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: 'var(--ba-studio-text-muted)' }}
              >
                {STUDIO_RETAINER.price} · {STUDIO_RETAINER.terms}
              </p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {STUDIO_RETAINER.scope.map((item) => {
                const [name, description] = item.split(' — ');
                return (
                  <li key={item}>
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: 'var(--ba-studio-text)' }}
                    >
                      {name}
                    </p>
                    {description && (
                      <p
                        className="mt-1 text-xs font-light leading-relaxed"
                        style={{ color: 'var(--ba-studio-text-muted)' }}
                      >
                        {description}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
            <p
              className="mt-6 border-t pt-5 text-xs font-light"
              style={{ borderColor: 'var(--ba-studio-border)', color: 'var(--ba-studio-text-muted)' }}
            >
              Add-ons available:{' '}
              {STUDIO_RETAINER.addOns.map((a, i) => (
                <span key={a.name}>
                  {i > 0 && ' · '}
                  {a.name}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Founder — portfolio panel, headshot focal point on right */}
        <section className="relative z-10 flex min-h-[70vh] items-center overflow-hidden">
          {/* Placeholder background — replace src with actual headshot, keep object-right */}
          <img
            src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=1600&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
            aria-hidden
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
          />
          {/* Gradient: dark left for legibility, reveals image on right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.82) 35%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15) 100%)',
            }}
            aria-hidden
          />
          <div className="relative z-10 px-6 py-16 sm:px-10 md:py-20 lg:px-16">
            <div className="max-w-xs sm:max-w-sm">
              <p
                className="text-sm font-bold uppercase tracking-[0.15em]"
                style={{ color: 'var(--ba-studio-text-muted)' }}
              >
                Matt Johnson
              </p>
              <h2
                className="mt-3 text-base font-bold uppercase tracking-[0.1em] md:text-lg"
                style={{ color: 'var(--ba-studio-text)' }}
              >
                Corporate training.<br />Anti-corporate instincts.
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Nine years running marketing strategy inside corporate environments.',
                  'Grew up in tattoo shops, followed independent labels and small brands long before this was a career.',
                  'Knows the difference between a brand that\'s built and one that\'s manufactured.',
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm font-light leading-relaxed"
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS PLACEHOLDER ─────────────────────────────────────────
            DEV ONLY. Hidden until real testimonials exist.
            To preview: set SHOW_TESTIMONIALS_PLACEHOLDER = true at top of file.
            To ship: replace placeholder content in TESTIMONIALS array below,
            then set SHOW_TESTIMONIALS_PLACEHOLDER = true permanently.
        ────────────────────────────────────────────────────────────────────── */}
        {SHOW_TESTIMONIALS_PLACEHOLDER && (
          <section className="relative z-10 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            {/* Dev-only warning banner — remove this div when testimonials are real */}
            <div
              className="mx-auto mb-8 max-w-4xl rounded-lg border-2 border-dashed px-6 py-4 text-center"
              style={{ borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.08)' }}
              aria-hidden
            >
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#f59e0b' }}>
                ⚠ Dev placeholder — not visible to visitors
              </p>
              <p className="mt-1 text-xs" style={{ color: '#f59e0b', opacity: 0.7 }}>
                Replace TESTIMONIALS array in StudioPage.tsx and set SHOW_TESTIMONIALS_PLACEHOLDER = true to ship.
              </p>
            </div>

            <div className="mx-auto max-w-3xl divide-y" style={{ borderColor: 'var(--ba-studio-border)' }}>
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="py-12 first:pt-0">
                  {/* Large open-quote glyph */}
                  <span
                    className="font-serif text-7xl leading-none select-none"
                    style={{ color: 'var(--ba-studio-text-faint)' }}
                    aria-hidden
                  >
                    "
                  </span>
                  <p
                    className="-mt-2 font-serif text-xl font-light italic leading-relaxed md:text-2xl"
                    style={{ color: 'var(--ba-studio-text)' }}
                  >
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div
                      className="h-px w-8 shrink-0"
                      style={{ backgroundColor: 'var(--ba-studio-border)' }}
                      aria-hidden
                    />
                    <div>
                      <p
                        className="text-[11px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: 'var(--ba-studio-text-muted)' }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-[11px] font-light"
                        style={{ color: 'var(--ba-studio-text-faint)' }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section className="relative z-10 px-4 pb-24 pt-12 sm:px-6 md:pb-32 md:pt-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="font-serif text-4xl font-normal md:text-5xl"
              style={{ color: 'var(--ba-studio-text)' }}
            >
              Ready when you are.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <InquiryButton />
              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ba-studio-border)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--ba-studio-text-muted)] transition-colors hover:border-[var(--ba-studio-text-muted)] hover:text-[var(--ba-studio-text)]"
              >
                {/* Instagram icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </section>

      </main>

      <StudioFooter />
    </div>
  );
};

export default StudioPage;
