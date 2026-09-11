"use client";

import React from "react";
import { Bookmark, RotateCcw, Check, Send } from "lucide-react";

interface ActionFooterProps {
  onSaveAndNext: () => void;
  onMarkForReviewAndNext: () => void;
  onClearResponse: () => void;
  onSubmitExam: () => void;
  isAuthenticMode: boolean;
  hasSelectedOption: boolean;
}

export default function ActionFooter({
  onSaveAndNext,
  onMarkForReviewAndNext,
  onClearResponse,
  onSubmitExam,
  isAuthenticMode,
  hasSelectedOption,
}: ActionFooterProps) {
  return (
    <footer className={`px-4 sm:px-6 py-3 border-t flex flex-wrap items-center justify-between gap-2 sm:gap-4 select-none ${
      isAuthenticMode ? "bg-[#f5f8fc] border-slate-300" : "bg-slate-900 border-white/10"
    }`}>
      {/* Left Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onMarkForReviewAndNext}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold font-mono border transition-all active:scale-95 cursor-pointer ${
            isAuthenticMode
              ? "bg-white hover:bg-purple-50 text-purple-700 border-purple-300 shadow-xs"
              : "bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border-purple-500/40"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Mark for Review & Next</span>
        </button>

        <button
          onClick={onClearResponse}
          disabled={!hasSelectedOption}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold font-mono border transition-all active:scale-95 cursor-pointer ${
            !hasSelectedOption
              ? "opacity-50 cursor-not-allowed bg-transparent border-slate-300 dark:border-slate-800 text-slate-400"
              : isAuthenticMode
                ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10"
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Response</span>
        </button>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <button
          onClick={onSaveAndNext}
          className={`flex items-center gap-1.5 px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all shadow-md active:scale-95 cursor-pointer ${
            isAuthenticMode
              ? "bg-[#1f4a8b] hover:bg-[#153462] text-white"
              : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20"
          }`}
        >
          <Check className="w-4 h-4" />
          <span>Save & Next</span>
        </button>

        <button
          onClick={onSubmitExam}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold font-mono transition-all shadow-md active:scale-95 cursor-pointer ${
            isAuthenticMode
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Test</span>
        </button>
      </div>
    </footer>
  );
}
