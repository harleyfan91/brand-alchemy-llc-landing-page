import React from 'react';
import CheckIcon from './CheckIcon';
import ProFeatureSparkIcon from './ProFeatureSparkIcon';

/**
 * Static Core / Pro tier pair using the same chrome as the local-business catalog modal in `Products.tsx`
 * (`Products.tsx` → `renderTierCardsFor`): borders, emphasis, Inter prices, checkmark features.
 * Not interactive — decorative “radio” dots mirror the selectable tier UI for visual parity.
 */

export type TierContent = {
  price: string;
  features: string[];
  /** Full-width rule before this index (e.g. `4` after Core PDFs when Pro lists core + add-ons). */
  dividerBeforeFeatureIndex?: number;
  /**
   * After `dividerBeforeFeatureIndex`, use spark icon for Pro-only lines (matches `identity-kit` TierSelector
   * when Pro is selected: checks for Core PDFs, sparks for Pro additions).
   */
  useSparkIconAfterDivider?: boolean;
};

export type CatalogStyleTierCardsProps = {
  core: TierContent;
  pro: TierContent;
  /** `pro-first` matches `identity-kit` TierSelector (`tierOptions` order). Default `core-first`. */
  order?: 'core-first' | 'pro-first';
};

const CatalogStyleTierCards: React.FC<CatalogStyleTierCardsProps> = ({ core, pro, order = 'core-first' }) => {
  const tiers =
    order === 'pro-first'
      ? [
          { id: 'pro' as const, label: 'Pro', kit: pro, isActive: true },
          { id: 'core' as const, label: 'Core', kit: core, isActive: false },
        ]
      : [
          { id: 'core' as const, label: 'Core', kit: core, isActive: false },
          { id: 'pro' as const, label: 'Pro', kit: pro, isActive: true },
        ];

  return (
    <section aria-label="Pricing tiers" className="mb-5 space-y-3">
      {tiers.map(({ id, label, kit, isActive }) => (
        <div
          key={id}
          className={`relative overflow-hidden rounded-lg border sm:rounded-xl ${isActive ? 'bg-gray-100' : 'bg-white'}`}
          style={{
            borderColor: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-200)',
            boxShadow: isActive ? '0 4px 20px -4px rgba(0,0,0,0.12)' : 'none',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <div className="flex items-center justify-between px-4 pb-3 pt-4 sm:px-5 sm:pb-3 sm:pt-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-300)',
                  backgroundColor: isActive ? 'var(--ba-catalog-emphasis)' : 'transparent',
                  color: 'var(--ba-color-on-primary)',
                }}
                aria-hidden
              >
                {isActive ? <CheckIcon size="sm" /> : null}
              </div>
              <h3
                className="text-sm font-bold uppercase tracking-wider sm:text-base"
                style={{ color: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-500)' }}
              >
                {label}
              </h3>
            </div>
            <span
              className="text-2xl font-light tracking-tight sm:text-3xl"
              style={{ color: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-400)' }}
            >
              {kit.price}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2 border-t border-gray-100 px-4 pb-4 pt-3 sm:grid-cols-2 sm:px-5 sm:pb-4">
            {kit.features.map((f, idx) => {
              const divIdx = kit.dividerBeforeFeatureIndex;
              const useSpark =
                Boolean(kit.useSparkIconAfterDivider && divIdx !== undefined && idx >= divIdx && isActive);
              const iconColor = useSpark
                ? 'var(--ba-catalog-emphasis)'
                : isActive
                  ? 'var(--ba-gray-500)'
                  : 'var(--ba-gray-300)';
              const textColor = useSpark
                ? 'var(--ba-gray-900)'
                : isActive
                  ? 'var(--ba-gray-700)'
                  : 'var(--ba-catalog-feature-inactive)';

              return (
                <React.Fragment key={`${id}-${idx}-${f.slice(0, 24)}`}>
                  {divIdx !== undefined && idx === divIdx ? (
                    <div className="col-span-1 my-1 border-t border-gray-100 pt-2 sm:col-span-2" role="presentation">
                      <span className="sr-only">Pro additions</span>
                    </div>
                  ) : null}
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0" style={{ color: iconColor }}>
                      {useSpark ? <ProFeatureSparkIcon /> : <CheckIcon size="md" />}
                    </span>
                    <span className="text-sm font-normal leading-snug" style={{ color: textColor }}>
                      {f}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CatalogStyleTierCards;
