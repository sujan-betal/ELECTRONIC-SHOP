import React from 'react';

const BRANDS = [
  { name: 'Apple', logoText: ' Apple', category: 'Silicon & iOS' },
  { name: 'Samsung', logoText: 'SAMSUNG', category: 'Galaxy AI' },
  { name: 'Sony', logoText: 'SONY', category: 'Alpha & PlayStation' },
  { name: 'ASUS ROG', logoText: 'ASUS ROG', category: 'Gaming Hardware' },
  { name: 'NVIDIA', logoText: 'NVIDIA', category: 'GeForce RTX' },
  { name: 'DJI', logoText: 'DJI', category: '4K Drones & Gimbals' },
  { name: 'Logitech', logoText: 'logitech', category: 'Master Series' },
  { name: 'Bose', logoText: 'BOSE', category: 'Acoustic Noise Cancelling' },
];

export default function BrandLogos() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-slate-800/80 my-8">
      <div className="text-center mb-6">
        <span className="text-[11px] font-mono uppercase text-slate-500 tracking-widest font-semibold">
          Authorized Direct Manufacturer Partner
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
        {BRANDS.map((brand, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 text-center transition-all group"
          >
            <span className="font-black text-xs text-slate-300 group-hover:text-white tracking-wider block font-mono">
              {brand.logoText}
            </span>
            <span className="text-[9px] text-slate-500 block truncate mt-0.5">
              {brand.category}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
