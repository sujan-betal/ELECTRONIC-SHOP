'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Zap, Check, Eye, Scale } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    toggleCompare,
    isCompared,
    formatPrice
  } = useCart();

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const [isHovered, setIsHovered] = useState(false);

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

  // Parse gallery images for hover preview if available
  let hoverImage = product.image_url;
  if (product.gallery_images) {
    try {
      const parsed = typeof product.gallery_images === 'string' ? JSON.parse(product.gallery_images) : product.gallery_images;
      if (Array.isArray(parsed) && parsed.length > 1) {
        hoverImage = parsed[1];
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-slate-900/75 border border-slate-800/90 hover:border-cyan-500/50 rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 backdrop-blur-sm"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square rounded-2xl bg-slate-950 overflow-hidden mb-4 border border-slate-800/80">
        <img
          src={isHovered ? hoverImage : product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount_percent && product.discount_percent > 0 ? (
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30 tracking-wider uppercase">
              {product.discount_percent}% OFF
            </span>
          ) : null}
          {product.is_new_arrival && (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md shadow-cyan-500/30 font-mono">
              NEW
            </span>
          )}
        </div>

        {/* Action Overlay Buttons (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              wishlisted
                ? 'bg-rose-500 text-white shadow-rose-500/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Add to Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              compared
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Compare Specs"
            aria-label="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick View Button (Reveals on card hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 text-white text-xs font-bold py-2 rounded-xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-1.5 transition-all shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Brand Chip */}
        <span className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-[10px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
          {product.brand}
        </span>
      </div>

      {/* Information Area */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Stock */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-200 font-mono">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-500 font-mono">({product.review_count})</span>
            {product.stock > 0 ? (
              <span className="ml-auto text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                <Check className="w-3 h-3" /> Ready
              </span>
            ) : (
              <span className="ml-auto text-[10px] text-rose-400 font-medium">Sold Out</span>
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
            <p className="text-[10px] text-slate-400 mt-1.5 truncate font-mono bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
              ⚡ {firstSpec}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-cyan-400 font-mono">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-[11px] text-slate-500 line-through font-mono">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
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
