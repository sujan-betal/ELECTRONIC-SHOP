'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Check,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  MessageSquare,
  Scale,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Product, Review } from '@/types';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isCompared,
    formatPrice,
    openCart
  } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedStorage, setSelectedStorage] = useState<string>('256 GB');
  const [selectedColor, setSelectedColor] = useState<string>('Titanium Gray');
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [isLoading, setIsLoading] = useState(true);

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setIsLoading(true);
      const prod = await fetchProductBySlug(slug);
      if (prod) {
        setProduct(prod);
        setSelectedImage(prod.image_url);
        setReviewsList(prod.reviews || []);

        // Load related items
        const related = await fetchProducts({ category_id: prod.category_id, limit: 4 });
        setRelatedProducts(related.items.filter(p => p.id !== prod.id));
      }
      setIsLoading(false);
    }
    loadData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono">Loading product engineering specifications...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <h2 className="text-2xl font-black mb-2">Device Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The electronic device you are looking for does not exist or has been relocated.</p>
        <Link href="/products" className="bg-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs font-mono">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Parse Gallery Images
  let gallery: string[] = [product.image_url];
  if (product.gallery_images) {
    try {
      const parsed = typeof product.gallery_images === 'string' ? JSON.parse(product.gallery_images) : product.gallery_images;
      if (Array.isArray(parsed) && parsed.length > 0) gallery = parsed;
    } catch (e) {
      // fallback
    }
  }

  // Parse Features
  let featuresList: string[] = [];
  if (product.features) {
    try {
      const parsed = typeof product.features === 'string' ? JSON.parse(product.features) : product.features;
      if (Array.isArray(parsed)) featuresList = parsed;
    } catch (e) {
      // fallback
    }
  }

  // Parse Specs
  let specsObj: Record<string, string> = {};
  if (product.specs) {
    try {
      const parsed = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
      if (typeof parsed === 'object') specsObj = parsed;
    } catch (e) {
      // fallback
    }
  }

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    const newRev: Review = {
      id: Math.floor(Math.random() * 10000),
      product_id: product.id,
      user_name: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      created_at: new Date().toISOString()
    };

    setReviewsList(prev => [newRev, ...prev]);
    setReviewerName('');
    setReviewComment('');
    alert('Thank you! Your verified review has been published.');
  };

  const colors = [
    { name: 'Titanium Gray', hex: '#64748b' },
    { name: 'Space Black', hex: '#0f172a' },
    { name: 'Pure Platinum', hex: '#cbd5e1' },
  ];

  const storages = ['256 GB', '512 GB', '1 TB'];

  return (
    <div className="min-h-screen bg-slate-950 py-10 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Photo */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
              <img
                src={selectedImage || product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount_percent && product.discount_percent > 0 && (
                  <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg shadow-rose-500/40 uppercase">
                    SAVE {product.discount_percent}%
                  </span>
                )}
                {product.is_new_arrival && (
                  <span className="bg-cyan-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full shadow-md shadow-cyan-500/30 font-mono">
                    2026 EDITION
                  </span>
                )}
              </div>

              {/* Wishlist & Compare Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3 rounded-2xl backdrop-blur-md transition-all ${
                    compared
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Compare"
                >
                  <Scale className="w-5 h-5" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-2xl backdrop-blur-md transition-all ${
                    wishlisted
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-cyan-400 ring-2 ring-cyan-500/20 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Details & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Stock */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg border border-cyan-500/20 font-bold">
                  {product.brand} Flagship
                </span>
                {product.stock > 0 ? (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units ready)
                  </span>
                ) : (
                  <span className="text-xs text-rose-400 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-white font-mono">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  ({reviewsList.length} verified reviews)
                </span>
              </div>
            </div>

            {/* Price Card */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-cyan-400 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-base text-slate-500 line-through font-mono">
                    {formatPrice(product.original_price)}
                  </span>
                )}
                {product.discount_percent && product.discount_percent > 0 && (
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-mono">
                    Save {formatPrice(product.original_price! - product.price)}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Official warranty included. Worldwide express delivery insured.
              </p>
            </div>

            {/* Color Option Selector */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Color Finish: <strong className="text-cyan-400">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                      selectedColor === c.name
                        ? 'border-cyan-400 bg-cyan-500/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Option Selector */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Storage Capacity: <strong className="text-cyan-400">{selectedStorage}</strong>
              </span>
              <div className="flex items-center gap-2">
                {storages.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                      selectedStorage === st
                        ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-medium">Quantity:</span>
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold font-mono text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all text-xs disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    openCart();
                  }}
                  disabled={product.stock <= 0}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 border border-slate-700 transition-all text-xs disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>

            {/* Guarantee Perquisites */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Express Insured Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>2-Year Full Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
                <span>30-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Tabs: Specifications, Features, Customer Reviews */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex gap-6 border-b border-slate-800 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-bold pb-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Hardware Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`text-sm font-bold pb-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'features'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Key Features & Performance
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          <div className="py-8">
            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                {Object.keys(specsObj).length > 0 ? (
                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-3xl bg-slate-900/60 overflow-hidden">
                    {Object.entries(specsObj).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-3 p-4 text-xs">
                        <span className="font-semibold text-slate-400">{key}</span>
                        <span className="col-span-2 text-white font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Detailed hardware specs sheet provided with retail packaging.</p>
                )}
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="max-w-3xl space-y-3">
                {featuresList.length > 0 ? (
                  featuresList.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-200 leading-relaxed">{feat}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Premium craftsmanship with official manufacturer testing certification.</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Rating Breakdown Summary */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-6">
                    <div className="text-center shrink-0">
                      <span className="text-4xl font-black text-white font-mono">{product.rating.toFixed(1)}</span>
                      <div className="flex items-center text-amber-400 justify-center mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block font-mono">{reviewsList.length} Ratings</span>
                    </div>

                    <div className="flex-1 space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span>5★</span>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full w-[85%]" />
                        </div>
                        <span className="font-mono">85%</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span>4★</span>
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full w-[15%]" />
                        </div>
                        <span className="font-mono">15%</span>
                      </div>
                    </div>
                  </div>

                  {reviewsList.length === 0 ? (
                    <p className="text-xs text-slate-400">No reviews yet. Be the first to review this device!</p>
                  ) : (
                    reviewsList.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.user_avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.user_name}`}
                              alt={rev.user_name}
                              className="w-7 h-7 rounded-full bg-slate-800"
                            />
                            <span className="text-xs font-bold text-white">{rev.user_name}</span>
                          </div>
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Submit Form */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    Write a Verified Review
                  </h4>

                  <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="Alex V."
                        className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-400"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 - Incredible Performance)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                        <option value={3}>⭐⭐⭐ (3 - Average)</option>
                        <option value={2}>⭐⭐ (2 - Below Expectation)</option>
                        <option value={1}>⭐ (1 - Disappointed)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Your Feedback</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share build quality, display brightness, battery life..."
                        className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-black text-white mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Bar for Mobile Devices */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-900/95 border-t border-slate-800 p-3.5 backdrop-blur-xl flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Price</span>
          <span className="text-lg font-black text-cyan-400 font-mono">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={() => addToCart(product, quantity)}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
