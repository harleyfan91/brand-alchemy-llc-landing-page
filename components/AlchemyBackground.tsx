import React, { useEffect, useRef } from 'react';

// ─── Scroll animation utilities ───────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const mapRange = (
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number
): number => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
};

// ─── SVG Symbols ──────────────────────────────────────────────────────────────

const FireTriangle: React.FC = () => (
  <svg viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,1 99,86 1,86" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" fill="none" />
  </svg>
);

const AlchemicalSun: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="33" stroke="currentColor" strokeWidth="0.5" fill="none" />
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
      const triScale = p < 0.30 ? mapRange(p, 0, 0.30, 1.0, 1.3) : 1.3;
      const triX     = p < 0.30 ? 25 : mapRange(p, 0.30, 0.45, 25, 120); // Exits between 0.30 and 0.45
      const triY     = 0; 
      const triRot   = p < 0.30 ? mapRange(p, 0, 0.30, 0, 90) : 90; 

      const triOpacity = p < 0.35 ? 0.14 : mapRange(p, 0.35, 0.45, 0.14, 0);

      if (triRef.current) {
        triRef.current.style.transform =
          `translate(calc(-50% + ${triX}vw), calc(-50% + ${triY}vh)) ` +
          `scale(${triScale}) rotate(${triRot}deg)`;
        triRef.current.style.opacity = String(clamp(triOpacity, 0, 0.15));
      }

      // ── Alchemical Sun ───────────────────────────────────────────────────
      const sunScale = 1.0; 
      const sunRot   = 0;   
      const sunY     = 0;   
      
      // Starts completely off-screen left (-100vw) at 0.20, moves to right (40vw)
      const sunX     = mapRange(p, 0.20, 0.85, -100, 40); 

      const sunOpacity =
        p < 0.20 ? 0 :
        // Fades in completely between 0.20 and 0.25 while it is STILL hidden off-screen left
        // By the time it reaches the visible screen edge, it is fully faded in, purely scrolling.
        p < 0.25 ? mapRange(p, 0.20, 0.25, 0, 0.12) : 
        p < 0.85 ? 0.12 :                             
                   mapRange(p, 0.85, 0.95, 0.12, 0);  

      if (sunRef.current) {
        sunRef.current.style.transform =
          `translate(calc(-50% + ${sunX}vw), calc(-50% + ${sunY}vh)) ` +
          `scale(${sunScale}) rotate(${sunRot}deg)`;
        sunRef.current.style.opacity = String(clamp(sunOpacity, 0, 0.13));
      }
    };

    tick(); 
    window.addEventListener('scroll', tick, { passive: true });
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
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

      <div
        ref={sunRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '85vmin',
          height: '85vmin',
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
