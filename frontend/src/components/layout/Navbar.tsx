'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Watch,
  Scale,
  Globe,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types';

export default function Navbar() {
  const router = useRouter();
  const { totalItems, wishlist, compareList, openCart, openCompareDrawer, currency, setCurrency, formatPrice } = useCart();
  const { user, logout, openLoginModal } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Live autocomplete search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const delay = setTimeout(async () => {
      setIsSearching(true);
      const res = await fetchProducts({ search: searchQuery.trim(), limit: 5 });
      setSearchResults(res.items);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults([]);
      setMobileMenuOpen(false);
    }
  };

  const categoriesNav = [
    { name: 'All Gadgets', href: '/products', icon: Zap },
    { name: 'Smartphones', href: '/products?category=smartphones-tablets', icon: Smartphone },
    { name: 'Laptops', href: '/products?category=laptops-computers', icon: Laptop },
    { name: 'Hi-Fi Audio', href: '/products?category=audio-headphones', icon: Headphones },
    { name: 'Wearables', href: '/products?category=wearables-watches', icon: Watch },
    { name: 'Gaming Consoles', href: '/products?category=gaming-consoles', icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-slate-950/85 border-b border-slate-800/80 transition-all shadow-lg shadow-black/20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-cyan-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-between border-b border-cyan-500/15 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>CYBER SALE: Use code <strong className="text-white font-mono bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-500/30">TECH10</strong> for 10% OFF</span>
          <span className="hidden md:inline text-cyan-500/50">•</span>
          <span className="hidden md:inline">🚚 Free Worldwide Express Shipping Over $500</span>
        </div>

        {/* Currency Switcher */}
        <div className="hidden sm:flex items-center gap-2 relative">
          <button
            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-slate-700/80 transition-all font-mono"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{currency}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {currencyDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 text-xs font-mono">
              {(['USD', 'EUR', 'BDT'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 transition-colors ${
                    currency === curr ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-300'
                  }`}
                >
                  {curr === 'USD' ? 'USD ($)' : curr === 'EUR' ? 'EUR (€)' : 'BDT (৳)'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <Zap className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">PULSE</span>
              </span>
              <span className="block text-[10px] tracking-widest text-cyan-400/80 uppercase font-semibold -mt-1 font-mono">
                Next-Gen Electronics
              </span>
            </div>
          </Link>

          {/* Live Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MacBook, iPhone, RTX 4080, Sony..."
                className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-xs rounded-2xl pl-11 pr-24 py-3 border border-slate-700/80 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all shadow-md shadow-cyan-500/25"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700/90 rounded-2xl shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase px-3 py-1 block">
                  Quick Matching Products:
                </span>
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => setSearchResults([])}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 transition-colors group"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.brand} • {item.rating.toFixed(1)} ★
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {formatPrice(item.price)}
                    </span>
                  </Link>
                ))}
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setSearchResults([])}
                  className="block text-center text-xs font-bold text-cyan-400 hover:underline py-2 border-t border-slate-800 mt-1"
                >
                  View all search results →
                </Link>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Drawer Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={openCompareDrawer}
                className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
                title="Device Comparison"
              >
                <Scale className="w-5 h-5 text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-slate-950 text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40 font-mono">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist Icon */}
            <Link
              href="/products"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 font-mono">
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
                  <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md shadow-cyan-500/40 animate-pulse font-mono">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-slate-200 font-mono">
                Cart
              </span>
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
                    <span className="hidden sm:inline text-xs font-semibold text-slate-200 max-w-[90px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
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
                        <span>Track My Orders</span>
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
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-semibold"
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
                  className="flex items-center gap-1.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-100 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700/80 transition-all shadow-sm"
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
              aria-label="Toggle Menu"
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
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all whitespace-nowrap group"
              >
                <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                <span>{cat.name}</span>
              </Link>
            );
          })}
          <div className="ml-auto flex items-center gap-4 text-xs font-medium text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">24/7 Support</Link>
            <Link href="/orders" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
              Live Order Tracker
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-5 animate-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gadgets..."
                className="w-full bg-slate-950 text-white placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-700"
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
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 text-slate-200 text-xs font-semibold hover:bg-cyan-500/20 hover:text-cyan-400"
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
