'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { totalItems, wishlist, openCart } = useCart();
  const { user, logout, openLoginModal } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const categoriesNav = [
    { name: 'All Products', href: '/products', icon: Zap },
    { name: 'Phones', href: '/products?category=smartphones-tablets', icon: Smartphone },
    { name: 'Laptops', href: '/products?category=laptops-computers', icon: Laptop },
    { name: 'Audio', href: '/products?category=audio-headphones', icon: Headphones },
    { name: 'Wearables', href: '/products?category=wearables-watches', icon: Watch },
    { name: 'Gaming', href: '/products?category=gaming-consoles', icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-indigo-900 to-purple-900 text-cyan-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>CYBER WEEK: Get 10% OFF with code <strong className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/20">TECH10</strong></span>
        <span className="hidden md:inline text-cyan-400">•</span>
        <span className="hidden md:inline">🚚 Free Express Delivery on orders over $500</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">PULSE</span>
              </span>
              <span className="block text-[10px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                Electronics Lab
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MacBook, iPhone, RTX 4080, Sony..."
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-sm rounded-full pl-12 pr-24 py-2.5 border border-slate-700/70 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all shadow-md shadow-cyan-500/20"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Icon */}
            <Link
              href="/products"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-2 group"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md shadow-cyan-500/40 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-medium text-slate-300">Cart</span>
            </button>

            {/* User Account / Auth */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/70 border border-slate-700/60 transition-all"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-7 h-7 rounded-full bg-slate-800 border border-cyan-500/40"
                    />
                    <span className="hidden sm:inline text-xs font-medium text-slate-200 max-w-[90px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        href="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                        <span>Store Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-100 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 transition-all shadow-sm"
                >
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar - Desktop */}
        <nav className="hidden md:flex items-center gap-1 py-2.5 border-t border-slate-800/60 overflow-x-auto scrollbar-none">
          {categoriesNav.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                <span>{cat.name}</span>
              </Link>
            );
          })}
          <div className="ml-auto flex items-center gap-3 text-xs text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
            <span>•</span>
            <Link href="/orders" className="hover:text-cyan-400 transition-colors">Track Order</Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-5 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-950 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-700"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </form>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {categoriesNav.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 text-slate-200 text-xs font-medium hover:bg-cyan-500/20 hover:text-cyan-400"
              >
                <cat.icon className="w-4 h-4 text-cyan-400" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
            <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">
              Track My Order
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">
              Admin Dashboard
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">
              About TechPulse
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-400">
              Customer Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
