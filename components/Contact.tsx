import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Evolve Your Process</h3>
        {/* text-lg is fine here — this is the most prominent body copy on the page */}
        {/* also fixed: "quetsions" → "questions" */}
        <p className="text-lg text-gray-500 mb-0 max-w-2xl mx-auto leading-relaxed font-light">
          Brand Alchemy is committed to providing the tools and instructional frameworks that make professional-level branding and marketing accessible to every independent business owner. If you have questions about our products, feel free to contact us at{' '}
          <a href="mailto:info@brandalchemyllc.com" className="text-gray-900 underline underline-offset-2 hover:text-gray-500 transition-colors">
            info@brandalchemyllc.com
          </a>.
        </p>
      </div>
    </section>
  );
};

export default Contact;
