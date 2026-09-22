"use client";

import React, { useState } from "react";
import { Exam, ExamResult } from "@/types/exam";
import { 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Send, 
  Flame, 
  Printer, 
  FileText,
  Award
} from "lucide-react";

interface ScoreShareBannerProps {
  exam: Exam;
  result: ExamResult;
}

export function ScoreShareBanner({ exam, result }: ScoreShareBannerProps) {
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const siteUrl = "https://test-prime-nine.vercel.app";
  const shareUrl = exam.slug ? `${siteUrl}/mock-test/${exam.slug}` : `${siteUrl}/exam/${exam.id}`;

  const shareText = `🎯 I scored *${result.totalScore}/${result.maxScore}* (Percentile: *${result.percentileEstimate}%*, Accuracy: *${result.accuracyPercent}%*) in *${exam.title}* on the TestPrime CBT Simulator! ⚡

Think you can beat my score? Attempt the free test here:
${shareUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`🎯 I scored ${result.totalScore}/${result.maxScore} in ${exam.title}! Can you beat my score?`)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintPdf = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 200);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Challenge Pitch */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Challenge Your Study Circle</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Share Your Score & Compare Cutoffs
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Post your score to your banking WhatsApp or Telegram group. Challenge your batchmates to beat your{" "}
            <span className="text-cyan-400 font-bold">{result.totalScore} marks</span> or download the complete question paper PDF for offline group discussion.
          </p>
        </div>

        {/* Right: One-Click Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* WhatsApp Direct Share */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold font-mono text-xs sm:text-sm shadow-lg shadow-[#25D366]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {/* Authentic WhatsApp SVG Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.892-.447-1.488-.616-2.457-2.115-2.532-2.215-.075-.1-.606-.807-.606-1.54 0-.733.383-1.093.518-1.242.135-.149.297-.186.396-.186.099 0 .198.001.284.006.091.004.214-.035.335.257.126.304.428 1.045.466 1.122.038.077.063.167.013.267-.051.101-.077.163-.153.252-.076.089-.16.198-.229.266-.076.075-.156.157-.067.31.089.153.395.652.848 1.056.583.521 1.074.682 1.227.758.153.076.243.064.333-.04.09-.104.385-.45.488-.604.103-.153.205-.128.344-.077.139.051.884.417 1.036.493.152.076.253.114.29.177.038.063.038.368-.106.773z" />
            </svg>
            <span>Share on WhatsApp</span>
          </a>

          {/* Telegram Share */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/40 text-[#0088cc] hover:text-white font-bold font-mono text-xs sm:text-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Telegram</span>
          </a>

          {/* Copy Challenge Text */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all"
            title="Copy Challenge Message"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy Text</span>
              </>
            )}
          </button>

          {/* Download & Print Full PDF */}
          <button
            onClick={handlePrintPdf}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Paper PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
