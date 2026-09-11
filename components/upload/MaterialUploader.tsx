"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCustomExam } from "@/lib/test-store";
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Settings2, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  AlertCircle,
  Key,
  Clock,
  ArrowRight
} from "lucide-react";

export default function MaterialUploader() {
  const router = useRouter();

  const [notesText, setNotesText] = useState("");
  const [targetExam, setTargetExam] = useState<string>("SBI_PO");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [customKey, setCustomKey] = useState<string>("");
  const [selectedSections, setSelectedSections] = useState<string[]>(["quant", "reasoning", "english"]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simple client-side text extractor for .txt / .md / raw files
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setNotesText((prev) => (prev ? `${prev}\n\n--- ${file.name} ---\n${content}` : content));
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleNotes = () => {
    setNotesText(
      `BANKING QUANT & REASONING STUDY MATERIAL // DPP 04
Topics: Profit & Loss with Partnership, Missing Series, Seating Arrangement & Syllogism.

Key Concepts & Formulas:
1. Partnership: Profit Ratio = (Capital A × Time A) : (Capital B × Time B).
2. Number Series: Mixed exponential and prime gap differences. Look out for square/cube additions (e.g. n³ + 1, 2ⁿ - 1).
3. Syllogism Rules:
   - 'Only a few A are B' means Some A are B AND Some A are NOT B.
   - 'All A are B' + 'Some B are C' does not yield definite relation between A and C.
4. Error Detection & Grammar:
   - Subject-Verb agreement across prepositional phrases.
   - Parallelism in conjunctions ('neither...nor', 'not only...but also').
5. Banking Terminology:
   - Repo rate vs Reverse Repo Rate, Liquidity Adjustment Facility (LAF), Marginal Standing Facility (MSF).`
    );
  };

  const toggleSection = (secId: string) => {
    setSelectedSections((prev) =>
      prev.includes(secId)
        ? prev.length > 1
          ? prev.filter((s) => s !== secId)
          : prev
        : [...prev, secId]
    );
  };

  const handleGenerate = async () => {
    if (!notesText.trim()) {
      setErrorMessage("Please paste or upload study materials, DPP notes, or chapter topics.");
      return;
    }

    setErrorMessage("");
    setIsGenerating(true);
    setGenerationStep("Analyzing study material concepts and syllabus nodes...");

    try {
      setTimeout(() => setGenerationStep("Formulating authentic 5-option banking questions with negative marking..."), 2000);
      setTimeout(() => setGenerationStep("Generating step-by-step solutions and 20s shortcut tricks..."), 4000);

      const res = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyMaterialText: notesText,
          targetExam,
          difficulty,
          questionCount,
          sections: selectedSections,
          examTitle: `${targetExam.replace("_", " ")} Custom AI Test Drill`,
          apiKey: customKey || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate test.");
      }

      // Save to local test store
      saveCustomExam(data.exam);

      // Navigate to the test interface
      router.push(`/exam/${data.exam.id}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while generating the test.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Study Material to CBT Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Upload Notes or DPP & Generate Mock Test
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Paste any chapter notes, daily practice problems (DPP), or formula sheets. TestPrime will calibrate a real-time banking exam for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Study Material / Notes / DPP Content
          </label>
          <button
            type="button"
            onClick={handleLoadSampleNotes}
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-mono font-semibold"
          >
            + Load Sample Banking DPP
          </button>
        </div>

        <div className="relative">
          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            rows={7}
            placeholder="Paste your chapter notes, questions list, syllogism rules, arithmetic formulas, reading passages, or topic outlines here..."
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y"
          />

          {/* Quick Upload Pill */}
          <div className="mt-2 flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors">
              <UploadCloud className="w-4 h-4 text-cyan-500" />
              <span>Attach File (.txt / .md)</span>
              <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {notesText ? `${notesText.length} characters loaded` : "No material added yet"}
            </span>
          </div>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
        {/* Target Exam Presets */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Target Exam Pattern
          </label>
          <select
            value={targetExam}
            onChange={(e) => setTargetExam(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="SBI_PO">🏦 SBI PO Prelims (Hard / Moderate)</option>
            <option value="IBPS_PO">🏢 IBPS PO Prelims (Moderate)</option>
            <option value="IBPS_CLERK">📑 IBPS Clerk Prelims (Fast Speed / Easy)</option>
            <option value="RRB_OFFICER">🌾 RRB Officer Scale I (Quant + Reasoning)</option>
            <option value="RBI_GRADE_B">🏛️ RBI Grade B Phase 1 (Advanced Economics & Quant)</option>
          </select>
        </div>

        {/* Difficulty Calibration */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Difficulty Calibration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "easy", label: "Clerk Prelims", color: "text-emerald-500" },
              { id: "medium", label: "PO Prelims", color: "text-amber-500" },
              { id: "hard", label: "PO Mains", color: "text-rose-500" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  difficulty === d.id
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                <div>{d.id.toUpperCase()}</div>
                <div className={`text-[9px] ${d.color}`}>{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Ingestion */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Include Exam Sections
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "quant", name: "Quant" },
              { id: "reasoning", name: "Reasoning" },
              { id: "english", name: "English" },
              { id: "general", name: "GA / Banking" },
            ].map((sec) => {
              const isSelected = selectedSections.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                    isSelected
                      ? "bg-[#1f4a8b] dark:bg-cyan-500 text-white dark:text-slate-950 border-transparent shadow-xs"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {sec.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Count */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Total Questions: <span className="text-cyan-500 font-bold">{questionCount} Qs</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 35].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setQuestionCount(cnt)}
                className={`py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                  questionCount === cnt
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-500"
                }`}
              >
                {cnt} Qs
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Gemini API Key Override */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
          <Key className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>Gemini AI Key (Uses Server Environment Key by default):</span>
        </div>
        <input
          type="password"
          placeholder="AIzaSy... (Optional override)"
          value={customKey}
          onChange={(e) => setCustomKey(e.target.value)}
          className="w-full sm:w-60 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none"
        />
      </div>

      {/* Error Display */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full py-4 rounded-2xl font-bold font-mono text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
            isGenerating
              ? "bg-slate-700 text-slate-300 cursor-wait"
              : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 text-white hover:opacity-95 active:scale-[0.99]"
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>{generationStep}</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              <span>Convert Material to Live Banking Exam</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
