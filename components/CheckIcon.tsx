import React from 'react';

/** Catalog tier feature rows — sizes match `components/Products.tsx` (formerly inline). */
const CheckIcon = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="none"
    className={size === 'md' ? 'w-3.5 h-3.5 shrink-0' : 'w-2.5 h-2.5 shrink-0'}
    aria-hidden
  >
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CheckIcon;
