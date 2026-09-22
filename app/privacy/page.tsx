import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | TestPrime CBT Exam Platform",
  description: "Learn how TestPrime protects your privacy, handles mock test data, and manages cookies and advertising policies in accordance with Google AdSense guidelines.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
          <span className="text-xs font-mono text-slate-500">Last Updated: March 2026</span>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparency & Data Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            At TestPrime (<span className="text-cyan-400">test-prime-nine.vercel.app</span>), accessible worldwide for Indian competitive exam aspirants (SBI PO, IBPS, RRB, RBI), one of our core priorities is candidate privacy and absolute transparency. This Privacy Policy document outlines the types of information collected and recorded by TestPrime and how we utilize it.
          </p>
        </div>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <Lock className="w-4 h-4" />
            <h2 className="text-lg text-white">1. Information We Do NOT Collect (Zero Lock-in)</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            TestPrime is committed to frictionless practice. You can take complete mock tests, inspect sectional percentiles, and analyze questions without being forced to create an account, provide your phone number, or share banking credentials. All your ongoing exam responses and scores are processed locally on your client device using modern browser storage (<code className="text-cyan-400 bg-black/40 px-1.5 py-0.5 rounded">localStorage</code>).
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <Eye className="w-4 h-4" />
            <h2 className="text-lg text-white">2. Log Files & Analytics</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Like most modern web platforms, TestPrime uses standard log files provided by infrastructure providers (Vercel). The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and anonymous platform telemetry. These are not linked to any information that is personally identifiable and are used solely for analyzing server health and DDoS prevention.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <FileText className="w-4 h-4" />
            <h2 className="text-lg text-white">3. Google AdSense & DoubleClick DART Cookies</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at:
          </p>
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-mono text-cyan-400 underline hover:text-cyan-300 break-all"
          >
            https://policies.google.com/technologies/ads
          </a>
          <p className="text-xs text-slate-400 leading-relaxed mt-2">
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on TestPrime. They automatically receive your IP address when this occurs to measure advertising campaign efficacy. TestPrime has no access to or control over these cookies used by third-party advertisers.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <h2 className="text-lg text-white">4. Affiliate Disclosure</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            TestPrime partners with reputable education providers and retailers (including Testbook, Oliveboard, Adda247, and Amazon Associates) to suggest relevant preparation books and test series. When users purchase preparation materials through affiliate links on our platform, TestPrime may earn an educational referral commission at no additional cost to you.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white font-mono">5. Contact Information</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you have additional questions or require more information about our Privacy Policy, please contact our administrative team via email at:
          </p>
          <p className="text-cyan-400 font-mono text-sm font-semibold">
            support@testprime.org
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
