import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Target, Mail, Globe, Users, Award, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Contact | TestPrime Open-Source CBT Simulator",
  description: "Learn why TestPrime was built: empowering Indian banking aspirants with authentic TCS iON CBT simulation, 100% free with zero paywalls.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
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
          <span className="text-xs font-mono text-cyan-400 font-bold">Open-Source Project</span>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Democratizing Competitive Exam Preparation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
            About TestPrime
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every year, over 3.5 million Indian graduates prepare for banking and government examinations like <span className="text-cyan-400 font-semibold">SBI PO</span>, <span className="text-cyan-400 font-semibold">IBPS PO</span>, and <span className="text-cyan-400 font-semibold">RBI Grade B</span>. 
            Most commercial mock portals charge recurring fees of ₹1,500 – ₹3,000 for basic practice papers and lock questions behind aggressive paywalls.
          </p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            TestPrime was created with a single mission: <strong className="text-white">replicate the exact TCS iON exam center environment for free</strong>, enabling every student — regardless of location or financial background — to master exam timing, sectional switching, and negative marking before walking into the real test hall.
          </p>
        </div>

        {/* PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">1:1 TCS iON CBT</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identical 5-color question palette, sectional lock timers, mark-for-review flags, and split-screen reading comprehension view.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">AI Speed Solutions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every question includes step-by-step mathematical proofs plus 20-second shortcut elimination tricks for speed gains.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">100% Private Practice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No account creation, no spam phone calls from coaching centers, and zero tracking of candidate private data.
            </p>
          </div>
        </div>

        {/* COMMUNITY & OPEN SOURCE */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-white/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Open-Source & Community Driven</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Built by Engineers & Educators</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            TestPrime is built on modern Next.js 15, React, and TypeScript. We welcome contributions from banking faculty, exam toppers, and developers across India to expand our mock question database, improve accessibility, and build better performance analytics.
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/neel20409/Test-Prime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-mono font-bold transition-all"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Contribute on GitHub</span>
            </a>
          </div>
        </section>

        {/* CONTACT US */}
        <section className="rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono text-xs uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Contact & Inquiries</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Get in Touch</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Have a question, feedback on an answer key explanation, or want to collaborate as an educational partner? Our team responds within 24–48 hours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">Candidate Support & Bug Reports</span>
              <p className="text-sm font-bold text-cyan-400 font-mono">support@testprime.org</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">Educational Partnerships & Publishers</span>
              <p className="text-sm font-bold text-cyan-400 font-mono">partners@testprime.org</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        <p>&copy; {new Date().getFullYear()} TestPrime CBT Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
