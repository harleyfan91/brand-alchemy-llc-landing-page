import React from 'react';
import SystemSectionHeroBand from './SystemSectionHeroBand';
import SystemTextStepTrack from './SystemTextStepTrack';
import { useInViewOnce } from '../utils/useInViewOnce';

const Services: React.FC = () => {
  const { ref: sectionRef, hasEntered: motionOn, reduceMotion } = useInViewOnce<HTMLElement>({
    threshold: 0,
    rootMargin: '0px 0px -32% 0px',
  });

  const motionStyle = (delayMs: number): React.CSSProperties => ({
    transitionDelay: reduceMotion ? '0ms' : `${delayMs}ms`,
  });

  const sectionEnterClass = motionOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3';

  return (
    <section id="services" ref={sectionRef} className="relative z-20 scroll-mt-20 overflow-visible bg-transparent">
      <SystemSectionHeroBand
        motionClass={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${sectionEnterClass}`}
        motionStyle={motionStyle(0)}
      />

      <div className="relative py-8 md:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SystemTextStepTrack
            itemClassName={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${sectionEnterClass}`}
            motionStyle={(i) => motionStyle(110 + i * 110)}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
