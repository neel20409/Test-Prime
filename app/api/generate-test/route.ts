import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Exam, ExamSectionId } from "@/types/exam";

export const dynamic = "force-dynamic";

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-pro",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      studyMaterialText, 
      targetExam = "SBI_PO", 
      difficulty = "medium", 
      questionCount = 15,
      examTitle = "AI Generated Custom Drill",
      sections = ["quant", "reasoning", "english"]
    } = body;

    if (!studyMaterialText || studyMaterialText.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide valid study material, notes, or topic outlines." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "Gemini API key is not configured. Please provide your Gemini API key in the configuration or environment variables." 
        },
        { status: 401 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt = `You are the Chief Exam Controller and Question Setter for Indian Banking Exams (SBI PO, IBPS PO, IBPS Clerk, RBI Grade B).
Your task is to analyze the provided study material, DPP, or notes and construct a realistic, calibrated Computer-Based Test (CBT) strictly adhering to Indian Banking Exam standards.

Rules:
1. Target Exam: ${targetExam}
2. Difficulty Level: ${difficulty} (easy: Clerical prelims, medium: PO prelims, hard: PO Mains / Advanced)
3. Total Questions: Exactly ${questionCount} questions distributed across requested sections: ${sections.join(", ")}.
4. Every single question MUST have EXACTLY 5 options: "A", "B", "C", "D", "E".
5. QUESTION SETS / PARAGRAPH REFERENCING (CRITICAL):
   - When generating sets for Reasoning Puzzles, Seating Arrangements, Reading Comprehension, or Data Interpretation (e.g., Q1 to Q4):
     - Every question in the set (Q1, Q2, Q3, Q4) MUST contain the exact same reference passage / puzzle instructions in its "passageContext" field (e.g. "Directions (Q. 1 - 4): Study the following information...").
     - Each question's "questionText" must contain ONLY the specific sub-question prompt (e.g. "Who sits immediate left of P?").
     - After the set concludes (e.g., from Q5 onwards), subsequent questions must either be standalone questions without that passage or start a new distinct set.
6. Every question MUST include:
   - "id": unique string (e.g. "gen-q-1")
   - "sectionId": one of "quant" | "reasoning" | "english" | "general"
   - "questionNumber": integer 1 to ${questionCount}
   - "questionText": clearly formulated question statement (with mathematical symbols or clean prompt)
   - "questionTextHindi": optional Hindi translation of the question if applicable
   - "passageContext": shared paragraph / puzzle / DI table / direction premise for question sets (e.g., Q1-4), or null for standalone questions.
   - "options": Array of 5 items with "id" ("A"|"B"|"C"|"D"|"E") and "text"
   - "correctOptionId": "A"|"B"|"C"|"D"|"E"
   - "explanation": Step-by-step rigorous solution explanation
   - "shortcutTrick": Fast 20-30 second mental calculation or elimination shortcut technique
   - "topicTag": Specific topic (e.g. "Data Interpretation", "Syllogism", "Reading Comprehension", "Linear Seating Arrangement (Q1-4 Set)", "Error Detection")
   - "difficulty": "easy" | "medium" | "hard"

Respond ONLY with valid JSON matching the schema:
{
  "title": "${examTitle}",
  "targetExam": "${targetExam}",
  "totalMarks": ${questionCount},
  "totalDurationMinutes": ${Math.max(Math.round(questionCount * 1.2), 15)},
  "sections": [
    ${sections.map((sec: string) => `{
      "id": "${sec}",
      "name": "${sec === 'quant' ? 'Quantitative Aptitude' : sec === 'reasoning' ? 'Reasoning Ability' : sec === 'english' ? 'English Language' : 'General / Banking Awareness'}",
      "totalQuestions": ${Math.round(questionCount / sections.length)},
      "durationMinutes": ${Math.max(Math.round(questionCount * 1.2 / sections.length), 5)},
      "positiveMarks": 1.0,
      "negativeMarks": 0.25
    }`).join(",\n")}
  ],
  "questions": [...]
}

Study Material / Notes Input:
"""
${studyMaterialText.slice(0, 18000)}
"""`;

    let generatedText = "";
    let lastError = null;

    // Try available models in failover order
    for (const modelName of GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          }
        });

        const result = await model.generateContent(systemPrompt);
        generatedText = result.response.text();
        if (generatedText) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, falling back to next...`, err.message);
      }
    }

    if (!generatedText) {
      throw lastError || new Error("Failed to generate test with Gemini AI.");
    }

    // Parse JSON
    const examData: Exam = JSON.parse(generatedText);
    examData.id = `ai-exam-${Date.now()}`;
    examData.createdAt = new Date().toISOString();
    examData.isAiGenerated = true;

    return NextResponse.json({ success: true, exam: examData });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate exam from provided material." },
      { status: 500 }
    );
  }
}
