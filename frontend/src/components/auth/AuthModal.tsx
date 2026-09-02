'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openLoginModal,
    openRegisterModal,
    login,
    register,
    isLoading
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (authModalMode === 'login') {
        const ok = await login(email, password);
        if (!ok) setErrorMsg('Invalid email or password');
      } else {
        const ok = await register(name, email, password);
        if (!ok) setErrorMsg('Registration failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error');
    }
  };

  const handleDemoLogin = (type: 'customer' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@electronicshop.com');
      setPassword('adminpassword123');
      login('admin@electronicshop.com', 'adminpassword123');
    } else {
      setEmail('alex@example.com');
      setPassword('userpassword123');
      login('alex@example.com', 'userpassword123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {authModalMode === 'login' ? 'Welcome Back' : 'Create Tech Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {authModalMode === 'login'
                  ? 'Access your orders, wishlist, and exclusive discounts.'
                  : 'Join TechPulse for VIP sales and faster checkout.'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Credentials Quick Fill */}
        <div className="px-6 pt-5">
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-2 font-medium">⚡ Quick Demo One-Click Login:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold py-1.5 px-3 rounded-xl border border-cyan-500/30 transition-all text-[11px]"
              >
                Demo Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="flex-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-semibold py-1.5 px-3 rounded-xl border border-indigo-500/30 transition-all text-[11px]"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMsg}
            </div>
          )}

          {authModalMode === 'register' && (
            <div className="space-y-1 text-xs">
              <label className="text-slate-400 font-medium">Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                />
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              </div>
            </div>
          )}

          <div className="space-y-1 text-xs">
            <label className="text-slate-400 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-400 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 text-sm disabled:opacity-50 mt-2"
          >
            <span>{isLoading ? 'Please wait...' : authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>

          <div className="text-center pt-2 text-xs text-slate-400">
            {authModalMode === 'login' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={openRegisterModal}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
