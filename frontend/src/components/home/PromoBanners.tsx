import React from 'react';
import Link from 'next/link';
import { ArrowRight, Gamepad2, Headphones } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 flex flex-col justify-between min-h-[280px] shadow-xl group">
          <div className="absolute right-0 top-0 w-2/3 h-full opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
              alt="Gaming Consoles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative z-10 max-w-xs">
            <span className="text-xs font-mono uppercase bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
              Next-Gen Gaming
            </span>
            <h3 className="text-2xl font-black text-white mt-3 leading-snug">
              PlayStation 5 Pro & OLED Gaming Gear
            </h3>
            <p className="text-xs text-slate-300 mt-2">
              Experience 4K 120fps with AI upscaling and ultra-low latency response.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              href="/products?category=gaming-consoles"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Explore Gaming</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 p-8 flex flex-col justify-between min-h-[280px] shadow-xl group">
          <div className="absolute right-0 top-0 w-2/3 h-full opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Audio Headphones"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="relative z-10 max-w-xs">
            <span className="text-xs font-mono uppercase bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
              Studio Grade Sound
            </span>
            <h3 className="text-2xl font-black text-white mt-3 leading-snug">
              Active Noise Cancelling & Spatial Audio
            </h3>
            <p className="text-xs text-slate-300 mt-2">
              Industry-leading soundscapes by Sony, Apple, and Bose with Hi-Res LDAC codecs.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            <Link
              href="/products?category=audio-headphones"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/30"
            >
              <Headphones className="w-4 h-4" />
              <span>Shop Audio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
