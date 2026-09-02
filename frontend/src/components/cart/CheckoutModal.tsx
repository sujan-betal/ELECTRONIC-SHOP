'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Banknote,
  Lock,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/lib/api';
import { Order } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, subtotal, discount, shipping, totalPrice, clearCart, closeCart } = useCart();
  const { user, token } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [address, setAddress] = useState('742 Innovation Way, Suite 400');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94107');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'cod'>('card');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        shipping_address: address,
        city: city,
        postal_code: postalCode,
        payment_method: paymentMethod,
        items: cart.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.image_url,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      const order = await createOrder(orderPayload, token || undefined);
      setConfirmedOrder(order);
      clearCart();

      // Trigger victory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Order submission failed:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {confirmedOrder ? 'Order Confirmed!' : 'Secure Express Checkout'}
              </h3>
              <p className="text-xs text-slate-400">
                {confirmedOrder ? 'Thank you for your purchase.' : '256-Bit Encrypted Transaction'}
              </p>
            </div>
          </div>
          <button
            onClick={confirmedOrder ? handleFinish : onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                Order Reference: {confirmedOrder.order_number}
              </span>
              <h2 className="text-2xl font-black text-white mt-3">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                A confirmation email with shipping tracker and tax invoice has been sent to{' '}
                <strong className="text-slate-200">{confirmedOrder.customer_email}</strong>.
              </p>
            </div>

            {/* Order summary pill */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-400">
                <span>Shipping to:</span>
                <span className="text-white font-medium">{confirmedOrder.shipping_address}, {confirmedOrder.city}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span className="text-white font-medium uppercase">{confirmedOrder.payment_method}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2 font-bold text-sm">
                <span className="text-white">Total Paid:</span>
                <span className="text-cyan-400 font-mono">${confirmedOrder.total_amount.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-cyan-500/25 transition-all text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Customer & Delivery Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Tech Blvd"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="94107"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Select Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-medium transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-rose-400 bg-rose-500/10 text-rose-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>bKash / Nagad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-medium transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-cyan-400">
                  <span>Coupon Savings</span>
                  <span className="font-mono">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Express Shipping</span>
                <span className="font-mono text-white">
                  {shipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="font-mono text-cyan-400 text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-500/25 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Order...' : `Pay $${totalPrice.toFixed(2)} & Place Order`}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
