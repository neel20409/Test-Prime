import React from "react";
import { Exam, ExamResult, ExamSession } from "@/types/exam";

interface PrintableExamSheetProps {
  exam: Exam;
  result?: ExamResult | null;
  session?: ExamSession | null;
}

export function PrintableExamSheet({
  exam,
  result,
  session,
}: PrintableExamSheetProps) {
  return (
    <div className="print-only text-slate-900 bg-white font-sans p-4">
      {/* EXAM PAPER HEADER */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 font-mono">
              TESTPRIME ALL-INDIA CBT SIMULATOR SERIES - 2026
            </div>
            <h1 className="text-xl font-black text-slate-950 uppercase mt-0.5">
              {exam.title}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Official Pattern Prelims Paper // Negative Marking: -0.25 per incorrect answer
            </p>
          </div>
          <div className="text-right font-mono text-xs border-l-2 border-slate-200 pl-4">
            <div><strong>Time Allowed:</strong> {exam.totalDurationMinutes} Mins</div>
            <div><strong>Total Marks:</strong> {exam.totalMarks}</div>
            <div><strong>Questions:</strong> {exam.questions.length}</div>
          </div>
        </div>

        {/* CANDIDATE PERFORMANCE TELEMETRY IF RESULT AVAILABLE */}
        {result && (
          <div className="mt-4 p-3 rounded-lg border border-slate-300 bg-slate-50 font-mono text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 uppercase">Score Obtained: </span>
              <strong className="text-slate-950 text-sm">{result.totalScore} / {result.maxScore}</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Percentile: </span>
              <strong className="text-slate-950 text-sm">{result.percentileEstimate}%</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Accuracy: </span>
              <strong className="text-slate-950 text-sm">{result.accuracyPercent}%</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase">Correct/Wrong: </span>
              <strong className="text-emerald-700 font-bold">+{result.sections.reduce((a, s) => a + s.correct, 0)}</strong> / <strong className="text-rose-700 font-bold">-{result.sections.reduce((a, s) => a + s.incorrect, 0)}</strong>
            </div>
          </div>
        )}

        <div className="mt-2 text-[10px] text-slate-500 flex justify-between items-center font-mono">
          <span>Candidate Portal: https://test-prime-nine.vercel.app</span>
          <span>Printed for Personal Study Group & Offline Rehearsal</span>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-6">
        {exam.questions.map((q, idx) => {
          const attempt = session?.attempts[q.id];
          const isAttempted = !!attempt?.selectedOptionId;
          const isCorrect = attempt?.selectedOptionId === q.correctOptionId;

          return (
            <div key={q.id} className="avoid-break border-b border-slate-200 pb-4 text-xs">
              <div className="flex items-center justify-between font-mono font-bold text-slate-600 mb-1.5">
                <span className="text-slate-900 font-bold text-sm">
                  Q{idx + 1}. [{q.topicTag}]
                </span>
                {result && isAttempted && (
                  <span className={isCorrect ? "text-emerald-700" : "text-rose-700"}>
                    {isCorrect ? "Candidate Answered: Correct (+1.00)" : "Candidate Answered: Incorrect (-0.25)"}
                  </span>
                )}
              </div>

              {/* Passage Context if any */}
              {q.passageContext && (
                <div className="p-2.5 my-2 rounded bg-slate-100 border border-slate-200 text-[11px] leading-relaxed italic text-slate-800 font-serif">
                  {q.passageContext}
                </div>
              )}

              {/* Question Text */}
              <p className="font-semibold text-slate-950 text-xs sm:text-sm my-2 leading-relaxed">
                {q.questionText}
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 my-2.5 font-mono text-[11px]">
                {q.options.map((opt) => {
                  const isUserSelection = attempt?.selectedOptionId === opt.id;
                  const isActualCorrect = q.correctOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      className={`p-1.5 rounded border ${
                        isActualCorrect
                          ? "border-emerald-600 bg-emerald-50 font-bold text-emerald-950"
                          : isUserSelection
                          ? "border-rose-400 bg-rose-50 text-rose-950"
                          : "border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <span className="font-bold mr-1">({opt.id})</span>
                      <span>{opt.text}</span>
                      {isActualCorrect && <span className="ml-1 text-emerald-700">✓ [Correct Key]</span>}
                      {isUserSelection && !isActualCorrect && <span className="ml-1 text-rose-600">✗ [Your Choice]</span>}
                    </div>
                  );
                })}
              </div>

              {/* Step-by-Step Solution & 20s Shortcut Trick */}
              <div className="mt-2.5 p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                <div className="font-bold text-slate-800 font-mono text-[10px] uppercase">
                  Step-by-Step Mathematical / Logical Solution:
                </div>
                <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                  {q.explanation}
                </p>

                {q.shortcutTrick && (
                  <div className="mt-1 pt-1 border-t border-slate-200 text-amber-900 font-mono text-[10px]">
                    <strong>⚡ 20-Second Exam Shortcut Trick: </strong>
                    <span>{q.shortcutTrick}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-4 border-t-2 border-slate-300 text-center font-mono text-[10px] text-slate-500">
        <p>End of Examination Paper // TestPrime Open-Source Indian Competitive Exam CBT Simulator</p>
        <p className="mt-0.5">Attempt full live exams with timer at https://test-prime-nine.vercel.app</p>
      </div>
    </div>
  );
}
