import type { DigitalProductMatrixColumn } from '../components/DigitalProductPage';

type LocalKitTierKey = 'core' | 'pro' | 'bundle';

type LocalKitOptionDef = {
  tierKey: LocalKitTierKey;
  /** Tier label when multiple options show (e.g. Core / Pro). Omit for single-tier columns. */
  tierLabel?: string;
  price: string;
  bullets: string[];
};

type LocalKitColumnDef = {
  name: string;
  toneKey: 'google' | 'yelp' | 'both';
  summary: string;
  teaser?: string;
  options: LocalKitOptionDef[];
};

/**
 * As of June 2026 Pro tiers are not ready. Flip to `true` when Google/Yelp Pro kits are live in checkout.
 * Pro option definitions stay in `localBusinessKitMatrixColumnsFull` either way.
 */
export const LOCAL_KIT_PRO_TIERS_LIVE = false;

/** Core bundle price — must stay below 2 × single-kit price ($39 + $39). */
export const LOCAL_KITS_CORE_BUNDLE_PRICE = '$69';

const platformSummary =
  'Profile setup guide, 30 review response scripts, plain-language listing tips, and worksheets to stay organized.';

const reviewScriptBullet = '30 review response scripts ready to customize';

const googleCoreBullets = [
  'Step-by-step Google Business Profile setup guide',
  reviewScriptBullet,
  'Best practices to help you rank higher in local search',
  'Worksheets to keep your details consistent online and stay on top of your listing',
];

const yelpCoreBullets = [
  'Step-by-step Yelp profile setup guide',
  reviewScriptBullet,
  'Best practices to help you rank higher in local search',
  'Worksheets to keep your details consistent online and stay on top of your listing',
];

/** Full catalog including Pro tiers — source of truth for when Pro goes live. */
export const localBusinessKitMatrixColumnsFull: LocalKitColumnDef[] = [
  {
    name: 'Google',
    toneKey: 'google',
    summary: platformSummary,
    options: [
      { tierKey: 'core', price: '$39', bullets: googleCoreBullets },
      {
        tierKey: 'pro',
        tierLabel: 'Pro',
        price: '$79',
        bullets: ['Everything in Core', 'Google Ads starter settings', 'KPI and audit workbook'],
      },
    ],
  },
  {
    name: 'Yelp',
    toneKey: 'yelp',
    summary: platformSummary,
    options: [
      { tierKey: 'core', price: '$39', bullets: yelpCoreBullets },
      {
        tierKey: 'pro',
        tierLabel: 'Pro',
        price: '$79',
        bullets: ['Everything in Core', 'Yelp Ads starter configuration', 'Troubleshooting playbook'],
      },
    ],
  },
];

function bundleColumnDef(): LocalKitColumnDef {
  if (LOCAL_KIT_PRO_TIERS_LIVE) {
    return {
      name: 'Both',
      toneKey: 'both',
      summary: 'Google + Yelp Pro together in one checkout.',
      teaser: '$129',
      options: [
        {
          tierKey: 'bundle',
          tierLabel: 'Bundle',
          price: '$129',
          bullets: [
            'Google and Yelp Pro local launch kits together',
            'Save compared to buying each Pro kit separately',
            'Walkthroughs, templates, listing tips, worksheets, and ads-ready extras across both platforms',
          ],
        },
      ],
    };
  }

  return {
    name: 'Both',
    toneKey: 'both',
    summary: 'Google and Yelp launch kits together in one checkout.',
    teaser: LOCAL_KITS_CORE_BUNDLE_PRICE,
    options: [
      {
        tierKey: 'bundle',
        tierLabel: 'Bundle',
        price: LOCAL_KITS_CORE_BUNDLE_PRICE,
        bullets: [
          'Google and Yelp local launch kits together',
          'Save compared to buying each kit separately',
          'Walkthroughs, review scripts, listing tips, and worksheets across both platforms',
        ],
      },
    ],
  };
}

function visibleOptions(column: LocalKitColumnDef): LocalKitOptionDef[] {
  return column.options.filter((option) => LOCAL_KIT_PRO_TIERS_LIVE || option.tierKey !== 'pro');
}

function optionDisplayName(option: LocalKitOptionDef, visibleCount: number): string {
  if (visibleCount === 1 && (option.tierKey === 'core' || option.tierKey === 'bundle')) return '';
  if (option.tierLabel) return option.tierLabel;
  if (option.tierKey === 'core') return 'Core';
  if (option.tierKey === 'pro') return 'Pro';
  return 'Bundle';
}

function toMatrixColumn(column: LocalKitColumnDef): DigitalProductMatrixColumn {
  const options = visibleOptions(column);
  return {
    name: column.name,
    toneKey: column.toneKey,
    summary: column.summary,
    teaser: column.teaser,
    options: options.map((option) => ({
      name: optionDisplayName(option, options.length),
      price: option.price,
      bullets: option.bullets,
    })),
  };
}

/** Matrix columns for `/guides-and-kits` — respects `LOCAL_KIT_PRO_TIERS_LIVE`. */
export function getLocalBusinessKitMatrixColumns(): DigitalProductMatrixColumn[] {
  return [...localBusinessKitMatrixColumnsFull, bundleColumnDef()].map(toMatrixColumn);
}
