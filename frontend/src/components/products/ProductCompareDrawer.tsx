'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  X,
  ChevronDown,
  ShoppingBag,
  Star,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCompareDrawer() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareDrawerOpen,
    openCompareDrawer,
    closeCompareDrawer,
    addToCart,
    formatPrice
  } = useCart();

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Dock (when minimized) */}
      {!isCompareDrawerOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>{compareList.length} Devices in Compare</span>
          </div>

          <div className="flex -space-x-2">
            {compareList.map((p) => (
              <img
                key={p.id}
                src={p.image_url}
                alt={p.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-slate-900 bg-slate-950"
              />
            ))}
          </div>

          <button
            onClick={openCompareDrawer}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all shadow-md shadow-cyan-500/20"
          >
            Compare Now
          </button>

          <button
            onClick={clearCompare}
            className="text-slate-400 hover:text-rose-400 p-1"
            title="Clear all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Full Compare Modal View */}
      {isCompareDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Device Comparison Matrix</h3>
                  <p className="text-xs text-slate-400">Comparing technical specs and features side-by-side.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-xs text-rose-400 hover:underline font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={closeCompareDrawer}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="flex-1 overflow-x-auto p-6">
              <div className="grid grid-flow-col auto-cols-[240px] sm:auto-cols-[280px] gap-6">
                {compareList.map((product) => {
                  let specsObj: Record<string, string> = {};
                  if (product.specs) {
                    try {
                      const parsed = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
                      if (typeof parsed === 'object') specsObj = parsed;
                    } catch (e) {
                      // fallback
                    }
                  }

                  return (
                    <div
                      key={product.id}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        {/* Remove & Image */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-3">
                          <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-rose-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {product.brand}
                        </span>

                        <h4 className="text-sm font-bold text-white mt-1 line-clamp-2">
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-1 mt-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-xs font-bold text-white font-mono">{product.rating.toFixed(1)}</span>
                        </div>

                        <div className="text-lg font-black text-cyan-400 font-mono mt-2">
                          {formatPrice(product.price)}
                        </div>

                        {/* Specs list */}
                        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
                          {Object.entries(specsObj).map(([k, v]) => (
                            <div key={k} className="p-1.5 rounded bg-slate-900 border border-slate-800/80">
                              <span className="text-[10px] text-slate-400 block font-semibold">{k}</span>
                              <span className="text-white font-mono text-[11px] truncate block">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeCompareDrawer}
                          className="block text-center text-[11px] text-slate-400 hover:text-cyan-400 font-medium py-1"
                        >
                          View Full Details →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
