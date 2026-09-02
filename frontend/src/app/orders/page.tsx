'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Order } from '@/types';

export default function OrdersPage() {
  const [orderQuery, setOrderQuery] = useState('ORD-DEMO2026');
  const [order, setOrder] = useState<Order | null>({
    id: 1,
    order_number: 'ORD-DEMO2026',
    customer_name: 'Alex Vance',
    customer_email: 'alex@example.com',
    customer_phone: '+1 (555) 234-5678',
    shipping_address: '742 Evergreen Terrace',
    city: 'Tech City, CA',
    postal_code: '94016',
    total_amount: 1597.00,
    discount_amount: 79.85,
    shipping_fee: 0.0,
    status: 'delivered',
    payment_method: 'card',
    payment_status: 'paid',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        product_name: 'iPhone 16 Pro Max 256GB - Natural Titanium',
        product_image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
        quantity: 1,
        price: 1199.00,
        total: 1199.00
      },
      {
        product_name: 'Sony WH-1000XM5 Noise-Cancelling Headphones',
        product_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        quantity: 1,
        price: 398.00,
        total: 398.00
      }
    ]
  });

  const [searched, setSearched] = useState(true);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    // Simulate search
    if (orderQuery.toUpperCase().includes('DEMO') || orderQuery.toUpperCase().startsWith('ORD-')) {
      setOrder({
        id: Math.floor(Math.random() * 1000),
        order_number: orderQuery.toUpperCase(),
        customer_name: 'Alex Vance',
        customer_email: 'alex@example.com',
        customer_phone: '+1 (555) 234-5678',
        shipping_address: '742 Innovation Way',
        city: 'San Francisco, CA',
        postal_code: '94107',
        total_amount: 1299.00,
        discount_amount: 0.0,
        shipping_fee: 0.0,
        status: 'shipped',
        payment_method: 'card',
        payment_status: 'paid',
        created_at: new Date().toISOString(),
        items: [
          {
            product_name: 'Samsung Galaxy S25 Ultra 512GB',
            product_image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
            quantity: 1,
            price: 1299.00,
            total: 1299.00
          }
        ]
      });
      setSearched(true);
    } else {
      setOrder(null);
      setSearched(true);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Payment verified', icon: CheckCircle2, status: 'done' },
    { title: 'Processing', desc: 'Packaged at tech hub', icon: Clock, status: 'done' },
    { title: 'In Transit', desc: 'Shipped via Express Air', icon: Truck, status: 'done' },
    { title: 'Delivered', desc: 'Signed and completed', icon: Package, status: order?.status === 'delivered' ? 'done' : 'current' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
            Realtime GPS Tracker
          </span>
          <h1 className="text-3xl font-black text-white mt-1">
            Track Your Tech Order
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Enter your order reference code below to track delivery status in real-time.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchOrder} className="mt-6 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="e.g. ORD-DEMO2026"
                className="w-full bg-slate-900 text-white rounded-xl pl-10 pr-3.5 py-3 border border-slate-800 focus:border-cyan-400 text-xs font-mono uppercase"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs px-6 rounded-xl shadow-lg shadow-cyan-500/20"
            >
              Track
            </button>
          </form>
        </div>

        {/* Order Details View */}
        {order ? (
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    Order ID: {order.order_number}
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Placed on {new Date(order.created_at).toLocaleDateString()} • {order.payment_method.toUpperCase()}
                  </p>
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Status: {order.status}
                </span>
              </div>

              {/* Steps Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white">{step.title}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items & Shipping Address */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Items */}
              <div className="md:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  Purchased Items ({order.items.length})
                </h3>

                <div className="divide-y divide-slate-800">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center gap-3">
                      {item.product_image && (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-14 h-14 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.product_name}</h4>
                        <span className="text-[11px] text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-mono">${(order.total_amount + order.discount_amount - order.shipping_fee).toFixed(2)}</span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-cyan-400">
                      <span>Promo Discount</span>
                      <span className="font-mono">-${order.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-400 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total</span>
                    <span className="text-cyan-400 font-mono">${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="md:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  Delivery Destination
                </h3>

                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Recipient</span>
                    <span className="font-semibold text-white">{order.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Address</span>
                    <span>{order.shipping_address}, {order.city} {order.postal_code}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Phone</span>
                    <span>{order.customer_phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Email</span>
                    <span>{order.customer_email}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2 mt-4">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Package covered by Full Transit Hardware Insurance.</span>
                </div>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="text-center py-12 p-8 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-white text-base">Order Not Found</h3>
            <p className="text-xs text-slate-400 mt-1">Please check your order tracking code and try again.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
