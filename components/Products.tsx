import React, { useState } from 'react';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data derived from the Pricing Plan Deck
  const kits = [
    {
      tier: "Entry Level",
      title: "3-Shot Starter",
      price: "$0",
      description: "A foundational lead magnet designed for immediate awareness and local business auditing.",
      features: ["3 industry photo angles", "3-Minute Local Business Audit", "3 review response templates"],
      cta: "Download Free",
      isFree: true
    },
    {
      tier: "Essential",
      title: "Core Kits",
      price: "$59",
      description: "Standardized setup frameworks for Google or Yelp to ensure you get found and look professional.",
      features: ["15-min walkthrough video", "30 review response templates", "12 industry photo angles", "Citation checklist", "Weekly 10-minute routine"],
      cta: "Get Core Access"
    },
    {
      tier: "Advanced",
      title: "Pro Kits",
      price: "$129",
      description: "Scale from basic setup to real momentum with ad strategies and performance tracking.",
      features: ["Everything in Core", "Ads starter settings", "30 evergreen caption prompts", "KPI & audit workbook", "Troubleshooting playbook"],
      cta: "Upgrade to Pro"
    },
    {
      tier: "Best Value",
      title: "The Pro Bundle",
      price: "$229",
      description: "The definitive toolkit. Combined power of Google Pro and Yelp Pro kits for total visibility.",
      features: ["Full Google Pro Kit", "Full Yelp Pro Kit", "Unified visibility strategy", "Priority implementation updates"],
      cta: "Unlock Bundle",
      highlight: true
    }
  ];

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Current Catalog</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product 1: Local Launch Kits (Now triggers Modal) */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer"
          >
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
                <span className="px-3 py-1 bg-black text-[9px] font-bold text-white rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed font-light flex-grow">
                A definitive blueprint for local dominance. Our kits provide the checklists, templates, and instructional guides needed to optimize Google and Yelp profiles for immediate implementation.
              </p>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em] border-b border-black pb-0.5 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors">
                  View Kit Options
                </span>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2: Camentra */}
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
                Our flagship photo coaching tool. Designed to replace high-cost brand photography with professional-grade self-execution. Camentra guides you through composition and lighting to ensure your visual assets remain high-quality.
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

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="text-left">
                <h3 className="text-2xl font-serif text-gray-900">Local Launch Kits</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mt-1">Infrastructure for Visibility</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Product Grid */}
            <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-gray-50/30">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kits.map((kit, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white p-8 rounded-2xl border transition-all ${kit.highlight ? 'border-black ring-1 ring-black' : 'border-gray-100 shadow-sm'} flex flex-col`}
                  >
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-2">{kit.tier}</span>
                    <h5 className="text-xl font-serif mb-1">{kit.title}</h5>
                    <div className="text-2xl font-light mb-4">{kit.price}</div>
                    <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-8 flex-grow">{kit.description}</p>
                    
                    <ul className="space-y-4 mb-10">
                      {kit.features.map((feature, i) => (
                        <li key={i} className="text-[9px] uppercase tracking-wider text-gray-400 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0"></span> {feature}
                        </li>
                      ))}
                    </ul>

                    {kit.isFree ? (
                      <div className="space-y-3">
                        <input 
                          type="email" 
                          placeholder="Email for instant access" 
                          className="w-full px-4 py-3 text-[10px] border border-gray-100 rounded-xl focus:outline-none focus:border-black transition-colors" 
                        />
                        <button className="w-full py-4 bg-black text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                          {kit.cta}
                        </button>
                      </div>
                    ) : (
                      <button className={`w-full py-4 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${kit.highlight ? 'bg-black text-white hover:bg-gray-800' : 'border-gray-200 text-gray-900 hover:border-black'}`}>
                        {kit.cta}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
