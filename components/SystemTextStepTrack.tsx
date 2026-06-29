import React from 'react';
import { SYSTEM_STEPS } from '../content/systemSection';

type SystemTextStepTrackProps = {
  itemClassName?: string;
  motionStyle?: (index: number) => React.CSSProperties;
};

/** Text-only three-step track — alternating number / copy columns (original homepage rhythm). */
const SystemTextStepTrack: React.FC<SystemTextStepTrackProps> = ({ itemClassName = '', motionStyle }) => (
  <ol className="mx-auto max-w-5xl">
    {SYSTEM_STEPS.map((step, i) => {
      const reverse = i % 2 === 1;
      return (
        <li
          key={step.step}
          className={`py-5 md:py-4 lg:py-3 ${itemClassName}`.trim()}
          style={motionStyle?.(i)}
        >
          <div className="grid items-center gap-4 md:grid-cols-12 md:gap-10">
            <div className={`md:col-span-5 ${reverse ? 'text-right md:order-2' : ''}`}>
              <p className="font-sans text-[5rem] font-bold leading-none text-gray-200 md:text-[7rem]" aria-hidden>
                {step.step}
              </p>
              <span className="sr-only">Step {step.step}</span>
            </div>
            <div className={`md:col-span-7 ${reverse ? 'text-right md:order-1' : ''}`}>
              <h5 className="font-serif text-2xl font-normal text-gray-900 md:text-3xl">{step.title}</h5>
              <p className="mt-3 text-sm font-light leading-relaxed text-gray-500 md:text-base">{step.description}</p>
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);

export default SystemTextStepTrack;
