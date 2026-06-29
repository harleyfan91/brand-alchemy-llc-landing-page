import React from 'react';
import { SYSTEM_STEPS as BASE_STEPS, type SystemStep as BaseSystemStep } from '../content/systemSection';

export type SystemStep = BaseSystemStep & {
  watermarkSrc: string;
  vignette: 'brand' | 'listing' | 'post';
};

export const SYSTEM_STEPS: SystemStep[] = BASE_STEPS.map((step, i) => ({
  ...step,
  watermarkSrc:
    i === 0 ? '/product-card-watermarks/identity-kit-foundation.png' : '/product-card-watermarks/guides-kits-stack.png',
  vignette: (['brand', 'listing', 'post'] as const)[i],
}));

type VignetteDensity = 'default' | 'compact';

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

const BrandVignette: React.FC<{ density?: VignetteDensity }> = ({ density = 'default' }) => {
  const compact = density === 'compact';
  return (
    <div className={`relative z-10 flex h-full flex-col justify-between ${compact ? 'p-2 md:p-3' : 'p-4 md:p-5'}`}>
      <div>
        <p className={`font-bold uppercase tracking-[0.2em] text-gray-400 ${compact ? 'text-[7px]' : 'text-[9px]'}`}>
          Identity Kit
        </p>
        <p className={`font-serif text-gray-900 ${compact ? 'mt-1 text-[10px] md:text-xs' : 'mt-2 text-sm md:text-base'}`}>
          Your brand voice
        </p>
        {!compact ? (
          <div className="mt-3 space-y-1.5">
            <div className="h-1 w-16 rounded-full bg-gray-200" />
            <div className="h-1 w-24 rounded-full bg-gray-100" />
            <div className="h-1 w-20 rounded-full bg-gray-100" />
          </div>
        ) : (
          <div className="mt-1.5 space-y-1">
            <div className="h-0.5 w-10 rounded-full bg-gray-200" />
            <div className="h-0.5 w-14 rounded-full bg-gray-100" />
          </div>
        )}
      </div>
      <div className={`flex items-center gap-1.5 ${compact ? 'mt-2' : 'mt-4 gap-2'}`}>
        <span className={`rounded-full bg-gray-900 ${compact ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
        <span className={`rounded-full bg-gray-400 ${compact ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
        <span className={`rounded-full bg-gray-200 ${compact ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
        {!compact ? (
          <span className="ml-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">Palette</span>
        ) : null}
      </div>
    </div>
  );
};

const ListingVignette: React.FC<{ density?: VignetteDensity }> = ({ density = 'default' }) => {
  const compact = density === 'compact';
  return (
    <div className={`relative z-10 flex h-full flex-col justify-center ${compact ? 'p-2 md:p-3' : 'p-4 md:p-5'}`}>
      <div
        className={`rounded-xl border border-gray-100 bg-white/90 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)] ${compact ? 'p-1.5 md:p-2' : 'p-3'}`}
      >
        <div className={`flex items-start ${compact ? 'gap-1.5' : 'gap-2.5'}`}>
          <div
            className={`flex shrink-0 items-center justify-center rounded-lg bg-[#f0f4ff] font-bold text-[#4285F4] ${
              compact ? 'h-5 w-5 text-[8px]' : 'h-8 w-8 text-[10px]'
            }`}
          >
            G
          </div>
          <div className="min-w-0 flex-1">
            <p className={`truncate font-serif text-gray-900 ${compact ? 'text-[9px]' : 'text-xs'}`}>Harbor Café</p>
            <p className={`text-gray-500 ${compact ? 'mt-0 text-[7px]' : 'mt-0.5 text-[10px]'}`}>
              {compact ? '4.8 · Open' : '4.8 · Café · Open now'}
            </p>
            {!compact ? (
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {!compact ? (
        <p className="mt-3 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">Local launch kit</p>
      ) : null}
    </div>
  );
};

const PostVignette: React.FC<{ density?: VignetteDensity; muted?: boolean }> = ({
  density = 'default',
  muted = false,
}) => {
  const compact = density === 'compact';
  return (
    <div
      className={`relative z-10 flex h-full items-center justify-center ${compact ? 'p-2 md:p-3' : 'p-4 md:p-5'} ${muted ? 'opacity-70' : ''}`}
    >
      <div
        className={`w-full overflow-hidden rounded-xl border border-gray-100 bg-white/90 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)] ${
          compact ? 'max-w-[3.25rem] md:max-w-[7rem]' : 'max-w-[9.5rem]'
        }`}
      >
        <div className={`bg-gray-100 ${compact ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
          <div className="flex h-full flex-col justify-end bg-gradient-to-t from-black/25 to-transparent p-1.5 md:p-2.5">
            <p className={`font-light leading-snug text-white ${compact ? 'text-[6px] md:text-[8px]' : 'text-[9px]'}`}>
              {compact ? 'Open this week' : 'Open this week — fresh pastries daily.'}
            </p>
          </div>
        </div>
        {!compact ? (
          <div className="border-t border-gray-100 px-2.5 py-2">
            <div className="h-1 w-14 rounded-full bg-gray-200" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const StepVignette: React.FC<{ kind: SystemStep['vignette']; density?: VignetteDensity; muted?: boolean }> = ({
  kind,
  density = 'default',
  muted = false,
}) => {
  if (kind === 'brand') return <BrandVignette density={density} />;
  if (kind === 'listing') return <ListingVignette density={density} />;
  return <PostVignette density={density} muted={muted} />;
};

export const SystemStepVisualPanel: React.FC<{
  step: SystemStep;
  className?: string;
  strongWatermark?: boolean;
  density?: VignetteDensity;
  muted?: boolean;
}> = ({ step, className = '', strongWatermark = false, density = 'default', muted = false }) => {
  const compact = density === 'compact';
  const aspectClass = compact ? 'aspect-square md:aspect-[16/10]' : 'aspect-[4/3] md:aspect-[5/4]';
  const radiusClass = compact ? 'rounded-xl md:rounded-2xl' : 'rounded-2xl';

  return (
    <div className={`relative overflow-hidden border border-gray-100 bg-white/80 ${aspectClass} ${radiusClass} ${className}`.trim()}>
      <WatermarkLayer src={step.watermarkSrc} strong={strongWatermark} />
      <div className="pointer-events-none absolute inset-0 bg-slate-500/[0.03]" aria-hidden />
      <StepVignette kind={step.vignette} density={density} muted={muted} />
    </div>
  );
};

type SystemStepTrackProps = {
  itemClassName?: string;
  motionStyle?: (index: number) => React.CSSProperties;
};

/** Card-contained step track — vignette + copy live inside each step card; step 02 text mirrors right. */
export const SystemStepTrack: React.FC<SystemStepTrackProps> = ({
  itemClassName = '',
  motionStyle,
}) => (
  <ol className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
    {SYSTEM_STEPS.map((step, i) => {
      const reverse = i % 2 === 1;
      return (
        <li key={step.step} className={itemClassName.trim()} style={motionStyle?.(i)}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.14)]">
            <WatermarkLayer src={step.watermarkSrc} strong />
            <div className="pointer-events-none absolute inset-0 bg-black/[0.015]" aria-hidden />
            <div className={`relative z-10 flex flex-1 flex-col p-5 md:p-6 ${reverse ? 'text-right' : ''}`}>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-gray-500">{step.step}</span>
              <div className="relative mt-4 aspect-[5/3] overflow-hidden rounded-xl border border-gray-100 bg-white/70">
                <SystemStepVisualPanel
                  step={step}
                  muted={step.vignette === 'post'}
                  className="absolute inset-0 aspect-auto rounded-none border-0"
                />
              </div>
              <h5 className="mt-5 font-serif text-xl font-normal text-gray-900">{step.title}</h5>
              <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-gray-500">{step.description}</p>
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);
