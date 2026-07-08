import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '../components/CheckIcon';
import ProFeatureSparkIcon from '../components/ProFeatureSparkIcon';
import {
  IDENTITY_KIT_CTA_LABEL,
  IDENTITY_KIT_FAQS,
  IDENTITY_KIT_FINAL_CTA,
  IDENTITY_KIT_FOR_YOU,
  IDENTITY_KIT_FOR_YOU_SECTION,
  IDENTITY_KIT_FOUNDATION_DELIVERABLES,
  IDENTITY_KIT_HERO_BAND_IMAGE,
  IDENTITY_KIT_HERO_BAND_INDUSTRIES,
  IDENTITY_KIT_HERO_SUBLINE,
  IDENTITY_KIT_HOW_SECTION,
  IDENTITY_KIT_INSIDE_SECTION,
  IDENTITY_KIT_MESSAGING_DELIVERABLES,
  IDENTITY_KIT_MORE_THAN_TEMPLATES,
  IDENTITY_KIT_NOT_FOR_YOU,
  IDENTITY_KIT_NOT_FOR_YOU_SECTION,
  IDENTITY_KIT_OUTCOMES,
  IDENTITY_KIT_OUTCOMES_SECTION,
  IDENTITY_KIT_PAIN_HEADING,
  IDENTITY_KIT_PAIN_POINTS,
  IDENTITY_KIT_PRICE_LINE,
  IDENTITY_KIT_PROCESS_STEPS,
  IDENTITY_KIT_PREVIEW_ROWS,
  IDENTITY_KIT_PREVIEW_MOSAIC,
  IDENTITY_KIT_TESTIMONIALS,
  IDENTITY_KIT_TESTIMONIALS_SECTION,
  getIdentityKitPreviewScreenshotForSlot,
  getIdentityKitPreviewSlot,
  type IdentityKitPreviewSlotRole,
  IDENTITY_KIT_VOICE_EXAMPLES,
  IDENTITY_KIT_VOICE_SECTION,
  IDENTITY_KIT_WEEKLY_SECTION,
  IDENTITY_KIT_WEEKLY_USES,
  type IdentityKitVoiceExample,
} from '../content/identityKit';
import { getIdentityKitStartUrl, isExternalToCurrentOrigin } from '../utils/identityKitUrls';

const checkoutUrl = getIdentityKitStartUrl();
const checkoutOpensNewTab = isExternalToCurrentOrigin(checkoutUrl);

const primaryCtaClassName =
  'inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:px-10 sm:py-4 sm:text-sm';

const heroBandImageClassName = 'h-full w-full object-cover object-center';

const IdentityKitCta: React.FC<{ className?: string; children: React.ReactNode; variant?: 'primary' | 'inverse' }> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  const inverseClassName =
    'inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors hover:bg-gray-100 sm:px-10 sm:py-4 sm:text-sm';
  const combined = `${variant === 'inverse' ? inverseClassName : primaryCtaClassName} ${className}`.trim();

  if (checkoutOpensNewTab) {
    return (
      <a href={checkoutUrl} className={combined} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a href={checkoutUrl} className={combined}>
      {children}
    </a>
  );
};

const FullBleedBand: React.FC<{ children: React.ReactNode; className?: string; compact?: boolean }> = ({
  children,
  className = '',
  compact = false,
}) => (
  <div className={`relative mt-16 w-screen left-1/2 -translate-x-1/2 md:mt-20 ${className}`.trim()}>
    <div className={`bg-gray-50 ${compact ? 'py-8 md:py-10' : 'py-12 md:py-16'}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  </div>
);

const SectionIntro: React.FC<{
  eyebrow: string;
  title: string;
  support?: string;
  align?: 'left' | 'center';
  className?: string;
}> = ({ eyebrow, title, support, align = 'left', className = '' }) => (
  <div
    className={`ba-section-stack--default max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`.trim()}
  >
    <span className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{eyebrow}</span>
    <h2 className="ba-section-display-title font-serif text-3xl font-normal text-gray-900 md:text-4xl">{title}</h2>
    {support ? (
      <p className="ba-section-support text-sm font-light leading-relaxed text-gray-600 sm:text-base">{support}</p>
    ) : null}
  </div>
);

/** Running-bond brick rows — slot numbers from `IDENTITY_KIT_PREVIEW_SLOTS`. */
const BRICK_TILE_CLASS = 'w-[8.75rem] shrink-0 md:w-[9.5rem]';
const BRICK_TILE_GAP_CLASS = 'gap-3 md:gap-4';
const BRICK_ROWS_GAP_CLASS = 'gap-5 md:gap-7';
const BRICK_ROW_OFFSET_CLASS = 'pl-[4.75rem] md:pl-[5.25rem]';
const KIT_PREVIEW_SHOW_SLOT_NUMBERS = import.meta.env.DEV;
const BRICK_MOSAIC_ROTATE_CLASS = 'origin-center rotate-[35deg]';
/** Positions rotated grid so focus slot (~6) sits near the clip center. */
const BRICK_MOSAIC_POSITION_CLASS = '-translate-y-[3.25rem] translate-x-7';

/** Role-based opacity — matches settled clip tiers for featured content. */
const brickTileOpacityByRole = (role: IdentityKitPreviewSlotRole, devMode: boolean): number => {
  switch (role) {
    case 'focus':
      return 1;
    case 'secondary':
      return 0.88;
    case 'corner':
      return 0.58;
    case 'hidden':
      return devMode ? 0.12 : 0;
  }
};

const brickTileImagePositionClass = (exposure?: 'full' | 'top' | 'bottom') => {
  if (exposure === 'top') return 'object-top';
  if (exposure === 'bottom') return 'object-bottom';
  return 'object-center';
};

const brickTileDevBackgroundClass = (role: IdentityKitPreviewSlotRole) => {
  switch (role) {
    case 'focus':
      return 'bg-black';
    case 'secondary':
      return 'bg-pink-400';
    case 'corner':
      return 'bg-blue-500';
    case 'hidden':
      return 'bg-gray-100';
  }
};

const brickTileDevNumberClass = (role: IdentityKitPreviewSlotRole) => {
  switch (role) {
    case 'focus':
      return 'text-white';
    case 'secondary':
      return 'text-white';
    case 'corner':
      return 'text-white';
    case 'hidden':
      return 'text-gray-300';
  }
};

const BrickMosaicFade: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/90 via-white/40 to-transparent md:h-14" />
    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 via-white/45 to-transparent md:h-20" />
  </div>
);

const KitPreviewMosaic: React.FC = () => {
  const renderBrickField = (
    rows: typeof IDENTITY_KIT_PREVIEW_ROWS,
    maxHeightClass: string,
    positionClass: string,
    topPullClass: string,
  ) => (
    <div className={`relative w-full overflow-hidden ${maxHeightClass}`} aria-label="Sample pages from the Identity Kit">
      <div className={`flex justify-center ${positionClass} ${topPullClass}`}>
        <div className={`relative flex flex-col items-center ${BRICK_ROWS_GAP_CLASS} ${BRICK_MOSAIC_ROTATE_CLASS}`}>
          {rows.map((row, rowIndex) => (
            <div
              key={`brick-row-${rowIndex}`}
              className={`flex w-max max-w-none ${BRICK_TILE_GAP_CLASS} ${row.offset ? BRICK_ROW_OFFSET_CLASS : ''}`}
            >
              {row.slots.map((slotNumber) => {
                const slot = getIdentityKitPreviewSlot(slotNumber);
                const screenshot = getIdentityKitPreviewScreenshotForSlot(slotNumber);
                const role = slot?.role ?? 'hidden';

                return (
                  <figure
                    key={`slot-${slotNumber}`}
                    className={BRICK_TILE_CLASS}
                    style={{ opacity: brickTileOpacityByRole(role, KIT_PREVIEW_SHOW_SLOT_NUMBERS) }}
                    title={
                      slot
                        ? `Slot ${slotNumber} · ${role}${slot.exposure ? ` (${slot.exposure})` : ''} → ${screenshot?.label ?? 'unmapped'}`
                        : undefined
                    }
                  >
                    <div className="border border-gray-200 bg-white">
                      <div
                        className={`flex aspect-[8.5/11] w-full items-center justify-center overflow-hidden ${
                          KIT_PREVIEW_SHOW_SLOT_NUMBERS ? brickTileDevBackgroundClass(role) : ''
                        }`}
                      >
                        {KIT_PREVIEW_SHOW_SLOT_NUMBERS ? (
                          <span
                            className={`font-serif text-3xl font-normal md:text-4xl ${brickTileDevNumberClass(role)}`}
                          >
                            {slotNumber}
                          </span>
                        ) : screenshot && role !== 'hidden' ? (
                          <img
                            src={screenshot.imageUrl}
                            alt={screenshot.imageAlt}
                            className={`h-full w-full object-cover ${brickTileImagePositionClass(slot?.exposure)}`}
                            loading={role === 'focus' ? 'eager' : 'lazy'}
                          />
                        ) : null}
                      </div>
                    </div>
                    <figcaption className="sr-only">
                      Slot {slotNumber}
                      {screenshot ? `: ${screenshot.label}` : ''}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <BrickMosaicFade />
    </div>
  );

  return (
    <div className="relative mt-6 -mx-4 sm:-mx-6 md:mt-8">
      {renderBrickField(IDENTITY_KIT_PREVIEW_ROWS, 'max-h-[21rem]', BRICK_MOSAIC_POSITION_CLASS, '-mt-14')}
    </div>
  );
};

/** Kit post mock (after) + generic copy bubble (before). */
const voiceCompareOverlapClass = (index: number) => {
  if (index === 0) return 'md:relative md:z-30';
  if (index === 1) return 'md:relative md:-ml-8 md:translate-y-6 md:z-20 lg:-ml-10';
  return 'md:relative md:-ml-8 md:translate-y-2 md:z-10 lg:-ml-10 lg:translate-y-5';
};

const VoiceComparePanel: React.FC<{
  example: IdentityKitVoiceExample;
  index: number;
  className?: string;
}> = ({ example, index, className = '' }) => {
  const isOdd = index % 2 === 1;
  const rotateClass = isOdd ? 'rotate-[2.5deg]' : '-rotate-[2deg]';
  const bubblePositionClass = isOdd ? 'right-0 top-3 md:-right-2 md:top-5' : 'left-0 top-3 md:-left-2 md:top-5';

  return (
    <article
      className={`relative w-[11.25rem] max-w-[78vw] shrink-0 snap-center sm:w-[12rem] md:w-[12.5rem] ${rotateClass} ${className}`.trim()}
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
        {example.industry}
      </p>

      <div className="relative mt-3">
        <div
          className={`pointer-events-none absolute z-20 max-w-[9.5rem] rounded-xl border border-gray-200 bg-white/95 p-2.5 backdrop-blur-sm sm:max-w-[10rem] ${bubblePositionClass}`}
          aria-hidden
        >
          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-gray-400">Generic template</p>
          <p className="mt-1 font-serif text-[10px] leading-snug text-gray-500 line-through decoration-gray-300 sm:text-[11px]">
            {example.generic}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.2rem] border border-gray-200 bg-gray-100 sm:rounded-[1.35rem]">
          <div className="h-[15.5rem] w-full overflow-hidden sm:h-[17rem]">
            <img
              src={example.kitMockup.placeholderImageUrl}
              alt={example.kitMockup.placeholderImageAlt}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <p className="sr-only">
        Generic: {example.generic}. From your kit: {example.kit}
      </p>
    </article>
  );
};

const VoiceSwipeHint: React.FC = () => (
  <div className="mt-4 flex justify-center text-gray-300 md:hidden" aria-hidden>
    <svg width="52" height="14" viewBox="0 0 52 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7h7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M4 4L1 7l3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="7" r="1.25" fill="currentColor" opacity="0.45" />
      <circle cx="26" cy="7" r="1.25" fill="currentColor" opacity="0.65" />
      <circle cx="30" cy="7" r="1.25" fill="currentColor" opacity="0.45" />
      <path d="M44 7h7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M48 4l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const VoiceCompareGallery: React.FC = () => (
  <div className="relative mt-10 md:mt-12">
    <div
      className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50%-5.625rem)] pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:justify-center md:gap-0 md:overflow-visible md:px-0"
      aria-label="Before and after post examples. Swipe sideways for more."
    >
      {IDENTITY_KIT_VOICE_EXAMPLES.map((example, index) => (
        <VoiceComparePanel
          key={example.industry}
          example={example}
          index={index}
          className={voiceCompareOverlapClass(index)}
        />
      ))}
    </div>
    <VoiceSwipeHint />
  </div>
);

const TestimonialsSection: React.FC = () => (
  <section className="mt-16 border-t border-gray-100 pt-16 md:mt-20 md:pt-20" aria-label="Customer testimonials">
    <SectionIntro
      eyebrow={IDENTITY_KIT_TESTIMONIALS_SECTION.eyebrow}
      title={IDENTITY_KIT_TESTIMONIALS_SECTION.title}
      align="center"
      className="mx-auto"
    />
    <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
      {IDENTITY_KIT_TESTIMONIALS.map((testimonial) => (
        <blockquote key={testimonial.name} className="flex h-full flex-col rounded-2xl bg-gray-50 px-6 py-7 sm:px-7 sm:py-8">
          <p className="font-serif text-lg font-normal leading-relaxed text-gray-900">&ldquo;{testimonial.quote}&rdquo;</p>
          <footer className="mt-6 border-t border-gray-200/80 pt-5">
            <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
            <p className="mt-1 text-sm font-light text-gray-600">{testimonial.business}</p>
            <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">{testimonial.location}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);

const IdentityKitPage: React.FC = () => {
  return (
    <main className="relative z-20 flex-grow scroll-mt-20 bg-white pb-12 pt-20 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-5">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 md:text-xs md:tracking-[0.2em]">
            <li>
              <Link to="/" className="text-gray-500 transition-colors hover:text-gray-900">
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none text-gray-300">
              /
            </li>
            <li className="text-gray-900" aria-current="page">
              Identity Kit
            </li>
          </ol>
        </nav>

        <section className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-3xl font-bold uppercase leading-[1.02] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Stop guessing how your business
            <span className="mt-1 block text-gray-500">should sound and look</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
            {IDENTITY_KIT_HERO_SUBLINE}
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            {IDENTITY_KIT_PRICE_LINE}
          </p>
          <div className="mt-6 flex justify-center">
            <IdentityKitCta>{IDENTITY_KIT_CTA_LABEL}</IdentityKitCta>
          </div>
        </section>
      </div>

      <div className="relative mt-12 w-screen left-1/2 -translate-x-1/2 md:mt-14">
        <div className="relative min-h-[11rem] overflow-hidden sm:min-h-[14rem] md:min-h-[18rem]">
          <img
            src={IDENTITY_KIT_HERO_BAND_IMAGE.imageUrl}
            alt={IDENTITY_KIT_HERO_BAND_IMAGE.imageAlt}
            className={`absolute inset-0 ${heroBandImageClassName}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" aria-hidden />
          <p className="absolute bottom-5 left-1/2 flex max-w-[90vw] -translate-x-1/2 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 sm:bottom-6 sm:gap-x-3 sm:text-xs">
            {IDENTITY_KIT_HERO_BAND_INDUSTRIES.map((industry, i) => (
              <React.Fragment key={industry}>
                {i > 0 ? (
                  <span className="text-white/40" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span>{industry}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl border-t border-gray-100 pt-16 md:pt-20">
          <SectionIntro
            eyebrow="Sound familiar?"
            title={IDENTITY_KIT_PAIN_HEADING}
            align="center"
            className="mx-auto"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {IDENTITY_KIT_PAIN_POINTS.map((point) => (
              <li
                key={point.title}
                className="rounded-2xl bg-gray-50 px-5 py-6 text-center sm:px-6 sm:py-7 sm:text-left"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{point.title}</p>
                <p className="mt-3 font-serif text-lg font-normal leading-snug text-gray-900">{point.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-gray-100 pt-16 md:mt-20 md:pt-20" aria-labelledby="identity-kit-voice-heading">
          <SectionIntro
            eyebrow={IDENTITY_KIT_VOICE_SECTION.eyebrow}
            title={IDENTITY_KIT_VOICE_SECTION.title}
          />
          <VoiceCompareGallery />
        </section>

        <TestimonialsSection />

        <section
          className="mt-16 grid gap-10 border-t border-gray-100 pt-16 md:mt-20 md:pt-20 lg:grid-cols-2 lg:gap-16"
          aria-labelledby="identity-kit-weekly-heading"
        >
          <SectionIntro
            eyebrow={IDENTITY_KIT_WEEKLY_SECTION.eyebrow}
            title={IDENTITY_KIT_WEEKLY_SECTION.title}
            support={IDENTITY_KIT_WEEKLY_SECTION.support}
          />
          <ul className="min-w-0 divide-y divide-gray-100 border-t border-gray-100">
            {IDENTITY_KIT_WEEKLY_USES.map((item) => (
              <li key={item} className="py-4">
                <p className="font-serif text-lg font-normal text-gray-900">{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FullBleedBand compact>
        <section aria-labelledby="identity-kit-how-heading">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">How it works</span>
            <h2 id="identity-kit-how-heading" className="mt-2 font-serif text-2xl font-normal text-gray-900 md:text-3xl">
              {IDENTITY_KIT_HOW_SECTION.title}
            </h2>
          </div>

          <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {IDENTITY_KIT_PROCESS_STEPS.map((step) => (
              <li key={step.step} className="text-center sm:text-left">
                <p className="font-sans text-3xl font-bold leading-none text-gray-200">{step.step}</p>
                <h3 className="mt-2 text-sm font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </FullBleedBand>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="mt-16 grid gap-12 border-t border-gray-100 pt-16 md:mt-20 md:gap-16 md:pt-20 lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0 overflow-visible">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{IDENTITY_KIT_INSIDE_SECTION.eyebrow}</h2>

            <KitPreviewMosaic />

            <h3 className="mt-10 font-serif text-3xl font-normal text-gray-900 md:mt-12 md:text-4xl">
              {IDENTITY_KIT_INSIDE_SECTION.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
              {IDENTITY_KIT_INSIDE_SECTION.summary}
            </p>

            <details className="mt-8 border-t border-gray-100 pt-4">
              <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.28em] text-gray-500 marker:hidden hover:text-gray-900">
                See everything included
              </summary>
              <ul className="mt-4 space-y-3">
                {IDENTITY_KIT_FOUNDATION_DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                      <CheckIcon size="md" />
                    </span>
                    <span className="text-sm font-light leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
                {IDENTITY_KIT_MESSAGING_DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                      <ProFeatureSparkIcon />
                    </span>
                    <span className="text-sm font-light leading-relaxed text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="lg:border-l lg:border-gray-100 lg:pl-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{IDENTITY_KIT_OUTCOMES_SECTION.eyebrow}</h2>
            <h3 className="mt-2 font-serif text-3xl font-normal text-gray-900 md:text-4xl">{IDENTITY_KIT_OUTCOMES_SECTION.title}</h3>
            <ul className="mt-6 space-y-4">
              {IDENTITY_KIT_OUTCOMES.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                    <CheckIcon size="md" />
                  </span>
                  <span className="text-sm font-light leading-relaxed text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 border-t border-gray-100 pt-16 md:mt-20 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              {IDENTITY_KIT_MORE_THAN_TEMPLATES.title}
            </span>
            <p className="mt-5 font-serif text-2xl font-normal leading-snug text-gray-900 md:text-3xl">
              {IDENTITY_KIT_MORE_THAN_TEMPLATES.body}
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-12 border-t border-gray-100 pt-16 md:mt-20 md:gap-16 md:pt-20 lg:grid-cols-2 lg:gap-20">
          <article>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{IDENTITY_KIT_FOR_YOU_SECTION.eyebrow}</h2>
            <h3 className="mt-2 font-serif text-3xl font-normal text-gray-900 md:text-4xl">{IDENTITY_KIT_FOR_YOU_SECTION.title}</h3>
            <ul className="mt-6 space-y-4">
              {IDENTITY_KIT_FOR_YOU.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                    <CheckIcon size="md" />
                  </span>
                  <span className="text-sm font-light leading-relaxed text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="lg:border-l lg:border-gray-100 lg:pl-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{IDENTITY_KIT_NOT_FOR_YOU_SECTION.eyebrow}</h2>
            <ul className="mt-6 space-y-4">
              {IDENTITY_KIT_NOT_FOR_YOU.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-gray-400" aria-hidden>
                    <CheckIcon size="md" />
                  </span>
                  <span className="text-sm font-light leading-relaxed text-gray-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-16 border-t border-gray-100 pt-16 md:mt-20 md:pt-20" aria-labelledby="identity-kit-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="identity-kit-faq-heading"
              className="text-center font-serif text-3xl font-normal text-gray-900 md:text-4xl"
            >
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
              {IDENTITY_KIT_FAQS.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="cursor-pointer list-none pr-8 font-serif text-base font-normal text-gray-900 marker:hidden md:text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm font-light leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-black bg-black px-6 py-10 text-white sm:px-10 sm:py-12 md:mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-normal md:text-4xl">{IDENTITY_KIT_FINAL_CTA.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-gray-200 sm:text-base">
              {IDENTITY_KIT_FINAL_CTA.support}
            </p>
            <div className="mt-8 flex justify-center">
              <IdentityKitCta variant="inverse">{IDENTITY_KIT_CTA_LABEL}</IdentityKitCta>
            </div>
            <p className="mt-4 text-xs font-light text-gray-400">
              Already have your brand sorted?{' '}
              <Link to="/local-kits" className="text-gray-300 underline-offset-2 hover:text-white hover:underline">
                See local kits
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IdentityKitPage;
