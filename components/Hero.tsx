
import React from 'react';

const Hero: React.FC = () => {
  const scrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-32 md:pt-16 pb-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-50 to-white rounded-full blur-3xl opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 border border-gray-100 rounded-full bg-gray-50/50 backdrop-blur-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Intelligent Business Solutions</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1] mb-8">
          The Infrastructure <br/>for <span className="italic text-gray-400">Exceptional Brands</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
          We create products and instructional frameworks that empower entrepreneurs to master their own marketing, branding, and digital presence.
        </p>
        
        <div className="flex justify-center">
          <a 
            href="#services" 
            onClick={scrollToSolutions}
            className="group flex flex-col items-center gap-4 transition-all duration-300"
          >
            <span className="px-12 py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-2xl hover:translate-y-[-4px]">
              Scroll to explore our solutions
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
