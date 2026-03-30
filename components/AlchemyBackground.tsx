import React, { useEffect, useRef } from 'react';

// ─── Scroll animation utilities ───────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

// Maps a value from [inMin, inMax] to [outMin, outMax], clamped
const mapRange = (
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number
): number => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
};

// ─── SVG Symbols ──────────────────────────────────────────────────────────────

// Upward equilateral triangle — alchemical fire / transformation.
// Mirrors the △ half of the β△ brand mark.
const FireTriangle: React.FC = () => (
  <svg
    viewBox="0 0 100 87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <polygon
      points="50,1 99,86 1,86"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Alchemical sun (☉) — outer circle, center dot, 8 rays.
// Classical symbol for gold and perfection — used in the Products/Contact phase.
const AlchemicalSun: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Outer ring */}
    <circle cx="50" cy="50" r="33" stroke="currentColor" strokeWidth="0.5" fill="none" />
    {/* Center dot */}
    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    {/* Cardinal rays */}
    <line x1="50" y1="8"  x2="50" y2="14" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="50" y1="86" x2="50" y2="92" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="8"  y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="86" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    {/* Diagonal rays */}
    <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="78" y1="78" x2="83" y2="83" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="83" y1="17" x2="78" y2="22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="17" y1="83" x2="22" y2="78" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// ─── Background Layer ─────────────────────────────────────────────────────────
// Renders a fixed overlay at z-49 (above content, below header z-50 and modals z-100).
// Both symbols are manipulated via direct ref mutation on scroll — no React state
// updates — so animation is GPU-composited and never causes re-renders.
//
// Scroll phases (as fraction of total page scroll 0→1):
//   Triangle: visible 0%–42% — fades in, grows, drifts top-right, exits
//   Sun:      visible 30%–90% — enters bottom-left, drifts center-right, exits

const AlchemyBackground: React.FC = () => {
  const triRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = scrollY / maxScroll; // 0 = top, 1 = bottom

      // ── Fire Triangle ────────────────────────────────────────────────────
      // Starts centered in hero, zooms and drifts to top-right corner, then exits
      const triScale = mapRange(p, 0,    0.42, 0.88, 3.2);
      const triX     = mapRange(p, 0,    0.42, 0,   22);   // vw rightward
      const triY     = mapRange(p, 0,    0.42, 0,  -30);   // vh upward
      const triRot   = mapRange(p, 0,    0.42, 0,   16);   // degrees CW

      // Opacity envelope: fade in → hold → fade out
      const triOpacity =
        p < 0.04 ? mapRange(p, 0,    0.04, 0,    0.14) :  // ramp up on load
        p < 0.20 ? 0.14 :                                   // hold at peak
                   mapRange(p, 0.20, 0.42, 0.14, 0);        // ramp down

      if (triRef.current) {
        triRef.current.style.transform =
          `translate(calc(-50% + ${triX}vw), calc(-50% + ${triY}vh)) ` +
          `scale(${triScale}) rotate(${triRot}deg)`;
        triRef.current.style.opacity = String(clamp(triOpacity, 0, 0.15));
      }

      // ── Alchemical Sun ───────────────────────────────────────────────────
      // Enters from bottom-left as triangle exits, drifts to center-right, then fades
      const sunScale = mapRange(p, 0.30, 0.75, 0.5,  1.4);
      const sunX     = mapRange(p, 0.30, 0.86, -16,  12);  // vw rightward
      const sunY     = mapRange(p, 0.30, 0.86,  14, -12);  // vh upward
      const sunRot   = mapRange(p, 0.30, 0.86, -14,  22);  // degrees CW

      const sunOpacity =
        p < 0.30 ? 0 :
        p < 0.46 ? mapRange(p, 0.30, 0.46, 0,    0.12) :  // ramp up
        p < 0.72 ? 0.12 :                                   // hold
                   mapRange(p, 0.72, 0.90, 0.12, 0);        // ramp down

      if (sunRef.current) {
        sunRef.current.style.transform =
          `translate(calc(-50% + ${sunX}vw), calc(-50% + ${sunY}vh)) ` +
          `scale(${sunScale}) rotate(${sunRot}deg)`;
        sunRef.current.style.opacity = String(clamp(sunOpacity, 0, 0.13));
      }
    };

    tick(); // set initial state before first scroll
    window.addEventListener('scroll', tick, { passive: true });
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 49 }}
      aria-hidden="true"
    >
      {/* Fire Triangle — hero phase */}
      <div
        ref={triRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '72vmin',
          height: '72vmin',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        <FireTriangle />
      </div>

      {/* Alchemical Sun — products/contact phase */}
      <div
        ref={sunRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '62vmin',
          height: '62vmin',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        <AlchemicalSun />
      </div>
    </div>
  );
};

export default AlchemyBackground;
