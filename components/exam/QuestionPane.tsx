"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/types/exam";
import { ZoomIn, ZoomOut, Bookmark, HelpCircle, FileText, Check } from "lucide-react";

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

  // Keyboard shortcut listener for instantaneous 1-5 or A-E selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input/textarea
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      const optionMap: Record<string, string> = {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "E",
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E",
      };

      if (optionMap[key]) {
        const targetOpt = question.options.find((o) => o.id === optionMap[key]);
        if (targetOpt) {
          onSelectOption(targetOpt.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, onSelectOption]);

  const fontClass = {
    sm: "text-xs sm:text-sm leading-normal",
    base: "text-sm sm:text-base leading-relaxed",
    lg: "text-base sm:text-lg leading-loose",
  }[fontSize];

  const questionContent = language === "hi" && question.questionTextHindi ? question.questionTextHindi : question.questionText;

  // Detect if question has top directions/statements embedded if passageContext is not explicitly provided
  let topPassage = question.passageContext;
  let mainQuestion = questionContent;

  if (!topPassage) {
    if (questionContent.includes("\n\n")) {
      const parts = questionContent.split("\n\n");
      if (
        parts.length >= 2 &&
        (parts[0].toLowerCase().includes("statement") ||
          parts[0].toLowerCase().includes("direction") ||
          parts[0].toLowerCase().includes("passage") ||
          parts[0].toLowerCase().includes("study the") ||
          parts[0].toLowerCase().includes("read the") ||
          parts[0].toLowerCase().includes("box") ||
          parts[0].toLowerCase().includes("sitting") ||
          parts[0].toLowerCase().includes("floor") ||
          parts[0].toLowerCase().includes("placed"))
      ) {
        topPassage = parts[0];
        mainQuestion = parts.slice(1).join("\n\n");
      }
    } else {
      // Check if setup text is embedded before the question query (e.g. Which of the following...)
      const queryMatch = questionContent.match(/([\s\S]+?)(?=(?:Which of the following|Who among the following|How many|What is the|If all the|In which of))/i);
      if (queryMatch && queryMatch[1].trim().length > 35) {
        topPassage = queryMatch[1].trim();
        mainQuestion = questionContent.slice(queryMatch[1].length).trim();
      }
    }
  }

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
        {/* 1. TOP BOX: Context / Reading Comprehension Passage / Seating Puzzle / Direction Premise */}
        {topPassage && (
          <div className={`p-4 sm:p-5 rounded-2xl border whitespace-pre-line font-mono text-xs sm:text-sm leading-relaxed shadow-sm ${
            isAuthenticMode 
              ? "bg-amber-50/80 border-amber-300/80 text-slate-900 ring-1 ring-amber-200" 
              : "bg-gradient-to-r from-amber-950/20 to-slate-900 border-amber-500/30 text-slate-200"
          }`}>
            <div className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-400 mb-2.5 flex items-center gap-2 border-b border-amber-200 dark:border-white/10 pb-2">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span>Reference Paragraph / Directions / Premises (Study Carefully):</span>
            </div>
            <div className="pt-1 font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
              {topPassage}
            </div>
          </div>
        )}

        {/* 2. MIDDLE BOX: Particular Question Statement */}
        <div className={`p-4 sm:p-5 rounded-2xl border shadow-xs ${
          isAuthenticMode ? "bg-white border-slate-200" : "bg-slate-900/60 border-white/10"
        }`}>
          <div className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-cyan-500" />
            <span>Question Statement:</span>
          </div>
          <div className={`font-semibold whitespace-pre-line ${fontClass} ${isAuthenticMode ? "text-slate-900" : "text-white"}`}>
            {mainQuestion}
          </div>
        </div>

        {/* 3. BOTTOM BOX: 5 Standard Banking MCQ Options Shifted Below */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Select the correct option (A - E):</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline font-normal">Tip: Press keys 1-5 or A-E on keyboard</span>
          </div>

          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const optionText = language === "hi" && opt.textHindi ? opt.textHindi : opt.text;

              return (
                <label
                  key={opt.id}
                  onClick={() => onSelectOption(opt.id)}
                  className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? isAuthenticMode
                        ? "bg-[#eef5ff] border-[#337ab7] text-[#1f4a8b] shadow-sm ring-2 ring-[#337ab7]"
                        : "bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-md ring-2 ring-cyan-400/50"
                      : isAuthenticMode
                        ? "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800"
                        : "bg-slate-900/50 border-white/10 hover:bg-white/5 hover:border-white/20 text-slate-200"
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
                  <div className="flex-1 flex items-start gap-2.5">
                    <span className={`font-mono font-bold text-xs sm:text-sm px-2 py-0.5 rounded-lg flex-shrink-0 ${
                      isSelected 
                        ? isAuthenticMode ? "bg-[#1f4a8b] text-white" : "bg-cyan-500 text-black font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                      ({opt.id})
                    </span>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? "font-bold" : "font-normal"}`}>
                      {optionText}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

