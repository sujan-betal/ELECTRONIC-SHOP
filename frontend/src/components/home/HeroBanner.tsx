'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Flame, Cpu, Shield, Award } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                Next-Gen Flagship Electronics 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Elevate Your World With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                Pure Innovation.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore the pinnacle of modern technology. From 3nm flagship smartphones and M3 Max workstations to audiophile ANC sound and next-gen gaming powerhouses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Shop All Gadgets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products?featured=true"
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2 text-sm backdrop-blur-md"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Featured Tech</span>
              </Link>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-xl font-black text-white font-mono">100%</span>
                <span className="text-xs text-slate-400">Original & Authentic</span>
              </div>
              <div>
                <span className="block text-xl font-black text-cyan-400 font-mono">2-Year</span>
                <span className="text-xs text-slate-400">Official Warranty</span>
              </div>
              <div>
                <span className="block text-xl font-black text-indigo-400 font-mono">24/7</span>
                <span className="text-xs text-slate-400">Tech Support</span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Central Glowing Card */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-cyan-500/40 via-indigo-500/20 to-purple-500/40 shadow-2xl shadow-cyan-500/20">
                <div className="bg-slate-950 rounded-[22px] overflow-hidden p-6 border border-slate-800">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80"
                      alt="iPhone 16 Pro Max Titanium"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                      ⚡ Grade 5 Titanium
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        Flagship Spotlight
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        In Stock
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white">
                      iPhone 16 Pro Max 256GB
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-2xl font-black text-white font-mono">$1,199.00</span>
                        <span className="text-xs text-slate-500 line-through font-mono ml-2">$1,299.00</span>
                      </div>
                      <Link
                        href="/product/iphone-16-pro-max"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20"
                      >
                        View Specs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Spec Badge 1 */}
              <div className="absolute -top-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Processing Unit</p>
                  <p className="text-xs font-bold text-white">Apple A18 Pro (3nm)</p>
                </div>
              </div>

              {/* Floating Spec Badge 2 */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Sound Stage</p>
                  <p className="text-xs font-bold text-white">Hi-Res ANC Audio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
