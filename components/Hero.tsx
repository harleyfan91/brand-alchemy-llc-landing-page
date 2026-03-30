import React from 'react';

const Hero: React.FC = () => {
  const scrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-32 md:pt-16 pb-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-50 to-white rounded-full blur-3xl opacity-60" />
      </div>

      {/* Maintained relative z-20 so your text sits securely above the background graphics */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        
        {/* Floating Dictionary Definition */}
        <div className="mb-10 text-sm font-serif italic tracking-normal normal-case text-gray-500">
          <span className="font-bold text-gray-700">alchemy</span>
          <span className="font-normal text-gray-400"> al·che·my (n.): a seemingly magical process of transformation, creation, or combination</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-gray-900 leading-[1.1] mb-8">
          You built something<br />worth showing off.<br />
          <span className="text-gray-300">Brand Alchemy</span><br />
          <span className="text-gray-500">helps you prove it.</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
          Step-by-step guides, templates, and tools that help local business owners look more professional online — without the complexity, the cost, or the learning curve.
        </p>

        <div className="flex justify-center">
          <a
            href="#services"
            onClick={scrollToSolutions}
            className="group flex flex-col items-center gap-4 transition-all duration-300"
          >
            <span className="px-12 py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-2xl hover:translate-y-[-4px]">
              See how it works
            </span>
            <div className="mt-4 flex flex-col items-center gap-2 animate-bounce opacity-40 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
