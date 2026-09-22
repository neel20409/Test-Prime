"use client";

import React from "react";
import { ExternalLink, Award, Star, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface EdTechPartnersProps {
  examName?: string;
}

export function EdTechPartners({ examName = "SBI / IBPS Bank Exams" }: EdTechPartnersProps) {
  const partners = [
    {
      id: "testbook-pass",
      name: "Testbook Pass Pro",
      tagline: "Unlimited access to 700+ Banking & SSC mock tests with live rank telemetry.",
      badge: "Most Popular",
      offer: "Extra 15% OFF with Special Code • 1 Year Unlimited Pass",
      url: "https://testbook.com/pass",
      cta: "Claim Pass Discount",
      accent: "#0284c7",
    },
    {
      id: "oliveboard-elite",
      name: "Oliveboard Banking Elite",
      tagline: "India's highest difficulty mock drills for SBI PO & RBI Grade B Mains.",
      badge: "High Difficulty",
      offer: "Full Length Mock Series + Advanced DI & Puzzle Sets",
      url: "https://www.oliveboard.in",
      cta: "Explore Oliveboard",
      accent: "#16a34a",
    },
    {
      id: "adda247-mahapack",
      name: "Adda247 Bank Mahapack",
      tagline: "All-in-one live classes, recorded video courses & eBooks for banking aspirants.",
      badge: "Comprehensive",
      offer: "Double Validity Deal • Complete SBI & IBPS Video Syllabus",
      url: "https://www.adda247.com",
      cta: "Get Mahapack Deal",
      accent: "#f59e0b",
    },
    {
      id: "disha-books",
      name: "Disha 101 Speed Tests (Banking)",
      tagline: "Essential printed speed drills and formula shortcuts for daily practice.",
      badge: "Best Book",
      offer: "Paperback Edition with Solved Papers & OMR Practice Sheets",
      url: "https://www.amazon.in",
      cta: "Buy on Amazon",
      accent: "#ec4899",
    },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-white/10 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Recommended Preparation Resources for {examName}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-mono mt-1">
            Top-Rated Banking Test Series & Study Materials
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full w-fit">
          Verified Deals
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="group relative p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${partner.accent}20`,
                    color: partner.accent,
                  }}
                >
                  {partner.badge}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h4 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors font-mono">
                {partner.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {partner.tagline}
              </p>

              <div className="mt-3 p-2 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-emerald-400 text-emerald-400 shrink-0" />
                <span className="line-clamp-2">{partner.offer}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-cyan-400 font-mono">
              <span>{partner.cta}</span>
              <span className="text-slate-500 text-[10px] font-normal">Partner</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
