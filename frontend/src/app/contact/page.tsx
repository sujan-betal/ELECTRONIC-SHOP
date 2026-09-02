'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
            24/7 Customer Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
            Get in Touch With TechPulse
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Have a question about product compatibility, bulk business orders, or shipping? Our engineers are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base">Direct Channels</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Toll-Free Hotline</span>
                    <span className="font-bold text-white">+1 (800) 832-4767</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Email Support</span>
                    <span className="font-bold text-white">support@techpulse.shop</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Headquarters & Showroom</span>
                    <span className="font-bold text-white">742 Innovation Way, Silicon Valley, CA</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Working Hours</span>
                    <span className="font-bold text-white">Mon – Sun: 24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 shrink-0 text-cyan-400" />
              <div>
                <strong className="block text-white mb-0.5">Corporate & Wholesale Inquiries</strong>
                <span>Looking for fleet deployments of MacBooks, iPhones, or servers? Email enterprise@techpulse.shop for customized quotes.</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900 border border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. A tech representative will respond to <strong>{email}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-bold text-white text-base mb-2">Send Us A Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Name</label>
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
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Product Inquiry / Order Status / Return"
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can help..."
                    className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
