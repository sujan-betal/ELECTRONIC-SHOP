'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Check,
  Zap,
  ArrowUpDown,
  Filter,
  LayoutGrid,
  List,
  Eye,
  ShoppingBag,
  Scale
} from 'lucide-react';
import { Product, Category } from '@/types';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openQuickView, addToCart, toggleCompare, isCompared, formatPrice } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(4000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [cats, prodsData] = await Promise.all([
        fetchCategories(),
        fetchProducts({ limit: 100 })
      ]);
      setCategories(cats);
      setProducts(prodsData.items);
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
    return ['all', ...list];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory) {
        const cat = categories.find(c => c.slug === selectedCategory);
        if (cat && p.category_id !== cat.id) return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // In stock only
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      // Price range
      if (p.price > priceRange) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, categories, selectedCategory, selectedBrand, inStockOnly, searchQuery, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('all');
    setInStockOnly(false);
    setSearchQuery('');
    setPriceRange(4000);
    setSortBy('featured');
    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Electronics Store Catalog
            </span>
            <h1 className="text-3xl font-black text-white mt-1">
              All Products & Hardware
            </h1>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter devices..."
                className="w-full bg-slate-900 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3.5 py-2.5 border border-slate-800 focus:border-cyan-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-400 appearance-none pr-8 cursor-pointer font-mono"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Releases</option>
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle (Grid / List) */}
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/75 border border-slate-800 space-y-6 backdrop-blur-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  Filter Options
                </span>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Categories Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Categories
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === ''
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {cat.product_count !== undefined && (
                        <span className="text-[10px] font-mono text-slate-500">
                          {cat.product_count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Manufacturer Brands
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-none">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                        selectedBrand === b
                          ? 'text-cyan-400 font-bold bg-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="capitalize">{b}</span>
                      {selectedBrand === b && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>In Stock items only</span>
                </label>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Price Ceiling
                  </h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {formatPrice(priceRange)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>{formatPrice(50)}</span>
                  <span>{formatPrice(4000)}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products View Area */}
          <main className="lg:col-span-3">
            {/* Active Filters Pill Bar */}
            {(selectedCategory || selectedBrand !== 'all' || searchQuery || inStockOnly) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-slate-500 font-mono">Active:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-xs">
                    Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                    <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-xs">
                    Brand: {selectedBrand}
                    <button onClick={() => setSelectedBrand('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">
                    Query: &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 rounded-3xl bg-slate-900/60 animate-pulse border border-slate-800" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">No devices found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or adjusting the price filter slider.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 bg-cyan-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div>
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  Showing <strong>{filteredProducts.length}</strong> flagship devices
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              /* Detailed List View Mode */
              <div className="space-y-4">
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  Showing <strong>{filteredProducts.length}</strong> flagship devices
                </p>
                {filteredProducts.map((product) => {
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
                      className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                    >
                      <div className="w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative">
                        <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        {product.discount_percent && product.discount_percent > 0 && (
                          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full font-mono">
                            {product.discount_percent}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            {product.brand}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="text-white font-mono font-bold">{product.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Specs row */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {Object.entries(specsObj).slice(0, 3).map(([k, v]) => (
                            <span key={k} className="text-[10px] text-slate-300 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 space-y-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                        <div className="text-xl font-black text-cyan-400 font-mono">
                          {formatPrice(product.price)}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openQuickView(product)}
                            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="flex-1 sm:flex-initial bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono">Loading Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
