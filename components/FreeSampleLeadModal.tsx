import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './free-sample-modal.css';
import './product-card-sheen.css';

const SAMPLE_INDUSTRIES = ['Cafe', 'Gym & Fitness', 'Spa & Beauty', 'Professional Services'] as const;

type FreeSampleLeadModalProps = {
  open: boolean;
  onClose: () => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
  /** Slower entrance when the modal opens as a one-time contextual prompt. */
  entrance?: 'manual' | 'prompted';
};

const FreeSampleLeadModal: React.FC<FreeSampleLeadModalProps> = ({
  open,
  onClose,
  selectedIndustry,
  onIndustryChange,
  entrance = 'manual',
}) => {
  const [sheenOn, setSheenOn] = useState(false);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!open) {
      setSheenOn(false);
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    let sheenTimer: number | undefined;
    if (!reduceMotion) {
      sheenTimer = window.setTimeout(() => setSheenOn(true), 280);
    }

    return () => {
      if (sheenTimer !== undefined) window.clearTimeout(sheenTimer);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose, reduceMotion]);

  if (!open || typeof document === 'undefined') return null;

  const panelClass =
    entrance === 'prompted'
      ? 'free-sample-modal-panel free-sample-modal-panel--prompted'
      : 'free-sample-modal-panel';

  return createPortal(
    <>
      <div className="free-sample-modal-backdrop" aria-hidden onClick={onClose} />
      <div
        className="free-sample-modal-layer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="free-sample-title"
        aria-describedby="free-sample-desc"
      >
        <div className="free-sample-modal-inner">
          <div className={panelClass} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/90 bg-white text-gray-500 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.22)] transition-[color,transform,box-shadow] duration-200 hover:scale-105 hover:border-gray-300 hover:text-gray-900 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.28)] focus:outline-none sm:-right-3 sm:-top-3"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="relative pt-6">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 flex min-h-9 items-center justify-center rounded-t-2xl bg-black px-3 py-2"
                aria-hidden
              >
                <span className="max-w-full text-center text-[8px] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-[9px] sm:tracking-[0.14em]">
                  Free sample pack
                </span>
              </div>

              <div className="relative z-10 overflow-hidden rounded-2xl border border-black bg-white p-6 shadow-[0_24px_55px_-22px_rgba(0,0,0,0.22)] sm:p-7">
                <span
                  className={`product-card-sheen${sheenOn ? ' product-card-sheen--play' : ''}`}
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-black/[0.012]" aria-hidden />

                <div className="relative z-10">
                  <h2
                    id="free-sample-title"
                    className="font-serif text-2xl font-normal leading-tight text-gray-900 sm:text-[1.65rem]"
                  >
                    Your free launch kit sample pack
                  </h2>
                  <p
                    id="free-sample-desc"
                    className="mt-3 text-sm font-light leading-relaxed text-gray-500 sm:text-[0.95rem]"
                  >
                    Three PDFs for your industry: review reply templates, photo upload tips, and a quick Google and Yelp
                    listing checklist — a taste of what ships in the full local launch kit.
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <div className="relative">
                      <select
                        value={selectedIndustry}
                        onChange={(e) => onIndustryChange(e.target.value)}
                        className="min-h-[2.75rem] w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 pl-3.5 pr-10 text-sm text-gray-900 focus:border-black focus:outline-none"
                      >
                        <option value="" disabled>
                          Industry...
                        </option>
                        {SAMPLE_INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      <span
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      className="min-h-[2.75rem] w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
                    />
                    <button
                      type="button"
                      className="min-h-[2.75rem] w-full rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                    >
                      Send my PDFs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default FreeSampleLeadModal;
