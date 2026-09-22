"use client";

import React from "react";
import { Download, FileText } from "lucide-react";
import { SAMPLE_EXAMS } from "@/lib/exam-data";

interface DownloadPaperButtonProps {
  examSlug: string;
  examTitle: string;
}

export function DownloadPaperButton({ examSlug, examTitle }: DownloadPaperButtonProps) {
  const handleDownload = () => {
    // Navigate to exam page or trigger print
    window.location.href = `/exam/sbi-po-prelims-mock-1?print=true`;
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-mono text-sm font-semibold transition-all flex items-center justify-center gap-2"
    >
      <Download className="w-4 h-4 text-cyan-400" />
      <span>Download Question Paper PDF</span>
    </button>
  );
}
