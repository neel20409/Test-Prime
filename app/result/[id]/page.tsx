"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getExamById, getResult, getSession, clearSession } from "@/lib/test-store";
import { Exam, ExamResult, ExamSession } from "@/types/exam";
import { 
  Trophy, 
  Target, 
  Percent, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  BookOpen, 
  Home,
  Award,
  ArrowRight
} from "lucide-react";
import { AdBanner } from "@/components/ads/AdBanner";
import { EdTechPartners } from "@/components/affiliates/EdTechPartners";
import { ScoreShareBanner } from "@/components/viral/ScoreShareBanner";
import { PrintableExamSheet } from "@/components/viral/PrintableExamSheet";

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [exam, setExam] = useState<Exam | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "review">("summary");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  useEffect(() => {
    const loadedExam = getExamById(id);
    const loadedResult = getResult(id);
    const loadedSession = getSession(id);

    if (!loadedExam || !loadedResult) {
      router.push("/");
      return;
    }

    setExam(loadedExam);
    setResult(loadedResult);
    setSession(loadedSession);
  }, [id, router]);

  if (!exam || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-mono">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const formatDuration = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  const filteredQuestions = exam.questions.filter((q) => {
    if (filterSection !== "all" && q.sectionId !== filterSection) return false;
    
    const att = session?.attempts[q.id];
    const isCorrect = att?.selectedOptionId === q.correctOptionId;
    const isAttempted = !!att?.selectedOptionId;

    if (filterStatus === "correct") return isCorrect;
    if (filterStatus === "incorrect") return isAttempted && !isCorrect;
    if (filterStatus === "unattempted") return !isAttempted;
    return true;
  });

  return (
    <>
      <div className="no-print min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 font-bold font-mono text-sm sm:text-base">
            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xs font-black">TP</span>
            <span>TestPrime</span>
          </Link>
          <span className="text-slate-600 font-mono hidden sm:inline">/</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-300 truncate max-w-xs">
            {result.examTitle}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/create"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate New Test</span>
          </Link>
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* HERO SCORECARD CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Test Completed & Evaluated</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Exam Diagnostic Scorecard
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Standard IBPS/SBI PO Negative Marking Scheme Applied (+1.00 / -0.25)
              </p>
            </div>

            {/* Score & Percentile Badge */}
            <div className="flex items-center gap-4 bg-black/40 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              <div className="text-center px-3 border-r border-white/10">
                <div className="text-[10px] uppercase font-mono text-slate-400">Total Score</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
                  {result.totalScore} <span className="text-xs text-slate-500 font-normal">/ {result.maxScore}</span>
                </div>
              </div>

              <div className="text-center px-3">
                <div className="text-[10px] uppercase font-mono text-slate-400">Percentile</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  {result.percentileEstimate}%
                </div>
              </div>
            </div>
          </div>

          {/* Stat Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Accuracy Rate</div>
                <div className="text-lg font-bold font-mono text-white">{result.accuracyPercent}%</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Correct Answers</div>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  {result.sections.reduce((acc, s) => acc + s.correct, 0)} Qs
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Negative Loss</div>
                <div className="text-lg font-bold font-mono text-rose-400">
                  -{result.sections.reduce((acc, s) => acc + s.incorrect * 0.25, 0).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Time Spent</div>
                <div className="text-lg font-bold font-mono text-white">
                  {formatDuration(result.totalTimeSpentSeconds)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIRAL CHALLENGE & WHATSAPP SCORE SHARE + PDF DOWNLOAD */}
        <ScoreShareBanner exam={exam} result={result} />

        {/* TOP LEADERBOARD AD */}
        <div className="w-full">
          <AdBanner slotId="result_top_leaderboard" format="leaderboard" />
        </div>

        {/* TAB TOGGLE: SUMMARY VS QUESTION-BY-QUESTION REVIEW */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "summary"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sectional Breakdown & Performance Insights
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "review"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Complete Question Review ({exam.questions.length})
          </button>
        </div>

        {/* TAB 1: SUMMARY & SECTIONAL BREAKDOWN */}
        {activeTab === "summary" && (
          <div className="space-y-8">
            {/* Sectional Performance Table */}
            <div className="rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Section-Wise Performance Analysis</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Section</th>
                      <th className="p-3 text-center">Questions</th>
                      <th className="p-3 text-center text-emerald-400">Correct</th>
                      <th className="p-3 text-center text-rose-400">Incorrect</th>
                      <th className="p-3 text-center">Accuracy</th>
                      <th className="p-3 text-center">Marks</th>
                      <th className="p-3 text-center">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {result.sections.map((sec) => (
                      <tr key={sec.sectionId} className="hover:bg-white/[0.02]">
                        <td className="p-3 font-bold text-white">{sec.sectionName}</td>
                        <td className="p-3 text-center text-slate-300">{sec.totalQuestions}</td>
                        <td className="p-3 text-center font-bold text-emerald-400">+{sec.correct}</td>
                        <td className="p-3 text-center font-bold text-rose-400">-{sec.incorrect}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            sec.accuracyPercent >= 80 ? "bg-emerald-500/10 text-emerald-400" :
                            sec.accuracyPercent >= 60 ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
                          }`}>
                            {sec.accuracyPercent}%
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold text-cyan-400">{sec.marksObtained}</td>
                        <td className="p-3 text-center text-slate-400">{formatDuration(sec.timeSpentSeconds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diagnostic Recommendations */}
            <div className="rounded-3xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Performance Telemetry & Cutoff Strategy</span>
              </div>
              <h3 className="text-xl font-bold text-white">Smart Action Plan for Next Mock</h3>

              <div className="space-y-2.5">
                {result.aiRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-200">
                    <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HIGH CONVERTING EDTECH PARTNER OFFERS */}
            <EdTechPartners examName={exam.title} />
          </div>
        )}

        {/* TAB 2: COMPLETE QUESTION REVIEW & EXPLANATIONS */}
        {activeTab === "review" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Section:</span>
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none"
                >
                  <option value="all">All Sections</option>
                  {exam.sections.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                {(["all", "correct", "incorrect", "unattempted"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono capitalize transition-all ${
                      filterStatus === status
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "bg-slate-950 text-slate-400 hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Solution List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const att = session?.attempts[q.id];
                const isSelected = !!att?.selectedOptionId;
                const isCorrect = att?.selectedOptionId === q.correctOptionId;
                const isExpanded = expandedQuestionId === q.id || activeTab === "review";

                return (
                  <React.Fragment key={q.id}>
                    <div
                      className={`rounded-3xl border transition-all p-5 sm:p-6 space-y-4 ${
                      isCorrect
                        ? "bg-emerald-950/15 border-emerald-500/30"
                        : isSelected
                        ? "bg-rose-950/15 border-rose-500/30"
                        : "bg-slate-900/60 border-white/10"
                    }`}
                  >
                    {/* Question Header Status */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-mono font-bold text-sm text-cyan-400">Q{q.questionNumber}.</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-slate-400">
                          {q.topicTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1.00)
                          </span>
                        ) : isSelected ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect (-0.25)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-mono">
                            <MinusCircle className="w-3.5 h-3.5" /> Unattempted (0.00)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Passage Context if present */}
                    {q.passageContext && (
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                        {q.passageContext}
                      </div>
                    )}

                    {/* Question Text */}
                    <div className="text-sm sm:text-base font-medium text-white whitespace-pre-line leading-relaxed">
                      {q.questionText}
                    </div>

                    {/* Options Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt) => {
                        const isChosen = att?.selectedOptionId === opt.id;
                        const isActualCorrect = q.correctOptionId === opt.id;

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs font-mono flex items-start gap-2 ${
                              isActualCorrect
                                ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold"
                                : isChosen
                                ? "bg-rose-950/40 border-rose-500 text-rose-200 font-bold"
                                : "bg-slate-950/40 border-white/5 text-slate-400"
                            }`}
                          >
                            <span className="font-bold">({opt.id})</span>
                            <span className="flex-1">{opt.text}</span>
                            {isActualCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                            {isChosen && !isActualCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Solution & 20s Shortcut Trick Box */}
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs sm:text-sm text-slate-200 space-y-2">
                        <div className="font-bold font-mono text-cyan-400 text-xs uppercase flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>Detailed Step-by-Step Solution:</span>
                        </div>
                        <p className="whitespace-pre-line leading-relaxed text-slate-300">
                          {q.explanation}
                        </p>
                      </div>

                      {q.shortcutTrick && (
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start gap-2">
                          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold font-mono text-amber-400 uppercase text-[11px] block">20-Second Exam Shortcut Trick:</span>
                            <span>{q.shortcutTrick}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* INLINE REVENUE UNIT EVERY 4 QUESTIONS */}
                  {idx > 0 && (idx + 1) % 4 === 0 && (
                    <div className="py-2">
                      <AdBanner slotId={`result_inline_q_${idx}`} format="in-article" />
                    </div>
                  )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>

    {/* PRINTABLE VECTOR PDF QUESTION PAPER & SOLUTIONS */}
    <PrintableExamSheet exam={exam} result={result} session={session} />
  </>
  );
}
