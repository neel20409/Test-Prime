"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getExamById, getSession, initializeSession, saveSession, evaluateExam } from "@/lib/test-store";
import { Exam, ExamSession, ExamSectionId, ExamStatus } from "@/types/exam";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionPane from "@/components/exam/QuestionPane";
import QuestionPalette from "@/components/exam/QuestionPalette";
import ActionFooter from "@/components/exam/ActionFooter";
import SubmitModal from "@/components/exam/SubmitModal";
import { sound } from "@/utils/sound";
import { PrintableExamSheet } from "@/components/viral/PrintableExamSheet";

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [exam, setExam] = useState<Exam | null>(null);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<ExamSectionId>("quant");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAuthenticMode, setIsAuthenticMode] = useState(true);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Load Exam and Session
  useEffect(() => {
    const loadedExam = getExamById(id);
    if (!loadedExam) {
      router.push("/");
      return;
    }
    setExam(loadedExam);

    let activeSession = getSession(id);
    if (!activeSession) {
      activeSession = initializeSession(loadedExam);
    }
    setSession(activeSession);
    setCurrentSectionId(activeSession.currentSectionId || loadedExam.sections[0]?.id || "quant");
    setCurrentQuestionIndex(activeSession.currentQuestionIndex || 0);

    // Auto-trigger print if requested via query param
    if (typeof window !== "undefined" && window.location.search.includes("print=true")) {
      setTimeout(() => {
        window.print();
      }, 600);
    }
  }, [id, router]);

  // Section Countdown Timer Tick
  useEffect(() => {
    if (!session || !exam || session.isCompleted) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (!prev) return prev;

        const currentSecTime = prev.sectionTimeRemaining[prev.currentSectionId] || 0;
        const totalTime = prev.totalTimeRemaining || 0;

        if (currentSecTime <= 1 || totalTime <= 1) {
          // Auto submit on time expiry
          clearInterval(timer);
          handleFinalSubmit();
          return prev;
        }

        const updatedSession: ExamSession = {
          ...prev,
          totalTimeRemaining: totalTime - 1,
          sectionTimeRemaining: {
            ...prev.sectionTimeRemaining,
            [prev.currentSectionId]: currentSecTime - 1,
          },
          attempts: {
            ...prev.attempts,
            [exam.questions[currentQuestionIndex]?.id]: {
              ...prev.attempts[exam.questions[currentQuestionIndex]?.id],
              timeSpentSeconds: (prev.attempts[exam.questions[currentQuestionIndex]?.id]?.timeSpentSeconds || 0) + 1,
            },
          },
        };

        saveSession(updatedSession);
        return updatedSession;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.currentSectionId, currentQuestionIndex, exam, session?.isCompleted]);

  if (!exam || !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1f4a8b] text-white font-mono gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin" />
        <p className="text-sm font-bold tracking-widest uppercase">Initializing CBT Exam Console...</p>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex] || exam.questions[0];
  const currentAttempt = session.attempts[currentQuestion.id];
  const currentSection = exam.sections.find((s) => s.id === currentSectionId) || exam.sections[0];
  const sectionQuestions = exam.questions.filter((q) => q.sectionId === currentSectionId);

  // Mark question as Visited when loaded
  const markAsVisited = (qId: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      const existing = prev.attempts[qId];
      if (existing?.isVisited) return prev;

      const updated = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [qId]: {
            ...existing,
            isVisited: true,
            status: (existing?.status === "NOT_VISITED" ? "NOT_ANSWERED" : existing?.status) as ExamStatus,
          },
        },
      };
      saveSession(updated);
      return updated;
    });
  };

  // Option selection
  const handleSelectOption = (optionId: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [currentQuestion.id]: {
            ...prev.attempts[currentQuestion.id],
            selectedOptionId: optionId,
            isVisited: true,
          },
        },
      };
      saveSession(updated);
      return updated;
    });
  };

  // Clear current response
  const handleClearResponse = () => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated: ExamSession = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [currentQuestion.id]: {
            ...prev.attempts[currentQuestion.id],
            selectedOptionId: null,
            status: "NOT_ANSWERED" as ExamStatus,
          },
        },
      };
      saveSession(updated);
      return updated;
    });
  };

  // Navigate to specific index
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < exam.questions.length) {
      setCurrentQuestionIndex(index);
      const targetQuestion = exam.questions[index];
      if (targetQuestion.sectionId !== currentSectionId) {
        setCurrentSectionId(targetQuestion.sectionId);
      }
      markAsVisited(targetQuestion.id);
    }
  };

  // Save & Next Action
  const handleSaveAndNext = () => {
    const hasSelection = !!currentAttempt?.selectedOptionId;
    const newStatus: ExamStatus = hasSelection ? "ANSWERED" : "NOT_ANSWERED";

    setSession((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [currentQuestion.id]: {
            ...prev.attempts[currentQuestion.id],
            status: newStatus,
            isVisited: true,
          },
        },
      };
      saveSession(updated);
      return updated;
    });

    // Advance to next question in section or overall
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < exam.questions.length) {
      goToQuestion(nextIdx);
    }
  };

  // Mark for Review & Next Action
  const handleMarkForReviewAndNext = () => {
    const hasSelection = !!currentAttempt?.selectedOptionId;
    const newStatus: ExamStatus = hasSelection ? "ANSWERED_AND_MARKED" : "MARKED_FOR_REVIEW";

    setSession((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        attempts: {
          ...prev.attempts,
          [currentQuestion.id]: {
            ...prev.attempts[currentQuestion.id],
            status: newStatus,
            isVisited: true,
          },
        },
      };
      saveSession(updated);
      return updated;
    });

    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < exam.questions.length) {
      goToQuestion(nextIdx);
    }
  };

  // Switch Section
  const handleSelectSection = (secId: ExamSectionId) => {
    setCurrentSectionId(secId);
    setSession((prev) => (prev ? { ...prev, currentSectionId: secId } : prev));
    // Find first question of this section
    const firstQIdx = exam.questions.findIndex((q) => q.sectionId === secId);
    if (firstQIdx !== -1) {
      goToQuestion(firstQIdx);
    }
  };

  // Final Submit Handler
  const handleFinalSubmit = () => {
    if (!exam || !session) return;
    const result = evaluateExam(exam, session);
    router.push(`/result/${exam.id}`);
  };

  return (
    <>
      <div className={`no-print h-screen flex flex-col overflow-hidden font-sans ${isAuthenticMode ? "bg-slate-100" : "bg-slate-950 dark"}`}>
        {/* Top Exam Header */}
        <ExamHeader
          exam={exam}
          currentSectionId={currentSectionId}
          onSelectSection={handleSelectSection}
          sectionTimeRemaining={session.sectionTimeRemaining[currentSectionId] || 0}
          isAuthenticMode={isAuthenticMode}
          onToggleThemeMode={() => setIsAuthenticMode((prev) => !prev)}
          language={language}
          onToggleLanguage={setLanguage}
        />

      {/* Main CBT Workspace: Question Pane + Question Palette */}
      <div className="flex-1 flex overflow-hidden relative">
        <QuestionPane
          question={currentQuestion}
          selectedOptionId={currentAttempt?.selectedOptionId || null}
          onSelectOption={handleSelectOption}
          language={language}
          isAuthenticMode={isAuthenticMode}
          positiveMarks={currentSection.positiveMarks}
          negativeMarks={currentSection.negativeMarks}
        />

        <QuestionPalette
          questions={exam.questions}
          currentSectionId={currentSectionId}
          currentQuestionIndex={currentQuestionIndex}
          attempts={session.attempts}
          onSelectQuestion={goToQuestion}
          isAuthenticMode={isAuthenticMode}
          isOpenMobile={isPaletteOpenMobile}
          onToggleMobile={() => setIsPaletteOpenMobile((prev) => !prev)}
        />
      </div>

      {/* Bottom Action Footer */}
      <ActionFooter
        onSaveAndNext={handleSaveAndNext}
        onMarkForReviewAndNext={handleMarkForReviewAndNext}
        onClearResponse={handleClearResponse}
        onSubmitExam={() => setIsSubmitModalOpen(true)}
        isAuthenticMode={isAuthenticMode}
        hasSelectedOption={!!currentAttempt?.selectedOptionId}
      />

      {/* Submission Confirmation Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={handleFinalSubmit}
        exam={exam}
        attempts={session.attempts}
        timeRemainingSeconds={session.totalTimeRemaining}
      />
    </div>

    {/* PRINT-ONLY QUESTION PAPER */}
    <PrintableExamSheet exam={exam} session={session} />
  </>
  );
}
