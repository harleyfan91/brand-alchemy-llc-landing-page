import React from 'react';

// AlchemyMark — the β△ brand symbol.
// β (beta) + △ (delta/trine) = the visual shorthand for Brand Alchemy.
//
// Usage:
//   <AlchemyMark />                     — default sm, inherits text color
//   <AlchemyMark size="xs" />           — footer maker's mark
//   <AlchemyMark size="md" />           — standalone / display use
//   <AlchemyMark className="opacity-20 text-white" />  — etched / watermark

interface AlchemyMarkProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const sizeMap = {
  xs: 'text-xs tracking-[0.12em]',
  sm: 'text-sm tracking-[0.15em]',
  md: 'text-base tracking-[0.18em]',
};

const AlchemyMark: React.FC<AlchemyMarkProps> = ({ size = 'sm', className = '' }) => (
  <span
    className={`font-bold select-none inline-block ${sizeMap[size]} ${className}`}
    aria-label="Brand Alchemy mark"
  >
    β△
  </span>
);

export default AlchemyMark;
