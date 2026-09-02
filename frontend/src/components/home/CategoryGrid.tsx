import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Camera,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { Category } from '@/types';

const iconMap: Record<string, any> = {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Camera,
  Cpu
};

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Explore Tech Categories
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1 group transition-colors"
        >
          <span>View all inventory</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon || 'Cpu'] || Cpu;
          return (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between min-h-[160px] sm:min-h-[190px] transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              {/* Category Background image overlay */}
              {category.image && (
                <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="p-1.5 rounded-xl bg-slate-800/50 text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 mt-4">
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {category.product_count !== undefined ? `${category.product_count} Products` : 'Explore Items'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
