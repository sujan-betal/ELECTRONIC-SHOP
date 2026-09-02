'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/90 text-white px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border border-cyan-500/30 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <p className="text-sm font-medium text-slate-100">{toastMessage}</p>
    </div>
  );
}
