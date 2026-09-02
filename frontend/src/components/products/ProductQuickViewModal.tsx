'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Scale,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductQuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isCompared,
    formatPrice
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  let gallery: string[] = [product.image_url];
  if (product.gallery_images) {
    try {
      const parsed = typeof product.gallery_images === 'string' ? JSON.parse(product.gallery_images) : product.gallery_images;
      if (Array.isArray(parsed) && parsed.length > 0) gallery = parsed;
    } catch (e) {
      // fallback
    }
  }

  let featuresList: string[] = [];
  if (product.features) {
    try {
      const parsed = typeof product.features === 'string' ? JSON.parse(product.features) : product.features;
      if (Array.isArray(parsed)) featuresList = parsed.slice(0, 3);
    } catch (e) {
      // fallback
    }
  }

  const activeImage = selectedImg || product.image_url;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-2xl bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discount_percent && product.discount_percent > 0 && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30 uppercase">
                  {product.discount_percent}% OFF
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Overview */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                  {product.brand} Flagship
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>In Stock</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-white font-mono">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-500 font-mono">({product.review_count} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-slate-800">
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              {/* Feature Highlights */}
              {featuresList.length > 0 && (
                <div className="space-y-1.5 mt-4">
                  {featuresList.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1.5 text-slate-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    closeQuickView();
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    wishlisted ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-400' : ''}`} />
                  <span>{wishlisted ? 'Wishlisted' : 'Save to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    compared ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{compared ? 'Comparing' : 'Compare Specs'}</span>
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeQuickView}
                  className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
