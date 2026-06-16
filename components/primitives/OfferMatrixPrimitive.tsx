import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '../CheckIcon';
import type { DigitalProductMatrixColumn } from '../DigitalProductPage';
import { checkoutOpensInNewTab, normalizeCheckoutHref } from '../../utils/checkoutHref';
import { renderKitCopy } from '../../utils/renderKitCopy';

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
  /** Fires when the user expands a kit column (null → selected). */
  onOfferExpand?: (columnIndex: number) => void;
}

const OfferMatrixPrimitive: React.FC<OfferMatrixPrimitiveProps> = ({
  columns,
  primaryHref,
  getCheckoutHref,
  primaryBuyLabel = 'Buy now',
  primaryUnavailableLabel = 'Coming soon',
  onOfferExpand,
}) => {
  // On mobile we want Google expanded by default, but without triggering the "auto-open sample modal" flow.
  // On desktop we keep it neutral until hover.
  const initialSelectedOffer = (() => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia('(max-width: 767px)').matches ? 0 : null;
  })();

  const [selectedOffer, setSelectedOffer] = useState<number | null>(initialSelectedOffer);
  const [selectedOptionByColumn, setSelectedOptionByColumn] = useState<Record<number, number>>({});
  const prevSelectedOfferRef = useRef<number | null>(initialSelectedOffer);

  // Desktop-only: highlight + checkout CTA on hover. No width/height animation.
  const [desktopHoveredOffer, setDesktopHoveredOffer] = useState<number | null>(null);

  const activeOfferForStyling = desktopHoveredOffer ?? selectedOffer;

  useEffect(() => {
    if (selectedOffer !== null && prevSelectedOfferRef.current === null) {
      onOfferExpand?.(selectedOffer);
    }
    prevSelectedOfferRef.current = selectedOffer;
  }, [selectedOffer, onOfferExpand]);
  const hasThreeOffers = columns.length === 3;
  const selectedColumn = activeOfferForStyling !== null ? columns[activeOfferForStyling] : null;

  const matrixBackground = (() => {
    if (!selectedColumn?.toneKey) return 'var(--ba-catalog-neutral-bg)';
    if (selectedColumn.toneKey === 'google') return 'var(--ba-catalog-google-bg)';
    if (selectedColumn.toneKey === 'yelp') return 'var(--ba-catalog-yelp-bg)';
    return 'var(--ba-catalog-both-bg)';
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

  /** Desktop column headers: show price teaser when multiple tiers are visible (e.g. Core + Pro). */
  const showDesktopHeaderTeaser = columns.some((column) => column.options.length > 1);

  const optionHasTierLabel = (option: DigitalProductMatrixColumn['options'][number]): boolean =>
    Boolean(option.name.trim());

  const renderOptionBullets = (bullets: string[]) => (
    <ul className="mt-2 space-y-1.5">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-2 text-xs font-light leading-relaxed text-gray-700">
          <span aria-hidden className="mt-0.5 text-gray-500">
            <CheckIcon size="sm" />
          </span>
          <span>{renderKitCopy(bullet)}</span>
        </li>
      ))}
    </ul>
  );
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
      style={{ backgroundColor: matrixBackground, transition: 'background-color 0.3s ease' }}
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
                  <p className="text-sm font-medium leading-relaxed text-gray-800">{column.summary}</p>
                  <div className="mt-3 grid gap-2">
                    {column.options.slice(0, 2).map((option, optionIdx) => {
                      const selectedOption = getSelectedOptionIndex(idx, column.options.length);
                      const isOptionActive = selectedOption === optionIdx;
                      const showTierLabel = optionHasTierLabel(option);
                      const optionCardClass = `w-full rounded-lg border p-3 text-left ${
                        showTierLabel
                          ? isOptionActive
                            ? 'border-gray-900 bg-gray-100'
                            : 'border-gray-200 bg-white'
                          : 'border-gray-200 bg-white'
                      }`;
                      const optionBody = (
                        <>
                          <div
                            className={`flex items-start gap-2 ${showTierLabel ? 'justify-between' : 'justify-end'}`}
                          >
                            {showTierLabel ? (
                              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                                <span
                                  aria-hidden
                                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${isOptionActive ? 'border-black bg-black' : 'border-gray-300 bg-white'}`}
                                >
                                  {isOptionActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                                </span>
                                {option.name}
                              </span>
                            ) : (
                              <span className="sr-only">{column.name} kit</span>
                            )}
                            <span className="text-sm font-light text-gray-900">{option.price}</span>
                          </div>
                          {renderOptionBullets(option.bullets)}
                        </>
                      );

                      if (!showTierLabel) {
                        return (
                          <div key={`${column.name}-${optionIdx}`} className={optionCardClass}>
                            {optionBody}
                          </div>
                        );
                      }

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
                          className={optionCardClass}
                        >
                          {optionBody}
                        </button>
                      );
                    })}
                  </div>
                  <MatrixCheckoutCta columnIndex={idx} paddingClass="px-5 py-2.5" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        className={`hidden md:flex md:flex-row md:items-stretch ${hasThreeOffers ? '' : 'md:gap-4'}`}
        role="radiogroup"
        aria-label="Choose an offer"
        onMouseLeave={() => setDesktopHoveredOffer(null)}
      >
        {columns.map((column, idx) => {
          const hovered = desktopHoveredOffer === idx;

          return (
            <div
              key={column.name}
              className={`flex min-w-0 flex-1 flex-col transition-colors duration-300 ${
                hovered ? 'bg-white/80' : 'bg-white/65'
              } ${hasThreeOffers ? 'border-r border-gray-200/80 last:border-r-0' : ''}`}
              onMouseEnter={() => setDesktopHoveredOffer(idx)}
            >
              <div className="relative shrink-0 px-4 py-3 sm:py-3.5">
                <div className="flex min-w-0 flex-col gap-1 pr-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{column.name}</span>
                  {showDesktopHeaderTeaser ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {columnTeaser(column)}
                    </span>
                  ) : null}
                </div>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-1 rounded-full transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: columnAccent(column.toneKey) }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-gray-100/90 px-4 pb-5 pt-2 sm:px-5 sm:pb-6">
                <p className="text-sm font-medium leading-relaxed text-gray-800">{column.summary}</p>
                <div className="mt-3 grid gap-2">
                  {column.options.slice(0, 2).map((option, optionIdx) => {
                    const selectedOption = getSelectedOptionIndex(idx, column.options.length);
                    const isOptionActive = selectedOption === optionIdx;
                    const showTierLabel = optionHasTierLabel(option);
                    const optionCardClass = `w-full rounded-xl border p-3 text-left ${
                      showTierLabel
                        ? isOptionActive
                          ? 'border-gray-900 bg-gray-100'
                          : 'border-gray-200 bg-white'
                        : 'border-gray-200 bg-white'
                    }`;
                    const optionBody = (
                      <>
                        <div
                          className={`flex items-start gap-2 ${showTierLabel ? 'justify-between' : 'justify-end'}`}
                        >
                          {showTierLabel ? (
                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
                              <span
                                aria-hidden
                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${isOptionActive ? 'border-black bg-black' : 'border-gray-300 bg-white'}`}
                              >
                                {isOptionActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                              </span>
                              {option.name}
                            </span>
                          ) : (
                            <span className="sr-only">{column.name} kit</span>
                          )}
                          <span className="text-sm font-light text-gray-900">{option.price}</span>
                        </div>
                        {renderOptionBullets(option.bullets)}
                      </>
                    );

                    if (!showTierLabel) {
                      return (
                        <div key={`${column.name}-${optionIdx}`} className={optionCardClass}>
                          {optionBody}
                        </div>
                      );
                    }

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
                        className={optionCardClass}
                      >
                        {optionBody}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-auto min-h-[2.75rem] pt-4">
                  <div
                    className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                  >
                    <MatrixCheckoutCta columnIndex={idx} paddingClass="px-6 py-3" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferMatrixPrimitive;
