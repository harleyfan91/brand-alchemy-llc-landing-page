import React, { useState } from 'react';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'google' | 'yelp'>('google');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const industries = ["Cafe", "Gym & Fitness", "Spa & Beauty", "Professional Services"];

  const aLaCarte = [
    { title: "Seasonal Industry Photo Angles (9-angle PDF)", price: "$7", desc: "Niche-specific framing for seasonal peaks." },
    { title: "Seasonal & Event Templates Pack", price: "$39", desc: "Ready-to-use copy for holidays and local events." }
  ];

  const kits = {
    google: [
      { title: "Google Core Kit", price: "$59", level: "Essential", features: ["15-min walkthrough video", "30 review response templates", "12 industry photo angles", "Citation checklist"] },
      { title: "Google Pro Kit", price: "$129", level: "Momentum", features: ["Everything in Core", "Ads starter settings", "30 evergreen caption prompts", "KPI & audit workbook"] }
    ],
    yelp: [
      { title: "Yelp Core Kit", price: "$59", level: "Essential", features: ["15-min walkthrough video", "30 review response templates", "Industry Photo Angles (12)", "Weekly routine guide"] },
      { title: "Yelp Pro Kit", price: "$129", level: "Momentum", features: ["Everything in Yelp Core", "Yelp Ads starter config", "Evergreen captions (30)", "Troubleshooting playbook"] }
    ]
  };

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Current Catalog</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Trigger Card */}
          <div onClick={() => setIsModalOpen(true)} className="bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Local Launch Kits" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8 md:p-10 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Standardized Kits</span>
              <h4 className="text-2xl font-serif text-gray-900 mb-4">Local Launch Kits</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Tiered blueprints for local dominance. Choose your level—from free industry starters to full-scale pro bundles.</p>
              <span className="text-[10px] font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Explore Catalog</span>
            </div>
          </div>

          {/* Camentra Card */}
          <a href="https://www.camentra.com" target="_blank" rel="noopener noreferrer" className="bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline">
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200" alt="Camentra App" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8 md:p-10 text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Mobile Application</span>
              <h4 className="text-2xl font-serif text-gray-900 mb-4">Camentra</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">Our flagship photo coaching tool. Master composition and lighting for professional-grade self-execution.</p>
              <span className="text-[10px] font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Visit Site</span>
            </div>
          </a>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header - Fixed Position for Consistency */}
            <div className="p-6 md:px-10 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl shrink-0 z-20">
              <div className="text-left">
                <h3 className="text-2xl font-serif text-gray-900">Toolkit Catalog</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Infrastructure for Visibility</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-12">
              
              {/* 1. TOP: FREE TIER LEAD MAGNET */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="max-w-xl text-left">
                    <span className="text-[9px] font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200 shadow-sm">Get Started — $0</span>
                    <h4 className="text-3xl font-serif mt-4 mb-2">3-Shot Starter Pack</h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      Includes 3 industry photo angles, a 3-minute local audit, and 3 review templates tailored to your niche.
                    </p>
                  </div>
                  <div className="w-full lg:w-auto space-y-4">
                    <div className="relative">
                      <select 
                        value={selectedIndustry} 
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-gray-200 text-[11px] font-medium focus:outline-none focus:border-black appearance-none bg-white cursor-pointer"
                      >
                        <option value="" disabled>Choose your sample industry...</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input type="email" placeholder="Email address" className="px-6 py-3 rounded-full border border-gray-200 text-[11px] focus:outline-none focus:border-black flex-grow lg:w-48" />
                      <button className="px-8 py-3 bg-black text-white rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg whitespace-nowrap">Send My Kit</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. THE ANCHOR: PRO BUNDLE */}
              <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
                <div className="max-w-md text-left">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Full Infrastructure</span>
                  <h4 className="text-3xl font-serif mt-2 mb-4">The Pro Bundle</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">The definitive toolkit. Combined Google & Yelp Pro kits for complete local visibility and standardized momentum.</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-4xl font-light mb-6">$229</div>
                  <button className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Get Full Bundle</button>
                </div>
              </div>

              {/* 3. PLATFORM SELECTION */}
              <div className="space-y-8">
                <div className="flex justify-center border-b border-gray-100">
                  {['google', 'yelp'].map((p) => (
                    <button 
                      key={p} 
                      onClick={() => setActiveTab(p as 'google' | 'yelp')}
                      className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === p ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {p} Platform
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  {kits[activeTab].map((kit, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col hover:border-black transition-colors duration-500">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-2">{kit.level}</span>
                      <h5 className="text-lg font-serif mb-1">{kit.title}</h5>
                      <div className="text-xl font-light mb-6">{kit.price}</div>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {kit.features.map((f, idx) => (
                          <li key={idx} className="text-[9px] uppercase tracking-wider text-gray-400 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span> {f}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full py-4 border border-gray-200 rounded-full text-[9px] font-bold uppercase tracking-widest hover:border-black transition-all">Select Kit</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. A LA CARTE */}
              <div className="pt-8 border-t border-gray-100">
                <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 text-left">Precision Add-ons</h6>
                <div className="grid sm:grid-cols-2 gap-4">
                  {aLaCarte.map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white flex justify-between items-center group hover:border-black transition-all">
                      <div className="max-w-[70%] text-left">
                        <p className="text-[11px] font-serif text-gray-900 mb-1">{item.title}</p>
                        <p className="text-[9px] text-gray-400 font-light">{item.desc}</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors rounded-full text-[10px] font-bold">{item.price} +</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
