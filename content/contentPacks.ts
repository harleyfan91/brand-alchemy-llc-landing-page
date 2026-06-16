import type { ProductPhotoCardItem } from '../components/primitives/ProductPhotoGridPrimitive';

/**
 * Canonical content-pack rows for the live Guides & kits page (`/guides-and-kits`).
 * The primitive preview route uses generic placeholders in `content/digitalProducts.ts`, not this file.
 */
export const contentPacks: ProductPhotoCardItem[] = [
  {
    title: 'Core Content Pack',
    subtitle: 'Year round',
    price: '$29',
    description:
      "Reusable templates and starters for routine posts and updates—what's new, hours, quick news, and more.",
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
    ctaLabel: 'Coming soon',
    ctaDisabled: true,
  },
  {
    title: 'Holidays & Events Content Pack',
    subtitle: 'Holidays & events',
    price: '$39',
    description: 'Ready-to-use copy for holidays and local events. Edit and post without starting from scratch.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=900',
    ctaLabel: 'Coming soon',
    ctaDisabled: true,
  },
  {
    title: 'Social Content Pack',
    subtitle: 'Social',
    price: '$19',
    description: 'Short lines, starters, and fill-in-the-blank ideas for feed and stories.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900',
    ctaLabel: 'Coming soon',
    ctaDisabled: true,
  },
  {
    title: 'Email Content Pack',
    subtitle: 'Email',
    price: '$29',
    description: 'Welcome and early email copy you can adapt to your voice.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900',
    ctaLabel: 'Coming soon',
    ctaDisabled: true,
  },
];
