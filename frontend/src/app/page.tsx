import React from 'react';
import Link from 'next/link';
import { fetchCategories, fetchProducts } from '@/lib/api';
import HeroBanner from '@/components/home/HeroBanner';
import BrandLogos from '@/components/home/BrandLogos';
import CategoryGrid from '@/components/home/CategoryGrid';
import FlashDeals from '@/components/home/FlashDeals';
import PromoBanners from '@/components/home/PromoBanners';
import CustomerReviewsSection from '@/components/home/CustomerReviewsSection';
import TechNewsletter from '@/components/home/TechNewsletter';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Sparkles, Zap, Flame } from 'lucide-react';

export default async function HomePage() {
  const categories = await fetchCategories();
  const { items: products } = await fetchProducts({ limit: 12 });

  const featuredProducts = products.filter((p) => p.is_featured);
  const newArrivals = products.filter((p) => p.is_new_arrival);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 1. Hero Showcase */}
      <HeroBanner />

      {/* 2. Official Manufacturer Partner Logos */}
      <BrandLogos />

      {/* 3. Category Grid */}
      <CategoryGrid categories={categories} />

      {/* 4. Flash Deals Countdown Container */}
      <FlashDeals products={products} />

      {/* 5. Featured Flagships Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Featured Flagships
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors font-mono"
          >
            <span>View all {products.length} devices</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Dual Cyber Banners */}
      <PromoBanners />

      {/* 7. New In The Lab (2026 Releases) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Latest 2026 Releases
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              New In The Lab
            </h2>
          </div>
          <Link
            href="/products?new_arrival=true"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group transition-colors font-mono"
          >
            <span>Explore all new gear</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(newArrivals.length > 0 ? newArrivals : products.slice(4, 8)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Customer Experience Testimonials */}
      <CustomerReviewsSection />

      {/* 9. VIP Newsletter Section */}
      <TechNewsletter />
    </div>
  );
}
