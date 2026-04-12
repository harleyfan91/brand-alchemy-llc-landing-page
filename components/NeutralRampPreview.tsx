import React, { useState } from 'react';

/** Canonical `--ba-gray-*` steps (labels = Tailwind step; fill = live token from brand-tokens.css). */
const GRAY_SWATCHES: readonly { step: string; ring?: boolean }[] = [
  { step: '50', ring: true },
  { step: '100' },
  { step: '200' },
  { step: '300' },
  { step: '400' },
  { step: '500' },
  { step: '600' },
  { step: '700' },
  { step: '800' },
  { step: '900' },
];

/**
 * Development-only: read-only **canonical cool gray ramp** (production tokens).
 * Mount from `App.tsx` only inside `import.meta.env.DEV` — do not render in production builds.
 * No page toggle — Tailwind `gray-*` utilities already map to `var(--ba-gray-*)` in index.html.
 */
const NeutralRampPreview: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-4 right-4 z-[90] max-w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm"
      role="region"
      aria-label="Canonical gray tokens (development only)"
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900"
      >
        <span>Gray ramp (tokens)</span>
        <span className="text-gray-400" aria-hidden>
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded ? (
        <div className="border-t border-gray-100 px-3 pb-3 pt-1">
          <p className="mb-2 text-[11px] leading-snug text-gray-500">
            Live <span className="font-mono text-gray-600">--ba-gray-*</span> values. Tailwind utilities use these via{' '}
            <span className="font-mono text-gray-600">tailwind.config</span> in index.html — no separate preview layer.
          </p>

          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400">50–900</p>
          <div className="mb-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {GRAY_SWATCHES.map(({ step, ring }) => (
              <div key={step} className="min-w-0 text-center">
                <div
                  className={`mx-auto mb-0.5 h-8 w-full max-w-[2.5rem] rounded shadow-inner ${
                    ring ? 'ring-1 ring-inset ring-gray-300' : ''
                  }`}
                  style={{ backgroundColor: `var(--ba-gray-${step})` }}
                  title={`gray-${step}`}
                />
                <span className="block font-mono text-[8px] font-medium text-gray-500">{step}</span>
              </div>
            ))}
          </div>

          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400">On white (sample)</p>
          <div className="rounded-md border border-gray-200 bg-white p-2.5">
            <div className="mb-2 rounded border border-gray-200 bg-gray-50 px-2 py-1.5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Eyebrow</p>
              <p className="font-serif text-sm font-normal text-gray-900">Card title</p>
              <p className="mt-0.5 text-[11px] font-light leading-snug text-gray-500">
                Supporting line uses production utilities (gray-500 body).
              </p>
            </div>
            <span className="inline-flex rounded-full bg-black px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
              Primary
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NeutralRampPreview;
