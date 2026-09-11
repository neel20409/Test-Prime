"use client";

import React from "react";
import { Question, QuestionAttempt, ExamSectionId, ExamStatus } from "@/types/exam";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

interface QuestionPaletteProps {
  questions: Question[];
  currentSectionId: ExamSectionId;
  currentQuestionIndex: number;
  attempts: Record<string, QuestionAttempt>;
  onSelectQuestion: (index: number) => void;
  isAuthenticMode: boolean;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
}

export default function QuestionPalette({
  questions,
  currentSectionId,
  currentQuestionIndex,
  attempts,
  onSelectQuestion,
  isAuthenticMode,
  isOpenMobile,
  onToggleMobile,
}: QuestionPaletteProps) {
  const sectionQuestions = questions.filter((q) => q.sectionId === currentSectionId);

  // Compute live state counts for the active section
  const counts = {
    answered: 0,
    notAnswered: 0,
    notVisited: 0,
    marked: 0,
    markedAnswered: 0,
  };

  sectionQuestions.forEach((q) => {
    const att = attempts[q.id];
    if (!att || !att.isVisited) {
      counts.notVisited += 1;
    } else if (att.status === "ANSWERED") {
      counts.answered += 1;
    } else if (att.status === "ANSWERED_AND_MARKED") {
      counts.markedAnswered += 1;
    } else if (att.status === "MARKED_FOR_REVIEW") {
      counts.marked += 1;
    } else {
      counts.notAnswered += 1;
    }
  });

  const getStatusClass = (status: ExamStatus, isVisited: boolean, isCurrent: boolean) => {
    let base = "";
    if (!isVisited) {
      base = isAuthenticMode ? "tcs-status-not-visited" : "bg-slate-800 text-slate-400 border border-slate-700";
    } else if (status === "ANSWERED") {
      base = isAuthenticMode ? "tcs-status-answered" : "bg-emerald-600 text-white font-bold border border-emerald-400";
    } else if (status === "ANSWERED_AND_MARKED") {
      base = isAuthenticMode ? "tcs-status-marked-answered" : "bg-purple-600 text-white font-bold border border-purple-400 relative";
    } else if (status === "MARKED_FOR_REVIEW") {
      base = isAuthenticMode ? "tcs-status-marked" : "bg-purple-800 text-purple-200 border border-purple-600";
    } else {
      base = isAuthenticMode ? "tcs-status-not-answered" : "bg-rose-600 text-white font-bold border border-rose-400";
    }

    if (isCurrent) {
      base += " ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900";
    }
    return base;
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-40 w-80 md:static md:w-80 flex flex-col border-l transition-transform duration-300 ${
        isOpenMobile ? "translate-x-0" : "translate-x-full md:translate-x-0"
      } ${
        isAuthenticMode ? "bg-[#f5f8fc] border-slate-300 text-slate-800" : "bg-slate-900 border-white/10 text-slate-100"
      }`}
    >
      {/* Mobile Toggle Handle */}
      <button
        onClick={onToggleMobile}
        className="md:hidden absolute -left-10 top-20 bg-cyan-600 text-white p-2 rounded-l-lg shadow-lg"
      >
        {isOpenMobile ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Palette Header Legend */}
      <div className={`p-4 border-b text-xs select-none ${isAuthenticMode ? "bg-[#e6effb] border-slate-300" : "bg-slate-950/60 border-white/10"}`}>
        <h3 className="font-bold font-mono uppercase tracking-wider text-[#1f4a8b] dark:text-cyan-300 mb-3">
          Question Palette
        </h3>

        {/* 5-State Legend Badges with Counts */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded bg-emerald-600 text-white">
              {counts.answered}
            </span>
            <span className="truncate">Answered</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded bg-rose-600 text-white">
              {counts.notAnswered}
            </span>
            <span className="truncate">Not Answered</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded bg-white dark:bg-slate-800 border border-slate-400 text-slate-800 dark:text-slate-300">
              {counts.notVisited}
            </span>
            <span className="truncate">Not Visited</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded bg-purple-700 text-white">
              {counts.marked}
            </span>
            <span className="truncate">Marked Review</span>
          </div>

          <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] rounded bg-purple-700 text-white relative">
              {counts.markedAnswered}
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Answered & Marked for Review (Evaluated)</span>
          </div>
        </div>
      </div>

      {/* Grid of Question Numbers */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
          Choose a Question:
        </div>

        <div className="grid grid-cols-5 gap-2.5">
          {sectionQuestions.map((q, idx) => {
            const att = attempts[q.id];
            const isVisited = !!att?.isVisited;
            const status: ExamStatus = att?.status || "NOT_VISITED";
            const globalIndex = questions.findIndex((item) => item.id === q.id);
            const isCurrent = globalIndex === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(globalIndex)}
                className={`h-10 w-full flex items-center justify-center font-mono text-xs font-bold transition-transform active:scale-90 select-none shadow-xs ${getStatusClass(
                  status,
                  isVisited,
                  isCurrent
                )}`}
                title={`Q${q.questionNumber} - ${status}`}
              >
                {q.questionNumber}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
