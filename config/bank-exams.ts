export interface BankExamConfig {
  id: string;
  slug: string;
  name: string;
  examBody: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  totalMarks: number;
  totalDurationMinutes: number;
  sections: {
    name: string;
    questions: number;
    marks: number;
    durationMinutes: number;
  }[];
  expectedCutoff: string;
  negativeMarking: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const BANK_EXAMS: BankExamConfig[] = [
  {
    id: "sbi-po",
    slug: "sbi-po",
    name: "SBI PO Prelims",
    examBody: "State Bank of India (SBI)",
    tagline: "Authentic TCS iON CBT exam hall simulation with negative marking & sectional clocks",
    metaTitle: "SBI PO Prelims Mock Test 2026 Free - TCS iON CBT Simulator | TestPrime",
    metaDescription: "Take free online SBI PO Prelims 2026 mock test in real TCS iON exam hall interface. Sectional 20-min timers, -0.25 negative marking, seating puzzles & DI tables with instant AI score analysis.",
    keywords: [
      "sbi po mock test free",
      "sbi po prelims mock test online",
      "sbi po tcs ion exam simulator",
      "free sbi po test series",
      "sbi po mock test with timer",
      "sbi po english reasoning quant test",
    ],
    totalMarks: 100,
    totalDurationMinutes: 60,
    sections: [
      { name: "English Language", questions: 30, marks: 30, durationMinutes: 20 },
      { name: "Quantitative Aptitude", questions: 35, marks: 35, durationMinutes: 20 },
      { name: "Reasoning Ability", questions: 35, marks: 35, durationMinutes: 20 },
    ],
    expectedCutoff: "58.5 - 63.0 / 100 (General Category Expected)",
    negativeMarking: "0.25 marks deducted per wrong answer",
    faqs: [
      {
        question: "Is this SBI PO mock test interface identical to the actual exam hall?",
        answer: "Yes! TestPrime uses the authentic TCS iON CBT layout featuring the 5-state color question palette, 20-minute locked sectional timers, and split-screen view for reading comprehension and puzzles.",
      },
      {
        question: "Is there negative marking in this mock test?",
        answer: "Yes, exactly matching the official SBI PO pattern: +1.00 for correct answers and -0.25 penalty for every incorrect response.",
      },
      {
        question: "Are solutions and shortcut tricks provided after the test?",
        answer: "Immediately upon submitting, you receive a complete diagnostic report with 20-second shortcut techniques and percentile analytics.",
      },
    ],
  },
  {
    id: "ibps-po",
    slug: "ibps-po",
    name: "IBPS PO Prelims",
    examBody: "Institute of Banking Personnel Selection (IBPS)",
    tagline: "Real exam pressure drill for Probationary Officer recruitment across participating PSU banks",
    metaTitle: "IBPS PO Mock Test 2026 Free Online - Real Exam Pattern | TestPrime",
    metaDescription: "Practice free IBPS PO Prelims 2026 mock tests. Authentic TCS iON console, sectional countdown timers, latest puzzle patterns, and detailed solution explanations.",
    keywords: [
      "ibps po mock test",
      "ibps po free mock test online",
      "ibps po test series free",
      "ibps po prelims cbt practice",
      "bank po mock test",
    ],
    totalMarks: 100,
    totalDurationMinutes: 60,
    sections: [
      { name: "English Language", questions: 30, marks: 30, durationMinutes: 20 },
      { name: "Quantitative Aptitude", questions: 35, marks: 35, durationMinutes: 20 },
      { name: "Reasoning Ability", questions: 35, marks: 35, durationMinutes: 20 },
    ],
    expectedCutoff: "50.0 - 55.5 / 100 (General Category Expected)",
    negativeMarking: "0.25 marks deducted per wrong answer",
    faqs: [
      {
        question: "Can I switch between sections during the IBPS PO test?",
        answer: "No, following official IBPS rules, sectional timing is strictly locked to 20 minutes per section. When the 20-minute timer expires, the test automatically transitions to the next section.",
      },
      {
        question: "Are both English and Hindi languages supported?",
        answer: "Yes! You can toggle between English and Hindi at any time during the test, identical to the exam hall experience.",
      },
    ],
  },
  {
    id: "sbi-clerk",
    slug: "sbi-clerk",
    name: "SBI Clerk Prelims (Junior Associates)",
    examBody: "State Bank of India (SBI)",
    tagline: "High-speed accuracy drill for SBI Clerk Preliminary exam with instant score breakdown",
    metaTitle: "SBI Clerk Mock Test 2026 Free - High Speed Accuracy Drill | TestPrime",
    metaDescription: "Free online SBI Clerk Prelims mock test with official TCS iON format. Practice simplification, number series, seating puzzles, and grammar error detection under 60-min timer.",
    keywords: [
      "sbi clerk mock test free",
      "sbi clerk prelims mock test",
      "sbi clerk speed drill online",
      "free sbi clerk test series 2026",
    ],
    totalMarks: 100,
    totalDurationMinutes: 60,
    sections: [
      { name: "English Language", questions: 30, marks: 30, durationMinutes: 20 },
      { name: "Numerical Ability", questions: 35, marks: 35, durationMinutes: 20 },
      { name: "Reasoning Ability", questions: 35, marks: 35, durationMinutes: 20 },
    ],
    expectedCutoff: "72.0 - 78.5 / 100 (State-wise variation)",
    negativeMarking: "0.25 marks deducted per wrong answer",
    faqs: [
      {
        question: "Why is high speed essential for SBI Clerk?",
        answer: "SBI Clerk cutoffs typically range between 70-80 marks, requiring 85+ attempts with 95% accuracy. TestPrime's keyboard shortcuts (1-5 or A-E) help you shave off 2-3 seconds per question.",
      },
    ],
  },
  {
    id: "ibps-clerk",
    slug: "ibps-clerk",
    name: "IBPS Clerk Prelims (CRP Clerical)",
    examBody: "Institute of Banking Personnel Selection (IBPS)",
    tagline: "Simulated 100-question mock test for national clerical cadre recruitment",
    metaTitle: "IBPS Clerk Mock Test 2026 Online Free - TCS iON Exam Console | TestPrime",
    metaDescription: "Take full-length IBPS Clerk Prelims mock test for free. Real-time sectional timers, negative marking, bilingual support, and in-depth performance analysis.",
    keywords: [
      "ibps clerk mock test free",
      "ibps clerk prelims test series",
      "online mock test for ibps clerk",
      "free banking clerical test",
    ],
    totalMarks: 100,
    totalDurationMinutes: 60,
    sections: [
      { name: "English Language", questions: 30, marks: 30, durationMinutes: 20 },
      { name: "Numerical Ability", questions: 35, marks: 35, durationMinutes: 20 },
      { name: "Reasoning Ability", questions: 35, marks: 35, durationMinutes: 20 },
    ],
    expectedCutoff: "74.0 - 81.0 / 100",
    negativeMarking: "0.25 marks deducted per wrong answer",
    faqs: [
      {
        question: "Is there any sectional cutoff in IBPS Clerk?",
        answer: "Yes, candidates must qualify in each of the three sections by clearing the minimum cutoff score specified by IBPS.",
      },
    ],
  },
  {
    id: "rbi-grade-b",
    slug: "rbi-grade-b",
    name: "RBI Grade B (Phase 1 Prelims)",
    examBody: "Reserve Bank of India (RBI)",
    tagline: "High-difficulty mock test covering General Awareness, Reasoning, English & Quantitative Aptitude",
    metaTitle: "RBI Grade B Mock Test 2026 Phase 1 Free - Tough Level Drill | TestPrime",
    metaDescription: "Free RBI Grade B Phase 1 full mock test. Practice advanced high-level puzzles, tough quantitative aptitude, and financial awareness under official sectional timings.",
    keywords: [
      "rbi grade b mock test free",
      "rbi grade b phase 1 test series",
      "rbi grade b tough mock test",
      "rbi prelims online exam simulator",
    ],
    totalMarks: 200,
    totalDurationMinutes: 120,
    sections: [
      { name: "General Awareness", questions: 80, marks: 80, durationMinutes: 25 },
      { name: "Reasoning Ability", questions: 60, marks: 60, durationMinutes: 45 },
      { name: "English Language", questions: 30, marks: 30, durationMinutes: 25 },
      { name: "Quantitative Aptitude", questions: 30, marks: 30, durationMinutes: 25 },
    ],
    expectedCutoff: "54.0 - 66.0 / 200",
    negativeMarking: "0.25 marks deducted per wrong answer",
    faqs: [
      {
        question: "How tough is RBI Grade B Phase 1 compared to SBI PO?",
        answer: "RBI Grade B is widely considered the toughest banking exam in India, featuring CAT-level reasoning puzzles and demanding general awareness questions.",
      },
    ],
  },
];

export function getExamBySlug(slug: string): BankExamConfig | undefined {
  return BANK_EXAMS.find((e) => e.slug === slug);
}
