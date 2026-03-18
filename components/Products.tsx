import React from 'react';

const Products = () => {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Current Catalog</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product 1: Local Launch Kits */}
          <div className="bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="Local Launch Kits" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Standardized Kit</span>
                  <h4 className="text-2xl font-serif text-gray-900">Local Launch Kits</h4>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-[9px] font-bold text-gray-500 rounded-full uppercase tracking-tighter">Coming Soon</span>
              </div>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed font-light flex-grow">
                A definitive blueprint for local dominance. Our kits provide the checklists, templates, and instructional guides needed to optimize Google and Yelp profiles, alongside branding worksheets designed for immediate implementation.
              </p>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Self-Paced Guide</span>
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2: Camentra (Fully Clickable) */}
          <a 
            href="https://www.camentra.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer no-underline"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200" 
                alt="Camentra App" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Mobile Application</span>
                  <h4 className="text-2xl font-serif text-gray-900">Camentra</h4>
                </div>
                <span className="px-3 py-1 bg-black text-[9px] font-bold text-white rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed font-light flex-grow">
                Our flagship photo coaching tool. Designed to replace high-cost brand photography with professional-grade self-execution. Camentra guides you through composition and lighting to ensure your visual assets remain consistent and high-quality.
              </p>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] border-b border-black pb-0.5 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
                  Visit Camentra.com
                </span>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
