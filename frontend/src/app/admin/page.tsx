'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { DashboardStats, Order, Product } from '@/types';
import { fetchDashboardStats, fetchProducts } from '@/lib/api';

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock demo orders for administrative management
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 101,
      order_number: 'ORD-DEMO2026',
      customer_name: 'Alex Vance',
      customer_email: 'alex@example.com',
      customer_phone: '+1 (555) 234-5678',
      shipping_address: '742 Evergreen Terrace',
      city: 'Tech City',
      postal_code: '94016',
      total_amount: 1597.00,
      discount_amount: 79.85,
      shipping_fee: 0.0,
      status: 'delivered',
      payment_method: 'card',
      payment_status: 'paid',
      created_at: new Date().toISOString(),
      items: [
        { product_name: 'iPhone 16 Pro Max 256GB', quantity: 1, price: 1199.00, total: 1199.00 },
        { product_name: 'Sony WH-1000XM5 Headphones', quantity: 1, price: 398.00, total: 398.00 }
      ]
    },
    {
      id: 102,
      order_number: 'ORD-8932KA9',
      customer_name: 'Sarah Connor',
      customer_email: 'sarah@cyberdyne.io',
      customer_phone: '+1 (555) 890-1234',
      shipping_address: '100 Terminal Blvd',
      city: 'Los Angeles',
      postal_code: '90001',
      total_amount: 3499.00,
      discount_amount: 0.0,
      shipping_fee: 0.0,
      status: 'processing',
      payment_method: 'card',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      items: [
        { product_name: 'MacBook Pro 16" M3 Max', quantity: 1, price: 3499.00, total: 3499.00 }
      ]
    },
    {
      id: 103,
      order_number: 'ORD-4491XP2',
      customer_name: 'Bruce Wayne',
      customer_email: 'bruce@wayne-enterprises.com',
      customer_phone: '+1 (555) 999-0000',
      shipping_address: '1007 Mountain Drive',
      city: 'Gotham',
      postal_code: '10001',
      total_amount: 1658.99,
      discount_amount: 165.90,
      shipping_fee: 0.0,
      status: 'shipped',
      payment_method: 'card',
      payment_status: 'paid',
      created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
      items: [
        { product_name: 'PlayStation 5 Pro 2TB', quantity: 1, price: 699.99, total: 699.99 },
        { product_name: 'DJI Mini 4 Pro Drone', quantity: 1, price: 959.00, total: 959.00 }
      ]
    }
  ]);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      const [dashStats, prodsData] = await Promise.all([
        fetchDashboardStats(),
        fetchProducts({ limit: 10 })
      ]);
      setStats(dashStats);
      setProducts(prodsData.items);
      setIsLoading(false);
    }
    loadStats();
  }, []);

  const handleUpdateStatus = (orderId: number, newStatus: any) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
                FastAPI SQL Admin Portal
              </span>
            </div>
            <h1 className="text-3xl font-black text-white mt-2">
              Store Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              className="bg-slate-900 hover:bg-slate-800 text-cyan-400 font-mono text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <span>Swagger REST API Docs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {/* Revenue */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales</span>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              ${stats?.total_revenue?.toLocaleString() || '18,450.00'}
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> +24.8% this month
            </span>
          </div>

          {/* Orders */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Orders</span>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {stats?.total_orders || orders.length + 15} Orders
            </div>
            <span className="text-xs text-indigo-400 font-medium">
              100% fulfillment rate
            </span>
          </div>

          {/* Products */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catalog Inventory</span>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {stats?.total_products || products.length} Devices
            </div>
            <span className="text-xs text-slate-400">
              Across 7 active categories
            </span>
          </div>

          {/* Users */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Base</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {stats?.total_users || 148} Accounts
            </div>
            <span className="text-xs text-emerald-400 font-medium">
              +12 new registrations today
            </span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-white">Live Customer Orders</h3>
              <p className="text-xs text-slate-400">Manage order statuses and fulfillment.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-white">
                      {o.order_number}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{o.customer_name}</div>
                      <div className="text-[11px] text-slate-500">{o.customer_email}</div>
                    </td>
                    <td className="p-3.5">
                      {o.items.map((it, i) => (
                        <div key={i} className="truncate max-w-xs text-slate-400">
                          • {it.product_name} (x{it.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-cyan-400">
                      ${o.total_amount.toFixed(2)}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          o.status === 'delivered'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : o.status === 'shipped'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="bg-slate-950 text-white rounded-lg px-2.5 py-1.5 border border-slate-700 text-xs cursor-pointer"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Live Product Stock Levels</h3>
              <p className="text-xs text-slate-400">SQL database inventory synchronization.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <img src={p.image_url} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-900 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                  <span className="text-[11px] text-cyan-400 font-mono">${p.price.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white block">{p.stock} in stock</span>
                  <span className="text-[10px] text-emerald-400">Healthy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
