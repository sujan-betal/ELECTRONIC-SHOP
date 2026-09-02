import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Award,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
            About TechPulse Electronics
          </span>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Pioneering The Future Of Consumer Electronics
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Founded with an obsession for speed, precision engineering, and genuine flagship electronics, TechPulse brings the latest breakthroughs from Apple, Sony, Samsung, and beyond right to your door.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">100% Authorized & Genuine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every smartphone, workstation, and audio gadget comes directly from certified brand distributors with original serial numbers and 2-year warranty seals.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Next-Gen Performance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We curate only the highest performing chips, OLED displays, and ultra-fast storage hardware so your creative and gaming sessions remain uncompromised.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">White-Glove Tech Care</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our support team consists of trained hardware and audio technicians ready to assist with setup, driver guidance, and warranty service around the clock.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 text-center space-y-4">
          <h2 className="text-2xl font-black text-white">Ready To Upgrade Your Setup?</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Discover cutting-edge laptops, studio headphones, and smartphones today.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/25"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
