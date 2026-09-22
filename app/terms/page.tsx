import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Disclaimer | TestPrime",
  description: "Terms and conditions of using TestPrime Computer Based Test simulator. Includes official non-affiliation disclaimers with SBI, IBPS, and TCS iON.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Simulator</span>
          </Link>
          <span className="text-xs font-mono text-slate-500">Effective: March 2026</span>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Notice & Usage Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
            Terms of Service & Disclaimer
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            By accessing or using TestPrime (<span className="text-cyan-400">test-prime-nine.vercel.app</span>), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our simulator.
          </p>
        </div>

        {/* NON-AFFILIATION NOTICE */}
        <section className="space-y-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-lg text-white">1. Non-Affiliation & Trademark Disclaimer</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            TestPrime is an independent open-source educational platform built to help candidates prepare for government and banking examinations. 
            <strong className="text-amber-300 block mt-2">
              TestPrime is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with the State Bank of India (SBI), the Institute of Banking Personnel Selection (IBPS), Reserve Bank of India (RBI), or Tata Consultancy Services (TCS / TCS iON), or any of their subsidiaries or affiliates.
            </strong>
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            All names, logos, and brands (including SBI PO, IBPS PO, IBPS Clerk, RRB, TCS iON) are registered trademarks of their respective owners. Their mention on this platform is solely for nominative educational identification and comparative preparation purposes under fair use doctrine.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <CheckCircle className="w-4 h-4" />
            <h2 className="text-lg text-white">2. Educational Fair Use & Simulator Accuracy</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            The mock tests, sectional timers, negative marking calculations (-0.25), and percentile estimates provided by TestPrime are created for self-evaluation and exam rehearsal only. While every effort is made to replicate official examination patterns, actual examination papers, sectional cutoffs, and administrative rules may change according to official recruiting board notifications.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <AlertCircle className="w-4 h-4" />
            <h2 className="text-lg text-white">3. User Conduct & Prohibited Activities</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside leading-relaxed">
            <li>You may not use automated scripts, scrapers, or bots to overload or disrupt TestPrime servers.</li>
            <li>You may not attempt to reverse engineer backend extraction APIs or bypass educational rate limits.</li>
            <li>You may freely share, print, and distribute mock test questions for personal or non-commercial study group practice.</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white font-mono">4. Limitation of Liability</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In no event shall TestPrime, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from examination results, admission outcomes, or use/inability to use the platform.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white font-mono">5. Changes & Inquiries</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of TestPrime constitutes acceptance of updated terms. For inquiries regarding our terms, reach us at:
          </p>
          <p className="text-cyan-400 font-mono text-sm font-semibold">
            legal@testprime.org
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        <p>&copy; {new Date().getFullYear()} TestPrime CBT Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
