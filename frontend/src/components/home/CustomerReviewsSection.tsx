import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Marcus Sterling',
    role: 'Lead iOS Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    device: 'iPhone 16 Pro Max 256GB',
    rating: 5,
    text: 'Delivered within 24 hours with unbroken factory warranty seal. The titanium chassis and A18 Pro benchmark numbers are genuinely desktop-class.',
    date: 'Verified Buyer • 2 days ago'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'VFX & 3D Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    device: 'MacBook Pro 16" M3 Max',
    rating: 5,
    text: 'Rendering 8K ProRes footage on the Liquid Retina XDR screen without thermal throttling. The best workstation investment of the year.',
    date: 'Verified Buyer • 5 days ago'
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Competitive Esports Player',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    device: 'ASUS ROG Zephyrus G16 OLED',
    rating: 5,
    text: 'The 240Hz 0.2ms OLED panel combined with the RTX 4080 offers unbelievable clarity with zero ghosting. TechPulse customer service was top-tier.',
    date: 'Verified Buyer • 1 week ago'
  }
];

export default function CustomerReviewsSection() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest">
          Verified Customer Experiences
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Loved by Tech Professionals & Creators
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-all shadow-lg backdrop-blur-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Purchase
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full object-cover bg-slate-800 border border-cyan-500/30 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{rev.name}</h4>
                <p className="text-[10px] text-cyan-400 font-mono truncate">{rev.role}</p>
                <p className="text-[10px] text-slate-500 truncate">{rev.device}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
