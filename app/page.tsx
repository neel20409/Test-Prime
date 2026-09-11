"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Zap, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  UploadCloud, 
  Award, 
  Layers, 
  Flame,
  Globe,
  Lock
} from "lucide-react";
import { SAMPLE_EXAMS } from "@/lib/exam-data";

export default function HomePage() {
  const sampleExam = SAMPLE_EXAMS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-sm font-mono shadow-lg shadow-cyan-500/20">
            TP
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white font-mono">TestPrime</span>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase">
              Open-Source CBT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold font-mono text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Upload Notes</span>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-semibold">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Democratizing Banking Exam Prep in India • 100% Free & Open Source</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Turn Your Notes, DPPs & PDFs Into{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            Exact Exam-Grade CBT Tests
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Why pay expensive fees for test series? Upload your daily practice problems or class notes. TestPrime calibrates authentic <span className="text-cyan-300 font-semibold">SBI PO, IBPS PO & Clerk</span> computer-based tests with real-time sectional timers, negative marking, and instant diagnostic scorecards.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/create"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white font-bold font-mono text-sm sm:text-base shadow-xl shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Upload Material & Take Test</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={`/exam/${sampleExam.id}`}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-white/15 text-white font-semibold font-mono text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-current" />
            <span>Instant SBI PO Prelims Drill</span>
          </Link>
        </div>

        {/* Key USPs Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-10 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>TCS iON Replica</span>
            </div>
            <p className="text-[11px] text-slate-400">Authentic 5-state question palette, colors & layout.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
              <Target className="w-4 h-4" />
              <span>Negative Marking</span>
            </div>
            <p className="text-[11px] text-slate-400">+1.00 for correct, -0.25 penalty for wrong answers.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>Sectional Timers</span>
            </div>
            <p className="text-[11px] text-slate-400">20-minute section clocks matching real IBPS rules.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>20s Shortcut Tricks</span>
            </div>
            <p className="text-[11px] text-slate-400">Step-by-step solutions and speed-math tricks.</p>
          </div>
        </div>
      </section>

      {/* READY-TO-TAKE PRELOADED MOCK DRILLS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              Featured Mock Tests
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready-to-Take Practice Drills
            </h2>
          </div>
          <Link
            href="/create"
            className="text-xs font-mono text-cyan-400 hover:underline font-semibold"
          >
            + Create from Notes
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="p-6 rounded-3xl bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition-all shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-bold">
                    {exam.targetExam.replace("_", " ")}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {exam.totalDurationMinutes} Mins
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{exam.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Comprehensive preliminary exam mock drill covering Quantitative Aptitude, Reasoning Ability, and English Language.
                </p>

                {/* Section tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exam.sections.map((sec) => (
                    <span
                      key={sec.id}
                      className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                    >
                      {sec.name} ({sec.totalQuestions}Q)
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  Total Marks: <span className="text-white font-bold">{exam.totalMarks}</span>
                </div>
                <Link
                  href={`/exam/${exam.id}`}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <span>Launch CBT Exam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {/* Generator CTA Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold">
                Custom Notes & DPP Converter
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">Convert Your Specific Notes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have a set of tricky puzzles, arithmetic notes, or daily practice problems? Drop them in and generate an instant tailored mock test.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-semibold">Any Bank Exam Syllabus</span>
              <Link
                href="/create"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold font-mono text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>Upload & Generate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 border-t border-white/10 text-center text-xs font-mono text-slate-500 space-y-2">
        <p>TestPrime // Open-Source Competitive Exam & CBT Simulator Engine</p>
        <p className="text-[11px] text-slate-600">Built for Indian Banking & Government Exam Aspirants</p>
      </footer>
    </div>
  );
}
