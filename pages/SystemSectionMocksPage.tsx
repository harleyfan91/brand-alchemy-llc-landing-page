import React, { useState } from 'react';
import AlchemyBackground from '../components/AlchemyBackground';
import SystemSectionHeroBand from '../components/SystemSectionHeroBand';
import SystemTextStepTrack from '../components/SystemTextStepTrack';
import { SYSTEM_STEPS as BASE_STEPS } from '../content/systemSection';
import type { SystemSectionImageTreatment } from '../content/systemSection';
import {
  SystemStepTrack,
  SystemStepVisualPanel,
  type SystemStep as VisualStep,
} from '../components/SystemStepVisuals';

type Step = VisualStep;

const STEPS: Step[] = BASE_STEPS.map((step, i) => ({
  ...step,
  watermarkSrc:
    i === 0 ? '/product-card-watermarks/identity-kit-foundation.png' : '/product-card-watermarks/guides-kits-stack.png',
  vignette: (['brand', 'listing', 'post'] as const)[i],
}));

const VARIANTS = [
  {
    id: 'a',
    label: 'A — Zigzag + vignette panel',
    note: 'Keeps current scroll rhythm. Replaces the giant number with a small artifact preview; step index becomes an eyebrow.',
  },
  {
    id: 'e',
    label: 'E — Image band + text steps',
    note: 'Shipped on homepage. Full-bleed photo carries the intro; three text steps below (Studio / Identity Kit pattern).',
  },
  {
    id: 'd',
    label: 'D — Card-contained',
    note: 'Earlier direction — step number, vignette, title, and copy inside each card.',
  },
  {
    id: 'b',
    label: 'B — Horizontal step rail',
    note: 'Three equal columns on desktop with a connecting line. Faster scan, less vertical scroll.',
  },
  {
    id: 'c',
    label: 'C — Mini product cards',
    note: 'Reuses Products card language (watermark, border, shadow) at step scale. Strongest visual continuity with the catalog below.',
  },
] as const;

const SectionIntro: React.FC = () => (
  <div className="ba-section-stack--default mx-auto mb-8 max-w-4xl text-center">
    <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">System</h2>
    <h3 className="ba-section-display-title font-serif text-4xl font-normal text-gray-900 md:text-5xl">
      Promote your brand like the pros.
    </h3>
    <p className="ba-section-support text-sm font-light leading-relaxed text-gray-500 md:text-base">
      Most cafés, restaurants, and salons already do something worth talking about. What&apos;s missing is a consistent
      way to show it — a brand voice, a strong listing, and tools that do not require a marketing background.
    </p>
  </div>
);

const WatermarkLayer: React.FC<{ src: string; strong?: boolean }> = ({ src, strong = false }) => (
  <img
    src={src}
    alt=""
    aria-hidden
    className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-left-top mix-blend-multiply ${
      strong ? 'opacity-[0.18] grayscale contrast-150 brightness-90' : 'opacity-[0.12] grayscale contrast-170 brightness-75'
    }`}
  />
);

type VignetteDensity = 'default' | 'compact';

const VisualPanel: React.FC<{
  step: Step;
  className?: string;
  strongWatermark?: boolean;
  density?: VignetteDensity;
  muted?: boolean;
}> = (props) => <SystemStepVisualPanel {...props} />;

const VariantA: React.FC = () => (
  <ol className="mx-auto max-w-5xl">
    {STEPS.map((step, i) => {
      const reverse = i % 2 === 1;
      return (
        <li key={step.step} className="py-5 md:py-6">
          <div className="grid items-center gap-5 md:grid-cols-12 md:gap-10">
            <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
              <VisualPanel step={step} />
            </div>
            <div className={`md:col-span-7 ${reverse ? 'md:order-1 md:text-right' : ''}`}>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gray-500">{step.step}</p>
              <h5 className="mt-2 font-serif text-2xl font-normal text-gray-900 md:text-3xl">{step.title}</h5>
              <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 md:text-base">{step.description}</p>
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);

const VariantB: React.FC = () => (
  <div className="mx-auto max-w-6xl">
    <div className="relative hidden md:block">
      <div className="absolute left-[16.666%] right-[16.666%] top-[4.75rem] h-px bg-gray-200" aria-hidden />
    </div>
    <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
      {STEPS.map((step) => (
        <li key={step.step} className="relative text-center">
          <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-500">
            {step.step}
          </div>
          <VisualPanel step={step} className="mx-auto max-w-[15rem]" />
          <h5 className="mt-5 font-serif text-xl font-normal text-gray-900 md:text-2xl">{step.title}</h5>
          <p className="mt-3 text-sm font-light leading-relaxed text-gray-500">{step.description}</p>
        </li>
      ))}
    </ol>
  </div>
);

const VariantC: React.FC = () => (
  <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
    {STEPS.map((step) => (
      <li key={step.step}>
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.14)]">
          <WatermarkLayer src={step.watermarkSrc} strong />
          <div className="pointer-events-none absolute inset-0 bg-black/[0.015]" aria-hidden />
          <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-gray-500">{step.step}</span>
            <div className="relative mt-4 aspect-[5/3] overflow-hidden rounded-xl border border-gray-100 bg-white/70">
              <VisualPanel step={step} className="absolute inset-0 aspect-auto rounded-none border-0" />
            </div>
            <h5 className="mt-5 font-serif text-xl font-normal text-gray-900">{step.title}</h5>
            <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-gray-500">{step.description}</p>
          </div>
        </div>
      </li>
    ))}
  </ol>
);

const CurrentBaseline: React.FC = () => (
  <ol className="mx-auto max-w-5xl opacity-80">
    {STEPS.map((step, i) => {
      const reverse = i % 2 === 1;
      return (
        <li key={step.step} className="py-5 md:py-4">
          <div className="grid items-center gap-4 md:grid-cols-12 md:gap-10">
            <div className={`md:col-span-5 ${reverse ? 'text-right md:order-2' : ''}`}>
              <p className="font-sans text-[5rem] font-bold leading-none text-gray-200 md:text-[7rem]">{step.step}</p>
            </div>
            <div className={`md:col-span-7 ${reverse ? 'text-right md:order-1' : ''}`}>
              <h5 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">{step.title}</h5>
              <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 md:text-base">{step.description}</p>
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);

const SystemSectionMocksPage: React.FC = () => {
  const [active, setActive] = useState<(typeof VARIANTS)[number]['id']>('e');
  const [imageTreatment, setImageTreatment] = useState<SystemSectionImageTreatment>('muted');

  return (
    <>
      <AlchemyBackground />
      <main className="relative z-20 flex-grow pb-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Internal preview</p>
            <h1 className="mt-3 font-serif text-3xl font-normal text-gray-900 md:text-4xl">System section — visual mocks</h1>
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-500 md:text-base">
              Five layout directions. Tab E matches the live homepage.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {VARIANTS.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setActive(variant.id)}
                className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  active === variant.id ? 'bg-black text-white' : 'border border-gray-200 bg-white text-gray-500 hover:text-gray-900'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>

          <section className="relative overflow-visible rounded-3xl border border-gray-100 bg-white/60 py-8 backdrop-blur-[3px] md:py-12">
            <div className="mb-6 px-4 text-center sm:px-6 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400">
                {VARIANTS.find((v) => v.id === active)?.label}
              </p>
              <p className="mx-auto mt-2 max-w-2xl text-sm font-light text-gray-500">
                {VARIANTS.find((v) => v.id === active)?.note}
              </p>
            </div>
            {active !== 'e' ? <SectionIntro /> : null}
            {active === 'a' ? <VariantA /> : null}
            {active === 'e' ? (
              <div className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
                <div className="mb-4 flex flex-wrap justify-center gap-2 px-4 sm:px-6 lg:px-8">
                  {(['muted', 'full'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setImageTreatment(mode)}
                      className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        imageTreatment === mode
                          ? 'bg-black text-white'
                          : 'border border-gray-200 bg-white text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Image: {mode}
                    </button>
                  ))}
                </div>
                <SystemSectionHeroBand treatment={imageTreatment} />
                <div className="px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
                  <SystemTextStepTrack />
                </div>
              </div>
            ) : null}
            {active === 'd' ? <SystemStepTrack /> : null}
            {active === 'b' ? <VariantB /> : null}
            {active === 'c' ? <VariantC /> : null}
          </section>

          <section className="mt-16">
            <div className="mb-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400">Earlier — text intro + steps</p>
              <p className="mt-2 text-sm font-light text-gray-500">Section header above the steps, before the image band.</p>
            </div>
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white/40 py-8 md:py-12">
              <SectionIntro />
              <CurrentBaseline />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SystemSectionMocksPage;
