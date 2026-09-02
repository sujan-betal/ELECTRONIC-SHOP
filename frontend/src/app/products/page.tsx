'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Check,
  Zap,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { Product, Category } from '@/types';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // Extract all unique brands
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
  }, [products, categories, selectedCategory, selectedBrand, searchQuery, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('all');
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
              All Products & Gadgets
            </h1>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-slate-900 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3.5 py-2.5 border border-slate-800 focus:border-cyan-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 text-white text-xs font-medium rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-400 appearance-none pr-8 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Releases</option>
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
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
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  Filters
                </span>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-cyan-400 hover:underline font-medium"
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
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === ''
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold'
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
                  Brands
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                        selectedBrand === b
                          ? 'text-cyan-400 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="capitalize">{b}</span>
                      {selectedBrand === b && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    ${priceRange}
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
                  <span>$50</span>
                  <span>$4,000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {/* Active filters pill list */}
            {(selectedCategory || selectedBrand !== 'all' || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-slate-500">Active:</span>
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
                <h3 className="text-lg font-bold text-white">No products found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your search query, price slider, or category filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 bg-cyan-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  Showing <strong>{filteredProducts.length}</strong> tech devices
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xs bg-slate-900 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-white text-sm">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Categories</h4>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedCategory(''); setMobileFilterOpen(false); }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-300"
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setMobileFilterOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                      selectedCategory === cat.slug ? 'text-cyan-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Max Price</span>
                <span className="font-mono text-cyan-400">${priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="4000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-cyan-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
