import React from 'react';

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative z-20 scroll-mt-20 overflow-visible bg-transparent py-24"
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
        <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Have questions?</h3>
        <p className="text-lg text-gray-500 mb-0 max-w-2xl mx-auto leading-relaxed font-light">
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
