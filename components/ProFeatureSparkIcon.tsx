import React from 'react';

/** Pro-only tier lines — matches `identity-kit` TierSelector `SparkIcon` (filled star). */
const ProFeatureSparkIcon = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} fill="none" aria-hidden>
    <path
      d="M8 2.2 9.35 6.65 13.8 8 9.35 9.35 8 13.8 6.65 9.35 2.2 8 6.65 6.65 8 2.2Z"
      fill="currentColor"
    />
  </svg>
);

export default ProFeatureSparkIcon;
