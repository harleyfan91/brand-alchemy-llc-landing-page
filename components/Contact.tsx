import React from 'react';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative z-20 scroll-mt-20 overflow-visible bg-transparent py-14 md:py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="ba-section-eyebrow mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">Contact</h2>
        <h3 className="ba-section-display-title mb-6 text-4xl font-serif font-normal text-gray-900 md:mb-8 md:text-5xl">Have questions?</h3>
        <p className="ba-section-support mb-0 mx-auto max-w-2xl text-base font-light leading-relaxed text-gray-500 md:text-lg">
          We build tools for business owners who want to put their best foot forward online, on their own terms. Questions about our products? Reach us at{' '}
          <a href="mailto:info@brandalchemyllc.com" className="text-gray-900 underline underline-offset-2 hover:text-gray-500 transition-colors">
            info@brandalchemyllc.com
          </a>.
        </p>
      </div>
    </section>
  );
};

export default Contact;
