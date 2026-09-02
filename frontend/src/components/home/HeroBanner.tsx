'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Flame,
  Cpu,
  Award,
  ShieldCheck,
  ChevronRight,
  Eye,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Flagship Smartphone',
    title: 'iPhone 16 Pro Max',
    highlight: 'Titanium Architecture.',
    desc: 'Crafted with Grade 5 Aerospace Titanium, A18 Pro 3nm silicon, and 48MP Fusion Camera Control.',
    price: 1199,
    originalPrice: 1299,
    slug: 'iphone-16-pro-max',
    badge: 'A18 Pro Silicon',
    badgeIcon: Cpu,
    img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    colorName: 'Natural Titanium',
    specs: ['6.9" 120Hz ProMotion', 'A18 Pro (3nm)', '5x Optical Zoom']
  },
  {
    id: 2,
    tag: 'Extreme Gaming Laptop',
    title: 'ROG Zephyrus G16',
    highlight: '240Hz OLED & RTX 4080.',
    desc: 'Ultra-thin CNC machined aluminum armor with Intel Core Ultra 9 and NVIDIA GeForce RTX 4080 graphics.',
    price: 2699,
    originalPrice: 2899,
    slug: 'asus-rog-zephyrus-g16',
    badge: 'NVIDIA RTX 4080',
    badgeIcon: Zap,
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    colorName: 'Eclipse Gray',
    specs: ['2.5K 240Hz 0.2ms OLED', 'RTX 4080 12GB', '32GB LPDDR5X']
  },
  {
    id: 3,
    tag: 'Pro Creative Studio',
    title: 'MacBook Pro 16" M3 Max',
    highlight: 'Unstoppable Processing.',
    desc: 'Breathtaking 16.2" Liquid Retina XDR screen with 16-Core CPU, 40-Core GPU, and 22-hour battery life.',
    price: 3499,
    originalPrice: 3799,
    slug: 'macbook-pro-16-m3-max',
    badge: 'M3 Max 16-Core',
    badgeIcon: Cpu,
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    colorName: 'Space Black',
    specs: ['16.2" Liquid Retina XDR', '48GB Unified RAM', '1TB NVMe SSD']
  },
  {
    id: 4,
    tag: 'Next-Gen Gaming',
    title: 'PlayStation 5 Pro 2TB',
    highlight: 'PSSR AI 4K Upscaling.',
    desc: 'Featuring 67% more GPU compute units, advanced Ray Tracing acceleration, and 2TB custom ultra-fast SSD.',
    price: 699.99,
    originalPrice: 749.99,
    slug: 'playstation-5-pro',
    badge: 'PSSR AI 4K 120fps',
    badgeIcon: Award,
    img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
    colorName: 'Arctic White',
    specs: ['2TB Custom NVMe', 'PSSR AI Upscaling', 'DualSense Haptics']
  }
];

export default function HeroBanner() {
  const { formatPrice, addToCart } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeIdx];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:py-20">
      {/* Dynamic Background Lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Device Switcher Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {HERO_SLIDES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeIdx === idx
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20 scale-105'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeIdx === idx ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Slide Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 tracking-wide uppercase">
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {slide.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {slide.desc}
            </p>

            {/* Spec Highlights Grid */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {slide.specs.map((spec, i) => (
                <span
                  key={i}
                  className="bg-slate-900/90 text-slate-200 text-xs font-mono px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-sm"
                >
                  ⚡ {spec}
                </span>
              ))}
            </div>

            {/* Price & CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="text-left bg-slate-900/80 border border-slate-800 px-5 py-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Special Launch Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-cyan-400 font-mono">
                    {formatPrice(slide.price)}
                  </span>
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {formatPrice(slide.originalPrice)}
                  </span>
                </div>
              </div>

              <Link
                href={`/product/${slide.slug}`}
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                <span>View Full Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-lg font-black text-white font-mono">100%</span>
                <span className="text-xs text-slate-400">Authentic Flagship</span>
              </div>
              <div>
                <span className="block text-lg font-black text-cyan-400 font-mono">2-Year</span>
                <span className="text-xs text-slate-400">Official Warranty</span>
              </div>
              <div>
                <span className="block text-lg font-black text-indigo-400 font-mono">Free</span>
                <span className="text-xs text-slate-400">Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glowing Holographic Border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-cyan-500/50 via-indigo-500/30 to-purple-500/50 shadow-2xl shadow-cyan-500/20">
                <div className="bg-slate-950 rounded-[22px] overflow-hidden p-6 border border-slate-800/90 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-6 shadow-inner">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 font-mono">
                      ● {slide.colorName}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Flagship Spotlight
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                        Ready To Ship
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Chip Spec Badge */}
              <div className="absolute -top-6 -left-6 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 hidden sm:flex animate-float">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BadgeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Hardware Core</p>
                  <p className="text-xs font-bold text-white font-mono">{slide.badge}</p>
                </div>
              </div>

              {/* Floating Guarantee Badge */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Protection Seal</p>
                  <p className="text-xs font-bold text-white">2-Year Full Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
