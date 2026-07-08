import React, { useState } from 'react';
import {
  SYSTEM_SECTION_IMAGE,
  SYSTEM_SECTION_IMAGE_TREATMENT,
  SYSTEM_SECTION_INTRO,
  type SystemSectionImageTreatment,
} from '../content/systemSection';

type SystemSectionHeroBandProps = {
  className?: string;
  motionClass?: string;
  motionStyle?: React.CSSProperties;
  /** Override `SYSTEM_SECTION_IMAGE_TREATMENT` — used on the mocks page to compare full vs muted. */
  treatment?: SystemSectionImageTreatment;
};

/** Full-bleed image band with gradient scrub — Studio / Identity Kit pattern, homepage light treatment. */
const SystemSectionHeroBand: React.FC<SystemSectionHeroBandProps> = ({
  className = '',
  motionClass = '',
  motionStyle,
  treatment = SYSTEM_SECTION_IMAGE_TREATMENT,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const mutedImage = treatment === 'muted';

  return (
    <div
      className={`relative w-screen left-1/2 -translate-x-1/2 ${motionClass} ${className}`.trim()}
      style={motionStyle}
    >
      <div className="relative min-h-[17rem] overflow-hidden sm:min-h-[20rem] md:min-h-[24rem] lg:min-h-[26rem]">
        {!imageFailed ? (
          <img
            src={SYSTEM_SECTION_IMAGE.src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 ${
              mutedImage ? 'brightness-[0.88] contrast-[1.12] saturate-50' : ''
            }`}
            style={{ objectPosition: SYSTEM_SECTION_IMAGE.objectPosition }}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" aria-hidden />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: mutedImage
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.9) 100%)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.78) 100%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 flex min-h-[inherit] items-end px-4 pb-10 pt-16 sm:px-6 sm:pb-12 md:pb-14 lg:px-8">
          <div className="ba-section-stack--default mx-auto max-w-4xl text-center">
            <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              {SYSTEM_SECTION_INTRO.eyebrow}
            </h2>
            <h3 className="ba-section-display-title font-serif text-4xl font-normal text-white md:text-5xl">
              {SYSTEM_SECTION_INTRO.title}
            </h3>
            <p className="ba-section-support text-sm font-light leading-relaxed text-white/85 md:text-base">
              {SYSTEM_SECTION_INTRO.support}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSectionHeroBand;
