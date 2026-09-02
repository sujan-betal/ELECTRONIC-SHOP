import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CreditCard,
  Lock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      {/* Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all tech orders over $500</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">2-Year Full Warranty</h4>
              <p className="text-xs text-slate-400">100% Genuine authorized items</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-400">Hassle-free refund policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Expert Support</h4>
              <p className="text-xs text-slate-400">Direct audio & hardware engineers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Bio */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">PULSE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Your premier destination for flagship smartphones, next-gen gaming gear, audiophile headphones, and professional computing hardware.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Silicon Avenue, Tech City, CA 94016</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+1 (800) 832-4767 (TECH-PULSE)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>support@techpulse.shop</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Shop Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products?category=smartphones-tablets" className="hover:text-cyan-400 transition-colors">Smartphones & Tablets</Link></li>
              <li><Link href="/products?category=laptops-computers" className="hover:text-cyan-400 transition-colors">Laptops & Workstations</Link></li>
              <li><Link href="/products?category=audio-headphones" className="hover:text-cyan-400 transition-colors">Hi-Fi Audio & Earbuds</Link></li>
              <li><Link href="/products?category=gaming-consoles" className="hover:text-cyan-400 transition-colors">Gaming & VR Consoles</Link></li>
              <li><Link href="/products?category=cameras-drones" className="hover:text-cyan-400 transition-colors">Cameras & 4K Drones</Link></li>
              <li><Link href="/products?category=accessories-power" className="hover:text-cyan-400 transition-colors">GaN Fast Power Banks</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Customer Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/orders" className="hover:text-cyan-400 transition-colors">Track Your Order</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/admin" className="hover:text-cyan-400 transition-colors">Store Admin</Link></li>
              <li><Link href="/products" className="hover:text-cyan-400 transition-colors">Compare Products</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive early-access deals and tech giveaways.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 text-slate-200 placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20">
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} TechPulse Electronics Inc. Built with Next.js & FastAPI.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-300" />
              <span>Cards • bKash • COD • PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
