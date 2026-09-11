"use client";

import React, { useState } from "react";
import { Question } from "@/types/exam";
import { ZoomIn, ZoomOut, Bookmark, HelpCircle } from "lucide-react";

interface QuestionPaneProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  language: "en" | "hi";
  isAuthenticMode: boolean;
  positiveMarks: number;
  negativeMarks: number;
}

export default function QuestionPane({
  question,
  selectedOptionId,
  onSelectOption,
  language,
  isAuthenticMode,
  positiveMarks,
  negativeMarks,
}: QuestionPaneProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const fontClass = {
    sm: "text-xs sm:text-sm leading-normal",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-loose",
  }[fontSize];

  const questionContent = language === "hi" && question.questionTextHindi ? question.questionTextHindi : question.questionText;

  return (
    <div className={`flex-1 flex flex-col h-full overflow-hidden ${isAuthenticMode ? "bg-white text-slate-900" : "bg-slate-950/70 text-slate-100"}`}>
      {/* Top Question Toolbar */}
      <div className={`px-4 sm:px-6 py-2.5 flex items-center justify-between border-b text-xs font-mono select-none ${
        isAuthenticMode ? "bg-[#f5f8fc] border-slate-200 text-slate-700" : "bg-slate-900/80 border-white/10 text-slate-300"
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm sm:text-base text-[#1f4a8b] dark:text-cyan-400">
            Question No. {question.questionNumber}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-semibold uppercase">
            {question.topicTag}
          </span>
        </div>

        {/* Right side: Marking scheme & Font Size */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{positiveMarks.toFixed(2)}</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">-{negativeMarks.toFixed(2)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-3">
            <button
              onClick={() => setFontSize((prev) => (prev === "lg" ? "base" : prev === "base" ? "sm" : "sm"))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px]">Font</span>
            <button
              onClick={() => setFontSize((prev) => (prev === "sm" ? "base" : prev === "base" ? "lg" : "lg"))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Context / Reading Comprehension Passage / DI Data Box */}
        {question.passageContext && (
          <div className={`p-4 sm:p-5 rounded-xl border whitespace-pre-line font-mono text-xs sm:text-sm leading-relaxed ${
            isAuthenticMode 
              ? "bg-amber-50/60 border-amber-200 text-slate-800" 
              : "bg-indigo-950/20 border-indigo-500/20 text-indigo-200"
          }`}>
            <div className="font-bold uppercase tracking-wider text-[11px] text-amber-700 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Reference Context / Data Set:</span>
            </div>
            {question.passageContext}
          </div>
        )}

        {/* Question Text */}
        <div className={`font-medium whitespace-pre-line ${fontClass} ${isAuthenticMode ? "text-slate-900" : "text-white"}`}>
          {questionContent}
        </div>

        {/* 5 Standard Banking Options (A, B, C, D, E) */}
        <div className="space-y-3 pt-2">
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const optionText = language === "hi" && opt.textHindi ? opt.textHindi : opt.text;

            return (
              <label
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? isAuthenticMode
                      ? "bg-[#eef5ff] border-[#337ab7] text-[#1f4a8b] shadow-xs ring-1 ring-[#337ab7]"
                      : "bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/50"
                    : isAuthenticMode
                      ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-800"
                      : "bg-slate-900/50 border-white/10 hover:bg-white/5 text-slate-200"
                }`}
              >
                {/* Radio Circle */}
                <div className="pt-0.5">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? isAuthenticMode
                        ? "border-[#1f4a8b] bg-[#1f4a8b]"
                        : "border-cyan-400 bg-cyan-400"
                      : "border-slate-400 dark:border-slate-600 bg-transparent"
                  }`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Option Label (A, B, C, D, E) & Text */}
                <div className="flex-1 flex items-start gap-2">
                  <span className={`font-mono font-bold text-xs sm:text-sm px-1.5 py-0.2 rounded ${
                    isSelected 
                      ? isAuthenticMode ? "bg-[#1f4a8b] text-white" : "bg-cyan-500 text-black font-black"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}>
                    ({opt.id})
                  </span>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? "font-semibold" : ""}`}>
                    {optionText}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
