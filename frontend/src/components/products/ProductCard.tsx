'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Zap, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  // Parse key specs or features
  let firstSpec = '';
  if (product.specs) {
    try {
      const specsObj = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
      const keys = Object.keys(specsObj);
      if (keys.length > 0) {
        firstSpec = `${keys[0]}: ${specsObj[keys[0]]}`;
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="group relative bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top Badges */}
      <div className="relative aspect-square rounded-2xl bg-slate-950 overflow-hidden mb-4 border border-slate-800/80">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount_percent && product.discount_percent > 0 ? (
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30 tracking-wider uppercase">
              {product.discount_percent}% OFF
            </span>
          ) : null}
          {product.is_new_arrival && (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md shadow-cyan-500/30">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Brand Chip */}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/20">
          {product.brand}
        </span>
      </div>

      {/* Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-200">{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-500 font-mono">({product.review_count})</span>
            {product.stock > 0 ? (
              <span className="ml-auto text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                <Check className="w-3 h-3" /> In Stock
              </span>
            ) : (
              <span className="ml-auto text-[10px] text-rose-400 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group/link">
            <h3 className="text-sm font-bold text-white group-hover/link:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Key Spec Snippet */}
          {firstSpec && (
            <p className="text-[11px] text-slate-400 mt-1.5 truncate font-mono bg-slate-950/40 px-2 py-0.5 rounded border border-slate-800">
              ⚡ {firstSpec}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-cyan-400 font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xs text-slate-500 line-through font-mono">
                  ${product.original_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
            title="Add to Cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
