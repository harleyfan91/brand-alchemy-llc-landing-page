import React from 'react';

export interface ProductPhotoCardItem {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  imageUrl: string;
  ctaLabel?: string;
}

const ProductPhotoGridPrimitive: React.FC<{ items: ProductPhotoCardItem[] }> = ({ items }) => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
    {items.map((item) => (
      <article
        key={item.title}
        className="group h-full overflow-hidden rounded-xl border border-gray-100 transition-all duration-500 hover:border-gray-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] sm:rounded-2xl flex flex-row items-stretch xl:flex-col"
      >
        <div className="relative w-[min(42%,10rem)] shrink-0 self-stretch min-h-[8.5rem] overflow-hidden bg-gray-100 xl:w-full xl:min-h-0 xl:aspect-[4/3]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
        <div className="min-w-0 flex flex-1 flex-col p-3 sm:p-4 xl:p-4 border-l border-gray-100 xl:border-l-0 xl:border-t">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.subtitle}</span>
          <div className="mt-1 flex items-start justify-between gap-2">
            <h3 className="text-sm font-serif font-normal leading-snug text-gray-900 xl:text-base">{item.title}</h3>
            <span className="text-lg font-light tracking-tight text-gray-900 shrink-0">{item.price}</span>
          </div>
          <p className="mt-1.5 flex-grow text-xs font-light leading-relaxed text-gray-500 line-clamp-3">{item.description}</p>
          <button
            type="button"
            className="mt-3 w-full rounded-full border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:border-black hover:bg-black hover:text-white"
          >
            {item.ctaLabel || 'Buy now'}
          </button>
        </div>
      </article>
    ))}
  </div>
);

export default ProductPhotoGridPrimitive;
