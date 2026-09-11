"use client";

import React from "react";
import { Exam, QuestionAttempt } from "@/types/exam";
import { AlertCircle, CheckCircle, X } from "lucide-react";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  exam: Exam;
  attempts: Record<string, QuestionAttempt>;
  timeRemainingSeconds: number;
}

export default function SubmitModal({
  isOpen,
  onClose,
  onConfirmSubmit,
  exam,
  attempts,
  timeRemainingSeconds,
}: SubmitModalProps) {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1f4a8b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Exam Summary & Submission Confirmation</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to submit the test? Here is the summary of your attempts across all sections:
          </p>

          {/* Sectional Summary Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left font-mono">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-2.5">Section Name</th>
                  <th className="p-2.5 text-center">No. of Qs</th>
                  <th className="p-2.5 text-center text-emerald-600 dark:text-emerald-400">Answered</th>
                  <th className="p-2.5 text-center text-rose-600 dark:text-rose-400">Not Answered</th>
                  <th className="p-2.5 text-center text-purple-600 dark:text-purple-400">Marked Review</th>
                  <th className="p-2.5 text-center">Not Visited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {exam.sections.map((sec) => {
                  const secQuestions = exam.questions.filter((q) => q.sectionId === sec.id);
                  let ans = 0;
                  let notAns = 0;
                  let marked = 0;
                  let notVis = 0;

                  secQuestions.forEach((q) => {
                    const att = attempts[q.id];
                    if (!att || !att.isVisited) notVis++;
                    else if (att.status === "ANSWERED" || att.status === "ANSWERED_AND_MARKED") ans++;
                    else if (att.status === "MARKED_FOR_REVIEW") marked++;
                    else notAns++;
                  });

                  return (
                    <tr key={sec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">{sec.name}</td>
                      <td className="p-2.5 text-center">{secQuestions.length}</td>
                      <td className="p-2.5 text-center font-bold text-emerald-600 dark:text-emerald-400">{ans}</td>
                      <td className="p-2.5 text-center font-bold text-rose-600 dark:text-rose-400">{notAns}</td>
                      <td className="p-2.5 text-center font-bold text-purple-600 dark:text-purple-400">{marked}</td>
                      <td className="p-2.5 text-center text-slate-500">{notVis}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
            <span>Remaining Time in Test:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{formatTime(timeRemainingSeconds)}</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Return to Test
          </button>
          <button
            onClick={onConfirmSubmit}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Yes, Submit Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
}
