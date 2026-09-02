'use client';

import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TechNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TechPulse Insider Club</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Unlock $50 OFF Your First Flagship Order
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Subscribe for zero-spam hardware drops, exclusive early-bird flash discounts, and benchmark analyses.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Awesome! You have unlocked coupon <strong className="font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/50">TECH10</strong> (10% off).
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your tech work email..."
                className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs rounded-2xl px-4 py-3.5 border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
            <span>🔒 No Spam Guarantee</span>
            <span>•</span>
            <span>⚡ Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
