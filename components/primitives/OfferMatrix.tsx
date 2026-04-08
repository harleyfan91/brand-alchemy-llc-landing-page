import React, { useState } from 'react';
import CheckIcon from '../CheckIcon';
import type { DigitalProductMatrixColumn } from '../DigitalProductPage';

interface OfferMatrixProps {
  columns: DigitalProductMatrixColumn[];
  primaryHref: string;
  primaryLabel: string;
  openInNewTab: boolean;
}

const OfferMatrix: React.FC<OfferMatrixProps> = ({ columns, primaryHref, primaryLabel, openInNewTab }) => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const hasThreeOffers = columns.length === 3;

  return (
    <>
      <div className="rounded-xl border border-gray-200 md:hidden">
        {columns.map((column, idx) => {
          const isExpanded = selectedOffer === idx;
          return (
            <div key={column.name} className="border-b border-gray-200/80 last:border-b-0">
              <button
                type="button"
                role="radio"
                aria-expanded={isExpanded}
                aria-checked={isExpanded}
                onClick={() => setSelectedOffer((prev) => (prev === idx ? null : idx))}
                className={`group relative w-full px-3 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
                  isExpanded ? 'bg-gray-50/70' : 'bg-white hover:bg-gray-50/50'
                }`}
              >
                <div className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_2rem] items-center gap-x-2">
                  <span
                    className={`min-w-0 text-xs font-bold uppercase tracking-widest ${
                      isExpanded ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {column.name}
                  </span>
                  <span className="min-w-0 justify-self-end text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {column.teaser}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center justify-self-end rounded-full border border-gray-200/80 bg-white text-gray-500 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
              {isExpanded ? (
                <div className="border-t border-gray-100 bg-white px-3 pb-5 pt-2 sm:px-4">
                  <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                  <div className="mt-3 grid gap-2">
                    {column.options.slice(0, 2).map((option) => (
                      <div key={`${column.name}-${option.name}`} className="rounded-lg border border-gray-200 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{option.name}</span>
                          <span className="text-sm font-light text-gray-900">{option.price}</span>
                        </div>
                        <ul className="mt-2 space-y-1.5">
                          {option.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-xs font-light leading-relaxed text-gray-700">
                              <span aria-hidden className="mt-0.5 text-gray-500">
                                <CheckIcon size="sm" />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={primaryHref}
                          {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
                        >
                          {option.ctaLabel || primaryLabel}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        className={`hidden min-h-[min(320px,50vh)] md:flex md:flex-row ${hasThreeOffers ? '' : 'md:gap-4'}`}
        role="radiogroup"
        aria-label="Choose an offer"
      >
        {columns.map((column, idx) => {
          const expanded = selectedOffer === idx;
          const equal = selectedOffer === null;
          const slim = !equal && !expanded;
          const flexClass = equal ? 'flex-1 min-w-0' : expanded ? 'flex-[4] min-w-0' : 'flex-1 basis-0 min-w-[4.75rem]';

          return (
            <div
              key={column.name}
              className={`flex flex-col min-h-0 transition-[flex-grow,flex-shrink,flex-basis] duration-300 ease-out ${
                hasThreeOffers ? 'border-r border-gray-200/80 last:border-r-0' : ''
              } ${flexClass}`}
            >
              {equal ? (
                <button
                  type="button"
                  role="radio"
                  aria-checked={false}
                  aria-label={`${column.name} — show details`}
                  onClick={() => setSelectedOffer(idx)}
                  className="group relative flex flex-1 min-h-0 min-w-0 flex-col rounded-none border border-gray-200 bg-white text-left transition-all duration-200 hover:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                >
                  <div className="relative flex shrink-0 items-start justify-between gap-2 px-3 py-3 sm:px-4 sm:py-3.5">
                    <div className="flex min-w-0 flex-col gap-1 pr-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{column.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{column.teaser}</span>
                    </div>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm transition-all duration-200 group-hover:border-gray-300 group-hover:text-gray-900 group-hover:shadow-md">
                      <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-gray-100/90 px-3 pb-4 pt-2 sm:px-4 sm:pb-5">
                    <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                    <div className="mt-3 space-y-1.5" aria-hidden>
                      <div className="h-2.5 w-[85%] rounded bg-gray-200/90" />
                      <div className="h-2.5 w-[66%] rounded bg-gray-200/85" />
                      <div className="h-2.5 w-[78%] rounded bg-gray-200/85" />
                    </div>
                  </div>
                </button>
              ) : slim ? (
                <button
                  type="button"
                  role="radio"
                  aria-checked={false}
                  aria-label={`${column.name} — switch to this offer`}
                  onClick={() => setSelectedOffer(idx)}
                  className="relative flex flex-1 min-h-0 min-w-0 flex-col items-center justify-center gap-2 px-1.5 py-5 text-center text-gray-600 transition-all hover:bg-gray-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-gray-900">{column.name}</span>
                  <span className="text-[9px] font-bold uppercase leading-tight px-0.5 text-gray-400">{column.teaser}</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={expanded}
                    aria-label={`${column.name} — collapse`}
                    onClick={() => setSelectedOffer(null)}
                    className="relative flex w-full shrink-0 flex-col items-stretch gap-1 px-4 py-3 text-left transition-colors sm:py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{column.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{column.teaser}</span>
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gray-900" />
                  </button>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto border-t border-gray-100/90 px-4 pb-5 pt-2 sm:px-5 sm:pb-6">
                    <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                    <div className="mt-3 grid gap-2">
                      {column.options.slice(0, 2).map((option) => (
                        <div key={`${column.name}-${option.name}`} className="rounded-xl border border-gray-200 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{option.name}</span>
                            <span className="text-sm font-light text-gray-900">{option.price}</span>
                          </div>
                          <ul className="mt-2 space-y-1.5">
                            {option.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2 text-xs font-light leading-relaxed text-gray-700">
                                <span aria-hidden className="mt-0.5 text-gray-500">
                                  <CheckIcon size="sm" />
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <a
                            href={primaryHref}
                            {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                          >
                            {option.ctaLabel || primaryLabel}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OfferMatrix;
