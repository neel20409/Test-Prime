import { Exam, ExamSession, ExamResult, QuestionAttempt, SectionScore, ExamStatus } from "@/types/exam";
import { SAMPLE_EXAMS } from "./exam-data";

const EXAMS_STORAGE_KEY = "testprime_exams_v1";
const SESSIONS_STORAGE_KEY = "testprime_sessions_v1";
const RESULTS_STORAGE_KEY = "testprime_results_v1";

// ----------------------------------------------------
// EXAM REPOSITORY
// ----------------------------------------------------
export function getAllExams(): Exam[] {
  if (typeof window === "undefined") return SAMPLE_EXAMS;
  try {
    const raw = localStorage.getItem(EXAMS_STORAGE_KEY);
    const customExams: Exam[] = raw ? JSON.parse(raw) : [];
    return [...SAMPLE_EXAMS, ...customExams];
  } catch {
    return SAMPLE_EXAMS;
  }
}

export function getExamById(id: string): Exam | null {
  const all = getAllExams();
  return all.find((e) => e.id === id) || null;
}

export function saveCustomExam(exam: Exam): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(EXAMS_STORAGE_KEY);
    const existing: Exam[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((e) => e.id !== exam.id);
    filtered.push(exam);
    localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to save exam to localStorage", err);
  }
}

// ----------------------------------------------------
// SESSION CONTROLLER
// ----------------------------------------------------
export function initializeSession(exam: Exam): ExamSession {
  const initialAttempts: Record<string, QuestionAttempt> = {};
  exam.questions.forEach((q) => {
    initialAttempts[q.id] = {
      questionId: q.id,
      selectedOptionId: null,
      status: "NOT_VISITED",
      timeSpentSeconds: 0,
      isVisited: false,
    };
  });

  const sectionTimers: Record<string, number> = {};
  exam.sections.forEach((sec) => {
    sectionTimers[sec.id] = sec.durationMinutes * 60;
  });

  const session: ExamSession = {
    examId: exam.id,
    currentSectionId: exam.sections[0]?.id || "quant",
    currentQuestionIndex: 0,
    sectionTimeRemaining: sectionTimers as any,
    totalTimeRemaining: exam.totalDurationMinutes * 60,
    attempts: initialAttempts,
    startedAt: new Date().toISOString(),
    isCompleted: false,
  };

  saveSession(session);
  return session;
}

export function getSession(examId: string): ExamSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${SESSIONS_STORAGE_KEY}_${examId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: ExamSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${SESSIONS_STORAGE_KEY}_${session.examId}`, JSON.stringify(session));
  } catch (err) {
    console.error("Failed to save exam session", err);
  }
}

export function clearSession(examId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`${SESSIONS_STORAGE_KEY}_${examId}`);
}

// ----------------------------------------------------
// SCORECARD EVALUATOR
// ----------------------------------------------------
export function evaluateExam(exam: Exam, session: ExamSession): ExamResult {
  let totalScore = 0;
  let maxScore = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  let totalTimeSpent = 0;

  const topicAccuracy: Record<string, { correct: number; total: number }> = {};
  const sectionScores: SectionScore[] = [];

  exam.sections.forEach((sec) => {
    const secQuestions = exam.questions.filter((q) => q.sectionId === sec.id);
    let secAttempted = 0;
    let secCorrect = 0;
    let secIncorrect = 0;
    let secMarks = 0;
    let secTime = 0;
    const secMaxMarks = secQuestions.length * sec.positiveMarks;

    secQuestions.forEach((q) => {
      const attempt = session.attempts[q.id];
      const selected = attempt?.selectedOptionId;
      const timeSpent = attempt?.timeSpentSeconds || 0;
      secTime += timeSpent;

      // Track topic stats
      if (!topicAccuracy[q.topicTag]) {
        topicAccuracy[q.topicTag] = { correct: 0, total: 0 };
      }
      topicAccuracy[q.topicTag].total += 1;

      if (selected) {
        secAttempted += 1;
        totalAttempted += 1;

        if (selected === q.correctOptionId) {
          secCorrect += 1;
          totalCorrect += 1;
          secMarks += sec.positiveMarks;
          topicAccuracy[q.topicTag].correct += 1;
        } else {
          secIncorrect += 1;
          secMarks -= sec.negativeMarks;
        }
      }
    });

    totalScore += secMarks;
    maxScore += secMaxMarks;
    totalTimeSpent += secTime;

    sectionScores.push({
      sectionId: sec.id,
      sectionName: sec.name,
      totalQuestions: secQuestions.length,
      attempted: secAttempted,
      correct: secCorrect,
      incorrect: secIncorrect,
      unattempted: secQuestions.length - secAttempted,
      marksObtained: Math.round(secMarks * 100) / 100,
      maxMarks: secMaxMarks,
      accuracyPercent: secAttempted > 0 ? Math.round((secCorrect / secAttempted) * 100) : 0,
      timeSpentSeconds: secTime,
    });
  });

  const accuracyPercent = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  // Percentile calculation estimation based on banking normal curve
  const normalizedScoreRatio = maxScore > 0 ? totalScore / maxScore : 0;
  let percentile = Math.min(Math.max(Math.round((normalizedScoreRatio * 0.7 + accuracyPercent / 100 * 0.3) * 99), 12), 99.8);
  if (totalScore <= 0) percentile = 8.5;

  // AI Diagnostic Recommendations
  const weakTopics = Object.entries(topicAccuracy)
    .filter(([_, data]) => (data.correct / data.total) < 0.6)
    .map(([topic]) => topic);

  const aiRecommendations: string[] = [];
  if (accuracyPercent < 75) {
    aiRecommendations.push("Focus on negative control: Eliminate risky 50-50 guesses in English & General Awareness to preserve your score.");
  }
  if (weakTopics.length > 0) {
    aiRecommendations.push(`Target high-priority revision in: ${weakTopics.slice(0, 3).join(", ")}.`);
  } else {
    aiRecommendations.push("Consistent performance across all tested topics! Maintain this speed-accuracy balance in full 100-question mock drills.");
  }
  if (totalTimeSpent > 0 && totalAttempted / (totalTimeSpent / 60) < 0.7) {
    aiRecommendations.push("Pacing optimization: Practice 20-second shortcut techniques for Number Series and Inequalities to free up time for high-yield DI tables.");
  }

  const result: ExamResult = {
    examId: exam.id,
    examTitle: exam.title,
    totalScore: Math.round(totalScore * 100) / 100,
    maxScore,
    accuracyPercent,
    percentileEstimate: Math.round(percentile * 10) / 10,
    totalTimeSpentSeconds: totalTimeSpent,
    sections: sectionScores,
    topicWiseAccuracy: topicAccuracy,
    aiRecommendations,
  };

  saveResult(result);
  return result;
}

export function saveResult(result: ExamResult): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${RESULTS_STORAGE_KEY}_${result.examId}`, JSON.stringify(result));
  } catch (err) {
    console.error("Failed to save result", err);
  }
}

export function getResult(examId: string): ExamResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${RESULTS_STORAGE_KEY}_${examId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
