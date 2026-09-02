'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Truck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    totalPrice,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={closeCart}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">Your Tech Cart</h3>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {cart.length} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-slate-950/50 p-3.5 border-b border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <Truck className="w-3.5 h-3.5" />
                  <span>
                    {amountToFreeShipping === 0
                      ? '🎉 You unlocked Free Worldwide Shipping!'
                      : `Add $${amountToFreeShipping.toFixed(2)} more for Free Express Delivery`}
                  </span>
                </div>
                <span className="text-slate-400 font-mono">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-500">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">Your cart is empty</h4>
                    <p className="text-xs mt-1 text-slate-400">
                      Discover the latest gadgets and electronics waiting for you.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/30 transition-all"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-cyan-400 font-mono">
                          {item.product.brand}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-white font-mono">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
                {/* Coupon Box */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (Try: TECH10)"
                      className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 uppercase"
                    />
                    <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <button
                    onClick={() => {
                      if (inputCoupon) {
                        applyCoupon(inputCoupon);
                        setInputCoupon('');
                      }
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700"
                  >
                    Apply
                  </button>
                </div>

                {couponCode && (
                  <div className="flex items-center justify-between text-xs bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Promo <strong>{couponCode}</strong> applied
                    </span>
                    <button onClick={removeCoupon} className="text-slate-400 hover:text-rose-400 font-bold">
                      ✕
                    </button>
                  </div>
                )}

                {/* Costs breakdown */}
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-cyan-400">
                      <span>Discount</span>
                      <span className="font-mono">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono text-white">
                      {shipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="font-mono text-cyan-400 text-base">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
}
