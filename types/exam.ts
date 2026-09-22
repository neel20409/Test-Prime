export type ExamSectionId = 'quant' | 'reasoning' | 'english' | 'general';

export type ExamStatus = 
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW'
  | 'ANSWERED_AND_MARKED';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  textHindi?: string;
}

export interface Question {
  id: string;
  sectionId: ExamSectionId;
  questionNumber: number;
  questionText: string;
  questionTextHindi?: string;
  passageContext?: string; // For Reading Comprehension, Data Interpretation tables, or Puzzle premises
  options: QuestionOption[];
  correctOptionId: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  explanation: string;
  shortcutTrick?: string;
  topicTag: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamSection {
  id: ExamSectionId;
  name: string;
  hindiName?: string;
  totalQuestions: number;
  durationMinutes: number;
  positiveMarks: number;
  negativeMarks: number;
}

export interface Exam {
  id: string;
  slug?: string;
  title: string;
  targetExam: 'SBI_PO' | 'IBPS_PO' | 'IBPS_CLERK' | 'RRB_OFFICER' | 'RBI_GRADE_B' | 'CUSTOM';
  totalMarks: number;
  totalDurationMinutes: number;
  sections: ExamSection[];
  questions: Question[];
  createdAt: string;
  sourceFileName?: string;
  isAiGenerated?: boolean;
}

export interface QuestionAttempt {
  questionId: string;
  selectedOptionId: string | null;
  status: ExamStatus;
  timeSpentSeconds: number;
  isVisited: boolean;
}

export interface ExamSession {
  examId: string;
  currentSectionId: ExamSectionId;
  currentQuestionIndex: number;
  sectionTimeRemaining: Record<ExamSectionId, number>; // seconds left
  totalTimeRemaining: number;
  attempts: Record<string, QuestionAttempt>;
  startedAt: string;
  submittedAt?: string;
  isCompleted: boolean;
}

export interface SectionScore {
  sectionId: ExamSectionId;
  sectionName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  marksObtained: number;
  maxMarks: number;
  accuracyPercent: number;
  timeSpentSeconds: number;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  totalScore: number;
  maxScore: number;
  accuracyPercent: number;
  percentileEstimate: number;
  totalTimeSpentSeconds: number;
  sections: SectionScore[];
  topicWiseAccuracy: Record<string, { correct: number; total: number }>;
  aiRecommendations: string[];
}
