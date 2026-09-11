import { Exam, Question, ExamSection, ExamSectionId } from "@/types/exam";

interface GenerateOptions {
  studyMaterialText: string;
  targetExam?: string;
  difficulty?: "easy" | "medium" | "hard";
  questionCount?: number;
  sections?: string[];
  examTitle?: string;
  sourceFileName?: string;
}

/**
 * INBUILT LOCAL NLP & PATTERN EXTRACTION ENGINE
 * Runs 100% offline without any external API keys or Gemini AI.
 */
export function generateExamLocally(options: GenerateOptions): Exam {
  const {
    studyMaterialText,
    targetExam = "SBI_PO",
    difficulty = "medium",
    questionCount = 15,
    sections = ["reasoning", "quant", "english"],
    examTitle = "Inbuilt Local Test Drill",
    sourceFileName,
  } = options;

  const lines = studyMaterialText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 1. Try to detect direct questions already in the text (e.g. Q1. What is... A) ... B) ...)
  const parsedDirectQuestions = extractPreExistingQuestions(studyMaterialText);

  const generatedQuestions: Question[] = [];
  const selectedSectionIds = (sections && sections.length > 0 ? sections : ["reasoning", "quant", "english"]) as ExamSectionId[];

  if (parsedDirectQuestions.length > 0) {
    // ----------------------------------------------------
    // CASE A: Direct questions extracted from PDF / Notes
    // Maintain EXACT contiguous sequential order (NO SHUFFLE)
    // ----------------------------------------------------
    const totalToTake = Math.min(parsedDirectQuestions.length, questionCount);
    for (let i = 0; i < totalToTake; i++) {
      const q = parsedDirectQuestions[i];
      generatedQuestions.push({
        ...q,
        questionNumber: i + 1,
      });
    }

    // If PDF had fewer questions than requested, synthesize remaining cleanly
    if (generatedQuestions.length < questionCount) {
      let qNum = generatedQuestions.length + 1;
      let subIdx = 0;
      while (generatedQuestions.length < questionCount) {
        const secId = selectedSectionIds[subIdx % selectedSectionIds.length];
        const synQ = synthesizeSectionQuestion(secId, qNum, lines, difficulty, subIdx);
        generatedQuestions.push(synQ);
        qNum++;
        subIdx++;
      }
    }
  } else {
    // ----------------------------------------------------
    // CASE B: Synthesize calibrated question sets from notes
    // ----------------------------------------------------
    const perSectionCount = Math.max(Math.ceil(questionCount / selectedSectionIds.length), 1);
    let globalQuestionNumber = 1;

    selectedSectionIds.forEach((secId) => {
      for (let countForSec = 0; countForSec < perSectionCount && globalQuestionNumber <= questionCount; countForSec++) {
        const q = synthesizeSectionQuestion(secId, globalQuestionNumber, lines, difficulty, countForSec);
        generatedQuestions.push(q);
        globalQuestionNumber++;
      }
    });
  }

  // Derive unique sections present in the generated questions
  const presentSectionIds = Array.from(new Set(generatedQuestions.map((q) => q.sectionId)));
  const finalSections: ExamSectionId[] = presentSectionIds.length > 0 ? presentSectionIds : selectedSectionIds;

  const durationMinutes = Math.max(Math.round(generatedQuestions.length * 1.2), 15);
  const examSections: ExamSection[] = finalSections.map((secId) => {
    const secQs = generatedQuestions.filter((q) => q.sectionId === secId);
    return {
      id: secId,
      name:
        secId === "quant"
          ? "Quantitative Aptitude"
          : secId === "reasoning"
          ? "Reasoning Ability"
          : secId === "english"
          ? "English Language"
          : "General / Banking Awareness",
      hindiName:
        secId === "quant"
          ? "संख्यात्मक अभियोग्यता"
          : secId === "reasoning"
          ? "तर्कशक्ति क्षमता"
          : secId === "english"
          ? "अंग्रेजी भाषा"
          : "सामान्य / बैंकिंग जागरूकता",
      totalQuestions: secQs.length,
      durationMinutes: Math.max(Math.round(durationMinutes / finalSections.length), 5),
      positiveMarks: 1.0,
      negativeMarks: 0.25,
    };
  });

  return {
    id: `local-exam-${Date.now()}`,
    title: examTitle || `${targetExam.replace("_", " ")} Practice Drill`,
    targetExam: targetExam as any,
    totalMarks: generatedQuestions.length,
    totalDurationMinutes: durationMinutes,
    sections: examSections,
    questions: generatedQuestions,
    createdAt: new Date().toISOString(),
    sourceFileName,
    isAiGenerated: false,
  };
}

/**
 * Regex parser for extracting already formatted multiple choice questions from PDFs
 * Handles multi-question Direction sets (e.g., Directions Q. 1 - 4: ...) without shuffling
 */
function extractPreExistingQuestions(text: string): Question[] {
  const extracted: Question[] = [];
  
  // Step 1: Detect Direction blocks with question ranges like "Directions (Q. 1-4):" or "Questions 1 to 4 are based on..."
  const directionRangeRegex = /(?:Directions?\s*(?:\(?(?:Q\.?|Questions?)\s*(\d+)\s*(?:-|to)\s*(\d+)\)?|\s*(\d+)\s*(?:-|to)\s*(\d+))[\.:\-]?)([\s\S]*?)(?=(?:(?:Question|Q|Q\.)\s*\d+[\.:\)]|\n\s*\d+\.\s+|$))/gi;
  
  interface DirectionSet {
    startQ: number;
    endQ: number;
    passage: string;
  }
  
  const directionSets: DirectionSet[] = [];
  let dMatch;
  while ((dMatch = directionRangeRegex.exec(text)) !== null) {
    const startQ = parseInt(dMatch[1] || dMatch[3], 10);
    const endQ = parseInt(dMatch[2] || dMatch[4], 10);
    const passage = (dMatch[5] || "").trim();
    if (!isNaN(startQ) && !isNaN(endQ) && passage.length > 15) {
      directionSets.push({ 
        startQ, 
        endQ, 
        passage: `Directions (Q. ${startQ} - ${endQ}):\n${passage}` 
      });
    }
  }

  // Step 2: Extract individual question blocks (e.g., "1.", "Q1.", "Question 1.")
  const questionBlocks = text.split(/(?:(?:Question|Q|Q\.)\s*(\d+)[\.:\)]|\n\s*(\d+)\.\s+)/i);

  let currentBlockQNum = 1;
  let activeSharedPassage: string | undefined = undefined;
  let activePassageEndQ = 0;

  for (let i = 1; i < questionBlocks.length; i += 3) {
    const rawQNum = questionBlocks[i] || questionBlocks[i + 1];
    const qNum = rawQNum ? parseInt(rawQNum, 10) : currentBlockQNum;
    const block = questionBlocks[i + 2] || "";

    if (block.length < 15) continue;

    // Check if this question number falls inside any parsed direction range (e.g. Q1-4)
    const matchingDir = directionSets.find((d) => qNum >= d.startQ && qNum <= d.endQ);
    let passageContext: string | undefined = matchingDir ? matchingDir.passage : undefined;

    // Also handle inline passage detection if direction sets were not explicitly tagged
    if (!passageContext) {
      if (qNum <= activePassageEndQ && activeSharedPassage) {
        passageContext = activeSharedPassage;
      }
    }

    // Look for options (A) or A.
    const optionMatches = [...block.matchAll(/(?:\(([A-Ea-e])\)|([A-Ea-e])[\.\)])\s*([^\n\(\)]+)/g)];
    if (optionMatches.length >= 4) {
      let rawQText = block.split(/(?:\([A-Ea-e]\)|[A-Ea-e][\.\)])/)[0].trim();
      let extractedQuestion = rawQText;

      // Check if inline direction block starts here (e.g., "Directions (Q. 1-4): ...")
      const inlineDirMatch = rawQText.match(/(?:Directions?\s*(?:\(?(?:Q\.?|Questions?)\s*(\d+)\s*(?:-|to)\s*(\d+)\)?|\s*(\d+)\s*(?:-|to)\s*(\d+))[\.:\-]?)([\s\S]*?)(?:Which|What|Find|How|In the given|$)/i);
      if (inlineDirMatch) {
        const start = parseInt(inlineDirMatch[1] || inlineDirMatch[3], 10);
        const end = parseInt(inlineDirMatch[2] || inlineDirMatch[4], 10);
        const pText = inlineDirMatch[5].trim();
        if (pText.length > 20) {
          passageContext = `Directions (Q. ${start} - ${end}):\n${pText}`;
          activeSharedPassage = passageContext;
          activePassageEndQ = end;
          extractedQuestion = rawQText.replace(inlineDirMatch[0], "").trim();
        }
      } else if (!passageContext && rawQText.includes("\n\n")) {
        const parts = rawQText.split("\n\n");
        if (parts.length >= 2 && (parts[0].toLowerCase().includes("statement") || parts[0].toLowerCase().includes("direction") || parts[0].toLowerCase().includes("study the") || parts[0].toLowerCase().includes("read the"))) {
          passageContext = parts[0].trim();
          extractedQuestion = parts.slice(1).join("\n\n").trim();
        }
      }

      const options = optionMatches.slice(0, 5).map((m, oIdx) => {
        const id = String.fromCharCode(65 + oIdx);
        return {
          id,
          text: (m[3] || "").trim(),
        };
      });

      while (options.length < 5) {
        options.push({
          id: String.fromCharCode(65 + options.length),
          text: "None of the above",
        });
      }

      // Infer section from question content (e.g. puzzle/seating/statements -> reasoning)
      let sectionId: ExamSectionId = "reasoning";
      const lowerText = (passageContext || "" + " " + extractedQuestion).toLowerCase();
      if (lowerText.includes("facing") || lowerText.includes("seating") || lowerText.includes("syllogism") || lowerText.includes("conclusion") || lowerText.includes("inequality") || lowerText.includes("coded") || lowerText.includes("blood relation")) {
        sectionId = "reasoning";
      } else if (lowerText.includes("equation") || lowerText.includes("series") || lowerText.includes("profit") || lowerText.includes("ratio") || lowerText.includes("percentage") || lowerText.includes("train") || lowerText.includes("speed") || lowerText.includes("table di")) {
        sectionId = "quant";
      } else if (lowerText.includes("grammatical") || lowerText.includes("synonym") || lowerText.includes("antonym") || lowerText.includes("sentence") || lowerText.includes("passage") || lowerText.includes("cloze")) {
        sectionId = "english";
      }

      extracted.push({
        id: `extracted-q-${qNum || extracted.length + 1}`,
        sectionId,
        questionNumber: qNum || extracted.length + 1,
        passageContext,
        questionText: extractedQuestion || "Select the appropriate option:",
        options,
        correctOptionId: "A",
        explanation: "Extracted directly from uploaded study material.",
        shortcutTrick: "Review key formulas and eliminate unlikely options.",
        topicTag: passageContext ? "Puzzle / Passage Set" : "Extracted Problem",
        difficulty: "medium",
      });

      currentBlockQNum = (qNum || currentBlockQNum) + 1;
    }
  }

  return extracted;
}

/**
 * Shared Puzzles & Passages for reasoning and DI sets
 */
const SEATING_PUZZLE_PASSAGE = `Directions (Q. 1 - 4): Study the following information carefully and answer the questions given below:
Eight persons - A, B, C, D, E, F, G and H are sitting around a circular table facing towards the center of the table.
• A sits third to the right of B.
• Only two persons sit between B and G.
• C sits second to the left of G.
• D sits immediate right of C.
• E is an immediate neighbor of neither A nor B.
• F sits second to the right of H.`;

/**
 * Synthesize calibrated Indian banking questions from lines and keywords
 */
function synthesizeSectionQuestion(
  sectionId: ExamSectionId,
  qNum: number,
  lines: string[],
  difficulty: "easy" | "medium" | "hard",
  subIndex: number
): Question {
  const contextSnippet = lines[subIndex % lines.length] || "Banking and Financial Principles";

  if (sectionId === "quant") {
    // Generate Arithmetic / Number Series / Quadratic based on subIndex
    const type = subIndex % 4;
    if (type === 0) {
      // Quadratic Equation
      const p = 8 + (subIndex % 5) * 2;
      const q = p + 2;
      return {
        id: `local-quant-${qNum}`,
        sectionId: "quant",
        questionNumber: qNum,
        questionText: `Solve the quadratic equations and establish the relationship between x and y:\nI. x² - ${p + q}x + ${p * q} = 0\nII. y² - ${p + q + 2}y + ${(p + 1) * (q + 1)} = 0`,
        questionTextHindi: `द्विघात समीकरणों को हल करें और x और y के बीच संबंध स्थापित करें:\nI. x² - ${p + q}x + ${p * q} = 0\nII. y² - ${p + q + 2}y + ${(p + 1) * (q + 1)} = 0`,
        options: [
          { id: "A", text: "x > y" },
          { id: "B", text: "x < y" },
          { id: "C", text: "x ≥ y" },
          { id: "D", text: "x ≤ y" },
          { id: "E", text: "x = y or Relationship cannot be established (CND)" },
        ],
        correctOptionId: "D",
        explanation: `Roots of equation I: x = +${p}, +${q}\nRoots of equation II: y = +${p + 1}, +${q + 1}\nComparing roots: ${p} < ${p + 1}, ${q} < ${q + 1}. Thus x ≤ y.`,
        shortcutTrick: `Signs of constant terms are positive, both roots are positive. Compare factor intervals: x ∈ [${p}, ${q}] vs y ∈ [${p + 1}, ${q + 1}] => x ≤ y.`,
        topicTag: "Quadratic Equations",
        difficulty,
      };
    } else if (type === 1) {
      // Missing Number Series
      const base = 12 + subIndex * 3;
      const d1 = 6;
      const d2 = 12;
      const d3 = 24;
      const d4 = 48;
      const missing = base + d1 + d2 + d3 + d4;
      return {
        id: `local-quant-${qNum}`,
        sectionId: "quant",
        questionNumber: qNum,
        questionText: `What will come in place of the question mark (?) in the following number series?\n\n${base}, ${base + d1}, ${base + d1 + d2}, ${base + d1 + d2 + d3}, ?`,
        options: [
          { id: "A", text: `${missing}` },
          { id: "B", text: `${missing - 6}` },
          { id: "C", text: `${missing + 12}` },
          { id: "D", text: `${missing + 4}` },
          { id: "E", text: `${missing - 10}` },
        ],
        correctOptionId: "A",
        explanation: `Pattern: Differences are doubling consecutively (+6, +12, +24, +48).\nNext term = ${base + d1 + d2 + d3} + 48 = ${missing}.`,
        shortcutTrick: "Check consecutive differences: 6, 12, 24 => multiply by 2 pattern. Add 48 to the last term.",
        topicTag: "Missing Number Series",
        difficulty,
      };
    } else {
      // Partnership / Profit & Loss
      const capitalA = 30000 + (subIndex % 3) * 10000;
      const capitalB = 45000;
      const ratioA = (capitalA * 12) / 1000;
      const ratioB = (capitalB * 8) / 1000;
      return {
        id: `local-quant-${qNum}`,
        sectionId: "quant",
        questionNumber: qNum,
        passageContext: `Concept extracted from DPP: ${contextSnippet.slice(0, 140)}`,
        questionText: `A started a business investing ₹${capitalA.toLocaleString("en-IN")}. After 4 months, B joined with ₹${capitalB.toLocaleString("en-IN")}. If the annual profit was ₹${(ratioA + ratioB) * 100}, what is A's share in the profit?`,
        options: [
          { id: "A", text: `₹${ratioA * 100}` },
          { id: "B", text: `₹${ratioB * 100}` },
          { id: "C", text: `₹${(ratioA + 20) * 100}` },
          { id: "D", text: `₹${(ratioB - 10) * 100}` },
          { id: "E", text: "None of these" },
        ],
        correctOptionId: "A",
        explanation: `Profit Ratio (A : B) = (${capitalA} × 12) : (${capitalB} × 8) = ${ratioA} : ${ratioB}.\nA's Share = (${ratioA} / ${ratioA + ratioB}) × Total Profit = ₹${ratioA * 100}.`,
        shortcutTrick: "Profit Ratio = Capital × Time. Simplify months: 12 : 8 = 3 : 2 before multiplying.",
        topicTag: "Partnership & Arithmetic",
        difficulty,
      };
    }
  } else if (sectionId === "reasoning") {
    // Linked Seating Arrangement Puzzle Set (Q1-4 have the same top paragraph!)
    if (subIndex < 4) {
      const puzzleQuestions = [
        {
          q: "Who among the following sits immediate left of A?",
          opts: [
            { id: "A", text: "D" },
            { id: "B", text: "C" },
            { id: "C", text: "F" },
            { id: "D", text: "G" },
            { id: "E", text: "H" },
          ],
          ans: "A",
          exp: "Tracing circular positions clockwise: B -> (2 spots) -> G -> C -> D -> A. D sits immediate left of A.",
        },
        {
          q: "How many persons sit between B and D when counted from the right of B?",
          opts: [
            { id: "A", text: "Three" },
            { id: "B", text: "Two" },
            { id: "C", text: "Four" },
            { id: "D", text: "One" },
            { id: "E", text: "None" },
          ],
          ans: "A",
          exp: "Counting clockwise from B to D passes through 3 individuals: G, C, and E. Hence 3 persons sit between them.",
        },
        {
          q: "Which of the following statements is definitely TRUE regarding H?",
          opts: [
            { id: "A", text: "H sits immediate right of B" },
            { id: "B", text: "H sits opposite to D" },
            { id: "C", text: "H sits second to the left of A" },
            { id: "D", text: "H is an immediate neighbor of E" },
            { id: "E", text: "None of these" },
          ],
          ans: "A",
          exp: "From the constraint F sits 2nd to right of H, H is placed adjacent to B facing center.",
        },
        {
          q: "Who sits exactly opposite to C in the circular arrangement?",
          opts: [
            { id: "A", text: "H" },
            { id: "B", text: "A" },
            { id: "C", text: "F" },
            { id: "D", text: "B" },
            { id: "E", text: "E" },
          ],
          ans: "A",
          exp: "In an 8-person circular table, opposite positions are separated by 3 persons. Position opposite C (pos 3) is H (pos 7).",
        },
      ];

      const item = puzzleQuestions[subIndex % 4];
      return {
        id: `local-reas-${qNum}`,
        sectionId: "reasoning",
        questionNumber: qNum,
        passageContext: SEATING_PUZZLE_PASSAGE,
        questionText: item.q,
        options: item.opts,
        correctOptionId: item.ans,
        explanation: item.exp,
        shortcutTrick: "Standard circular puzzle rule: 8 persons facing center => opposite person is at index (i + 4) % 8.",
        topicTag: "Circular Seating Arrangement (Q1-4 Set)",
        difficulty,
      };
    } else {
      // Q5 onwards: Entirely different standalone question (e.g. Syllogisms or Inequalities) without Q1-4 puzzle!
      return {
        id: `local-reas-${qNum}`,
        sectionId: "reasoning",
        questionNumber: qNum,
        passageContext: `Statements:\nI. All Accounts are Ledgers.\nII. Some Ledgers are Audits.\nIII. No Audit is Cash.\n\nConclusions:\nI. Some Accounts are Audits.\nII. No Cash is Audit.`,
        questionText: `Which of the given conclusions logically follow(s) from the given statements?`,
        options: [
          { id: "A", text: "Only Conclusion I follows" },
          { id: "B", text: "Only Conclusion II follows" },
          { id: "C", text: "Either Conclusion I or II follows" },
          { id: "D", text: "Neither Conclusion I nor II follows" },
          { id: "E", text: "Both Conclusions I and II follow" },
        ],
        correctOptionId: "B",
        explanation: `1. Statement III ('No Audit is Cash') directly implies 'No Cash is Audit' (symmetric negation). Hence Conclusion II is definitely true.\n2. There is no definite intersection between Accounts and Audits, so Conclusion I does not follow.`,
        shortcutTrick: "Rule: 'No A is B' is 100% reversible to 'No B is A'. Conclusion II is immediately verified.",
        topicTag: "Syllogism (Standalone)",
        difficulty,
      };
    }
  } else {
    // English Language (Error Detection / Vocabulary / Cloze Test)
    const type = subIndex % 2;
    if (type === 0) {
      return {
        id: `local-eng-${qNum}`,
        sectionId: "english",
        questionNumber: qNum,
        questionText: `In the sentence below, identify the segment containing a grammatical error:\n\n'The regulatory committee (A) / have mandated that (B) / all NBFC lenders must (C) / maintain adequate capital adequacy. (D) / No error (E)'`,
        options: [
          { id: "A", text: "The regulatory committee" },
          { id: "B", text: "have mandated that" },
          { id: "C", text: "all NBFC lenders must" },
          { id: "D", text: "maintain adequate capital adequacy." },
          { id: "E", text: "No error" },
        ],
        correctOptionId: "B",
        explanation: `In part (B), 'committee' acts as a singular collective noun and requires the singular auxiliary verb 'has' instead of 'have'. Correct sentence: 'The regulatory committee has mandated...'`,
        shortcutTrick: "Collective Noun ('committee') acting as a single unit takes singular verb 'has'.",
        topicTag: "Error Detection",
        difficulty,
      };
    } else {
      return {
        id: `local-eng-${qNum}`,
        sectionId: "english",
        questionNumber: qNum,
        passageContext: `Context from notes: "${contextSnippet.slice(0, 180)}"`,
        questionText: `Select the most appropriate word to fill in the blank:\n\nThe apex bank decided to _________ liquidity in the interbank market by conducting overnight variable rate repo auctions.`,
        options: [
          { id: "A", text: "infuse" },
          { id: "B", text: "impede" },
          { id: "C", text: "reproach" },
          { id: "D", text: "squander" },
          { id: "E", text: "condone" },
        ],
        correctOptionId: "A",
        explanation: `'Infuse' means to inject or introduce liquidity into a system. Repo auctions are standard monetary operations used by central banks to infuse liquidity.`,
        shortcutTrick: "Context clue: 'Repo auctions' are liquidity injection tools -> 'infuse liquidity'.",
        topicTag: "Fillers & Vocabulary",
        difficulty,
      };
    }
  }
}
