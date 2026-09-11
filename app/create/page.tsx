"use client";

import React from "react";
import Link from "next/link";
import MaterialUploader from "@/components/upload/MaterialUploader";
import { Sparkles, ArrowLeft, Shield, BookOpen, Clock, Target } from "lucide-react";

export default function CreateExamPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 font-bold font-mono text-sm sm:text-base">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xs font-black">TP</span>
          <span>TestPrime</span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-10">
        {/* Core Uploader */}
        <MaterialUploader />

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Negative Marking Precision</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard Indian banking (+1.00 / -0.25) scoring ensures realistic preparation under real pressure.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Sectional Timers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time countdown and automated section locks matching TCS iON exam hall standards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white">Zero Subscription Paywall</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open-source, free-tier powered mock drill generation to challenge overpriced test series companies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
