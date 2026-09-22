import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Github, ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-md text-slate-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* COL 1: BRAND */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-bold text-sm tracking-wider">TESTPRIME</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Open-source TCS iON CBT exam simulation engine built for Indian banking and government service candidates.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/neel20409/Test-Prime"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* COL 2: EXAM SIMULATORS */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Free CBT Mocks</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/mock-test/sbi-po" className="hover:text-cyan-400 transition-colors">
                  SBI PO Prelims CBT
                </Link>
              </li>
              <li>
                <Link href="/mock-test/ibps-po" className="hover:text-cyan-400 transition-colors">
                  IBPS PO Prelims Mock
                </Link>
              </li>
              <li>
                <Link href="/mock-test/sbi-clerk" className="hover:text-cyan-400 transition-colors">
                  SBI Clerk Practice Test
                </Link>
              </li>
              <li>
                <Link href="/mock-test/ibps-clerk" className="hover:text-cyan-400 transition-colors">
                  IBPS Clerk Full Mock
                </Link>
              </li>
              <li>
                <Link href="/mock-test/rbi-grade-b" className="hover:text-cyan-400 transition-colors">
                  RBI Grade B Phase 1
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: TRUST & COMPLIANCE */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Trust & Policy</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms#disclaimer" className="hover:text-cyan-400 transition-colors">
                  Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy#adsense" className="hover:text-cyan-400 transition-colors">
                  AdSense & Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: ABOUT & CONTACT */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company & Support</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About TestPrime
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-cyan-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a href="mailto:support@testprime.org" className="hover:text-cyan-400 transition-colors">
                  support@testprime.org
                </a>
              </li>
              <li>
                <Link href="/create" className="text-cyan-400 hover:underline">
                  + Upload Custom Mock PDF
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DISCLAIMER */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} TestPrime. Built with care for Indian government exam aspirants.
          </p>
          <p className="text-[10px] text-slate-600 text-center sm:text-right max-w-md">
            SBI, IBPS, RBI, and TCS iON are trademarks of their respective authorities. TestPrime is an independent educational simulator.
          </p>
        </div>
      </div>
    </footer>
  );
}
