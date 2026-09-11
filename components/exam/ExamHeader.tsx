"use client";

import React from "react";
import { Exam, ExamSectionId } from "@/types/exam";
import { Clock, Globe, Shield, User, Sparkles, Moon, Sun } from "lucide-react";

interface ExamHeaderProps {
  exam: Exam;
  currentSectionId: ExamSectionId;
  onSelectSection: (secId: ExamSectionId) => void;
  sectionTimeRemaining: number;
  isAuthenticMode: boolean;
  onToggleThemeMode: () => void;
  language: "en" | "hi";
  onToggleLanguage: (lang: "en" | "hi") => void;
}

export default function ExamHeader({
  exam,
  currentSectionId,
  onSelectSection,
  sectionTimeRemaining,
  isAuthenticMode,
  onToggleThemeMode,
  language,
  onToggleLanguage,
}: ExamHeaderProps) {
  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = sectionTimeRemaining < 300; // under 5 minutes

  return (
    <header className={`${isAuthenticMode ? "bg-[#1f4a8b] text-white border-b-2 border-[#153462]" : "bg-slate-900 text-white border-b border-white/10"} select-none`}>
      {/* Top Banner */}
      <div className="px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Left: Test Name & Tag */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center font-black text-sm tracking-wider font-mono">
            TP
          </div>
          <div>
            <h1 className="font-bold text-xs sm:text-base tracking-tight truncate max-w-[200px] sm:max-w-md">
              {exam.title}
            </h1>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-cyan-200/90 font-mono">
              <span className="uppercase font-semibold tracking-wider">CBT Assessment System // IBPS Pattern</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Candidate Info */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => onToggleLanguage("en")}
              className={`px-2 py-1 rounded transition-all ${language === "en" ? "bg-cyan-500 text-black font-bold shadow-xs" : "text-gray-300 hover:text-white"}`}
            >
              ENG
            </button>
            <button
              onClick={() => onToggleLanguage("hi")}
              className={`px-2 py-1 rounded transition-all ${language === "hi" ? "bg-cyan-500 text-black font-bold shadow-xs" : "text-gray-300 hover:text-white"}`}
            >
              हिन्दी
            </button>
          </div>

          {/* Theme Mode Toggle (Authentic TCS iON vs Modern Cyber Glass) */}
          <button
            onClick={onToggleThemeMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/25 hover:bg-black/40 border border-white/10 text-[11px] font-mono transition-colors"
            title="Toggle Authentic TCS iON vs Cyber Interface"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{isAuthenticMode ? "TCS iON Mode" : "Cyber Mode"}</span>
          </button>

          {/* Countdown Clock HUD */}
          <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg border font-mono font-bold text-xs sm:text-sm ${
            isLowTime 
              ? "bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse" 
              : "bg-black/40 border-cyan-400/40 text-cyan-300"
          }`}>
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] sm:text-xs text-gray-300 hidden sm:inline">Time Left:</span>
            <span className="tracking-widest">{formatTime(sectionTimeRemaining)}</span>
          </div>

          {/* Candidate Profile Widget */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-cyan-600/60 border border-white/30 flex items-center justify-center text-xs font-bold font-mono">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold truncate max-w-[100px]">Aspirant // 2026</p>
              <p className="text-[9px] text-gray-300 font-mono">Roll: TP-98234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className={`px-2 sm:px-6 flex items-center gap-1 overflow-x-auto ${isAuthenticMode ? "bg-[#337ab7]" : "bg-slate-950/60 border-t border-white/5"}`}>
        <span className="text-[11px] font-mono font-bold text-white/80 uppercase tracking-wider px-2 hidden md:inline">
          Sections:
        </span>
        {exam.sections.map((sec) => {
          const isActive = sec.id === currentSectionId;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                isActive
                  ? isAuthenticMode
                    ? "bg-[#ffffff] text-[#1f4a8b] border-amber-400 shadow-md font-bold"
                    : "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                  : "border-transparent text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{language === "hi" && sec.hindiName ? sec.hindiName : sec.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-[#1f4a8b] text-white" : "bg-black/30 text-white/80"}`}>
                {sec.totalQuestions}Q
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
