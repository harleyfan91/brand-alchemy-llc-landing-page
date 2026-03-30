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

// Alchemical sun (☉) — Classical symbol for gold and perfection.
// Simplified to standard circle with a dot. 
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
  </svg>
);

// ─── Background Layer ─────────────────────────────────────────────────────────

const AlchemyBackground: React.FC = () => {
  const triRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = scrollY / maxScroll; // 0 = top, 1 = bottom

      // ── Fire Triangle ────────────────────────────────────────────────────
      // Phase 1 (0 to 0.30): Visible at start on right side. Zooms slightly and rotates dramatically IN PLACE.
      // Phase 2 (0.30 to 0.45): Stops rotating/zooming, pans to the right off-screen.
      const triScale = p < 0.30 ? mapRange(p, 0, 0.30, 1.0, 1.3) : 1.3;
      const triX     = p < 0.30 ? 25 : mapRange(p, 0.30, 0.45, 25, 100); // 25vw (right) then pans off-screen
      const triY     = 0; // Stays vertically centered
      const triRot   = p < 0.30 ? mapRange(p, 0, 0.30, 0, 180) : 180; 

      // Stays visible until panning off screen
      const triOpacity = p < 0.30 ? 0.14 : mapRange(p, 0.30, 0.45, 0.14, 0);

      if (triRef.current) {
        triRef.current.style.transform =
          `translate(calc(-50% + ${triX}vw), calc(-50% + ${triY}vh)) ` +
          `scale(${triScale}) rotate(${triRot}deg)`;
        triRef.current.style.opacity = String(clamp(triOpacity, 0, 0.15));
      }

      // ── Alchemical Sun ───────────────────────────────────────────────────
      // Enters from off-screen left as triangle exits right, moves across to the right. 
      // No zooming or rotation.
      const sunScale = 1.0; 
      const sunRot   = 0;   
      const sunY     = 0;   // Centered vertically
      const sunX     = mapRange(p, 0.30, 0.90, -80, 40); // Pans from left (-80vw) to right (40vw)

      const sunOpacity =
        p < 0.30 ? 0 :
        p < 0.35 ? mapRange(p, 0.30, 0.35, 0, 0.12) : // fast fade in as it enters
        p < 0.85 ? 0.12 :                             // hold visibility across screen
                   mapRange(p, 0.85, 0.95, 0.12, 0);  // ramp down at the very bottom

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
      style={{ zIndex: 0 }} // Moved down to z-0 so main content correctly overlaps it
      aria-hidden="true"
    >
      {/* Fire Triangle */}
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

      {/* Alchemical Sun */}
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
