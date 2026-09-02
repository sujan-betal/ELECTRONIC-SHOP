'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from '../products/ProductCard';

interface FlashDealsProps {
  products: Product[];
}

export default function FlashDeals({ products }: FlashDealsProps) {
  // Simple countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => (p.discount_percent && p.discount_percent > 0) || p.is_trending).slice(0, 4);

  if (dealProducts.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container with glowing border */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
                Limited Time Flash Deals
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Tech Flash Sale
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400 mr-1" />
            <span className="text-xs text-slate-400 mr-2 font-medium">Ends in:</span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-black text-white">
              <span className="bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-rose-500/20 text-rose-400 px-2 py-1 rounded-lg border border-rose-500/30">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
