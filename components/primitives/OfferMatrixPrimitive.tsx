import React, { useState } from 'react';
import CheckIcon from '../CheckIcon';
import type { DigitalProductMatrixColumn } from '../DigitalProductPage';
import { checkoutOpensInNewTab, normalizeCheckoutHref } from '../../utils/checkoutHref';

export interface OfferMatrixPrimitiveProps {
  columns: DigitalProductMatrixColumn[];
  /**
   * Used when `getCheckoutHref` is not set. Placeholder values (`#`, empty) render a disabled CTA.
   */
  primaryHref?: string | null;
  /**
   * Per-column, per-option checkout URL. When set, overrides `primaryHref` for the bottom CTA.
   */
  getCheckoutHref?: (columnIndex: number, optionIndex: number) => string | null | undefined;
  /** Label when checkout URL is present (default: Buy now). */
  primaryBuyLabel?: string;
  /** Label when no checkout URL (default: Coming soon). */
  primaryUnavailableLabel?: string;
}

const OfferMatrixPrimitive: React.FC<OfferMatrixPrimitiveProps> = ({
  columns,
  primaryHref,
  getCheckoutHref,
  primaryBuyLabel = 'Buy now',
  primaryUnavailableLabel = 'Coming soon',
}) => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [selectedOptionByColumn, setSelectedOptionByColumn] = useState<Record<number, number>>({});
  const hasThreeOffers = columns.length === 3;
  const selectedColumn = selectedOffer !== null ? columns[selectedOffer] : null;

  const matrixBackground = (() => {
    if (!selectedColumn?.toneKey) return 'var(--ba-catalog-neutral-bg)';
    if (selectedColumn.toneKey === 'google') return 'var(--ba-catalog-google-bg)';
    if (selectedColumn.toneKey === 'yelp') return 'var(--ba-catalog-yelp-bg)';
    return 'var(--ba-catalog-both-bg)';
  })();

  const matrixAccent = (() => {
    if (!selectedColumn?.toneKey) return 'transparent';
    if (selectedColumn.toneKey === 'google') return 'var(--ba-catalog-google-accent)';
    if (selectedColumn.toneKey === 'yelp') return 'var(--ba-catalog-yelp-accent)';
    return 'var(--ba-catalog-emphasis)';
  })();
  const columnAccent = (toneKey?: DigitalProductMatrixColumn['toneKey']): string => {
    if (toneKey === 'google') return 'var(--ba-catalog-google-accent)';
    if (toneKey === 'yelp') return 'var(--ba-catalog-yelp-accent)';
    if (toneKey === 'both') return 'var(--ba-catalog-emphasis)';
    return 'var(--ba-catalog-emphasis)';
  };

  const parsePriceNumber = (price: string): number | null => {
    const cleaned = price.replace(/[^0-9.]/g, '');
    if (!cleaned) return null;
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const columnTeaser = (column: DigitalProductMatrixColumn): string => {
    if (column.teaser && column.teaser.trim()) return column.teaser.trim();
    if (column.options.length > 1) {
      const values = column.options
        .map((option) => parsePriceNumber(option.price))
        .filter((value): value is number => value !== null);
      if (values.length > 0) return `From $${Math.min(...values)}`;
    }
    if (column.options.length === 1) return column.options[0].price;
    return '';
  };
  const getSelectedOptionIndex = (columnIdx: number, optionsLength: number): number => {
    const idx = selectedOptionByColumn[columnIdx] ?? 0;
    return Math.min(Math.max(idx, 0), Math.max(optionsLength - 1, 0));
  };

  const resolveCheckoutHref = (columnIndex: number): string | null => {
    const column = columns[columnIndex];
    if (!column) return null;
    const optionIndex = getSelectedOptionIndex(columnIndex, column.options.length);
    if (getCheckoutHref) {
      return normalizeCheckoutHref(getCheckoutHref(columnIndex, optionIndex));
    }
    return normalizeCheckoutHref(primaryHref);
  };

  const matrixCtaBase =
    'mt-4 inline-flex w-full items-center justify-center rounded-full text-xs font-bold uppercase tracking-widest';
  const matrixCtaLive = 'bg-black text-white transition-colors hover:bg-gray-800';
  const matrixCtaDisabled = 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-500';

  const MatrixCheckoutCta = ({ columnIndex, paddingClass }: { columnIndex: number; paddingClass: string }) => {
    const href = resolveCheckoutHref(columnIndex);
    if (href) {
      return (
        <a
          href={href}
          {...(checkoutOpensInNewTab(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`${matrixCtaBase} ${paddingClass} ${matrixCtaLive}`}
        >
          {primaryBuyLabel}
        </a>
      );
    }
    return (
      <button type="button" disabled className={`${matrixCtaBase} ${paddingClass} ${matrixCtaDisabled}`}>
        {primaryUnavailableLabel}
      </button>
    );
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 sm:rounded-2xl"
      style={{ backgroundColor: matrixBackground, transition: 'background-color 0.4s ease' }}
    >
      <div className="border-b border-gray-200/80 md:hidden">
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
                  isExpanded ? 'bg-white/80' : 'bg-white/60 hover:bg-white/85'
                }`}
              >
                <div className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)_2rem] items-center gap-x-2">
                  <span className={`min-w-0 text-xs font-bold uppercase tracking-widest ${isExpanded ? 'text-gray-900' : 'text-gray-700'}`}>
                    {column.name}
                  </span>
                  <span className="min-w-0 justify-self-end text-right text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {columnTeaser(column)}
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
                {isExpanded ? (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-1 rounded-full"
                    style={{ backgroundColor: columnAccent(column.toneKey) }}
                  />
                ) : null}
              </button>
              {isExpanded ? (
                <div className="border-t border-gray-100 bg-white/75 px-3 pb-5 pt-2 sm:px-4">
                  <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                  <div className="mt-3 grid gap-2">
                    {column.options.slice(0, 2).map((option, optionIdx) => {
                      const selectedOption = getSelectedOptionIndex(idx, column.options.length);
                      const isOptionActive = selectedOption === optionIdx;
                      return (
                      <button
                        key={`${column.name}-${option.name}`}
                        type="button"
                        onClick={() =>
                          setSelectedOptionByColumn((prev) => ({
                            ...prev,
                            [idx]: optionIdx,
                          }))
                        }
                        className={`w-full rounded-lg border p-3 text-left ${isOptionActive ? 'border-gray-900 bg-gray-100' : 'border-gray-200 bg-white'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                            <span
                              aria-hidden
                              className={`flex h-4 w-4 items-center justify-center rounded-full border ${isOptionActive ? 'border-black bg-black' : 'border-gray-300 bg-white'}`}
                            >
                              {isOptionActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                            </span>
                            {option.name}
                          </span>
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
                      </button>
                    )})}
                  </div>
                  <MatrixCheckoutCta columnIndex={idx} paddingClass="px-5 py-2.5" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className={`hidden min-h-[min(320px,50vh)] md:flex md:flex-row ${hasThreeOffers ? '' : 'md:gap-4'}`} role="radiogroup" aria-label="Choose an offer">
        {columns.map((column, idx) => {
          const expanded = selectedOffer === idx;
          const equal = selectedOffer === null;
          const slim = !equal && !expanded;
          const optionCount = Math.min(column.options.length, 2);
          const flexClass = equal ? 'flex-1 min-w-0' : expanded ? 'flex-[3] min-w-0' : 'flex-1 basis-0 min-w-[5.25rem]';
          return (
            <div key={column.name} className={`flex flex-col min-h-0 transition-[flex-grow,flex-shrink,flex-basis] duration-300 ease-out ${hasThreeOffers ? 'border-r border-gray-200/80 last:border-r-0' : ''} ${flexClass}`}>
              {equal ? (
                <button type="button" role="radio" aria-checked={false} aria-label={`${column.name} — show details`} onClick={() => setSelectedOffer(idx)} className="group relative flex flex-1 min-h-0 min-w-0 flex-col rounded-none border-0 bg-white/55 text-left transition-all duration-200 hover:bg-white/92 hover:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900">
                  <div className="relative flex shrink-0 items-start justify-between gap-2 px-3 py-3 sm:px-4 sm:py-3.5">
                    <div className="flex min-w-0 flex-col gap-1 pr-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{column.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{columnTeaser(column)}</span>
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-gray-100/90 bg-white/65 px-3 pb-4 pt-2 sm:px-4 sm:pb-5">
                    <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                    <div className="mt-3 grid w-full grid-cols-2 gap-2 sm:mt-auto" aria-hidden="true">
                      {column.options.slice(0, 2).map((option) => (
                        <div
                          key={`${column.name}-${option.name}-skeleton`}
                          className="flex h-[6rem] flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50/80 p-2.5"
                        >
                          <p className="text-[10px] font-semibold leading-tight text-gray-800">{option.name}</p>
                          <div className="mt-2.5 space-y-1.5">
                            <div className="h-2.5 w-[85%] rounded bg-gray-300" />
                            <div className="h-2.5 w-[66%] rounded bg-gray-300" />
                            <div className="h-2.5 w-[78%] rounded bg-gray-300" />
                          </div>
                        </div>
                      ))}
                      {column.options.length === 1 ? (
                        <div
                          className="h-[6rem] rounded-xl border border-transparent bg-transparent p-2.5 opacity-0"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  </div>
                </button>
              ) : slim ? (
                <button type="button" role="radio" aria-checked={false} aria-label={`${column.name} — switch to this offer`} onClick={() => setSelectedOffer(idx)} className="relative flex flex-1 min-h-0 min-w-0 flex-col items-center justify-center gap-2 px-1.5 py-5 text-center text-gray-600 transition-all hover:bg-gray-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-gray-900">{column.name}</span>
                  <span className="text-[9px] font-bold uppercase leading-tight px-0.5 text-gray-400">{columnTeaser(column)}</span>
                </button>
              ) : (
                <>
                  <button type="button" role="radio" aria-checked={expanded} aria-label={`${column.name} — collapse`} onClick={() => setSelectedOffer(null)} className="relative flex w-full shrink-0 flex-col items-stretch gap-1 px-4 py-3 text-left transition-colors sm:py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900" style={{ backgroundColor: 'rgba(255,255,255,0.78)' }}>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{column.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{columnTeaser(column)}</span>
                    <span className="absolute bottom-0 left-3 right-3 h-1 rounded-full" style={{ backgroundColor: matrixAccent }} />
                  </button>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto border-t border-gray-100/90 bg-white/65 px-4 pb-5 pt-2 sm:px-5 sm:pb-6">
                    <p className="text-sm font-light leading-relaxed text-gray-600">{column.summary}</p>
                    <div className={`mt-3 grid gap-2 ${optionCount === 1 ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 lg:grid-cols-2'} ${optionCount > 1 ? 'max-w-3xl' : ''}`}>
                      {column.options.slice(0, 2).map((option, optionIdx) => {
                        const selectedOption = getSelectedOptionIndex(idx, column.options.length);
                        const isOptionActive = selectedOption === optionIdx;
                        return (
                        <button
                          key={`${column.name}-${option.name}`}
                          type="button"
                          onClick={() =>
                            setSelectedOptionByColumn((prev) => ({
                              ...prev,
                              [idx]: optionIdx,
                            }))
                          }
                          className={`w-full rounded-xl border p-3 text-left ${isOptionActive ? 'border-gray-900 bg-gray-100' : 'border-gray-200 bg-white'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                              <span
                                aria-hidden
                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${isOptionActive ? 'border-black bg-black' : 'border-gray-300 bg-white'}`}
                              >
                                {isOptionActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                              </span>
                              {option.name}
                            </span>
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
                        </button>
                      )})}
                    </div>
                    <MatrixCheckoutCta columnIndex={idx} paddingClass="px-6 py-3" />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferMatrixPrimitive;
