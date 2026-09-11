import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // unpdf extracts text cleanly without requiring external workers or Node canvas binaries
    const { text, totalPages } = await extractText(buffer, { mergePages: true });
    const fullText = Array.isArray(text) ? text.join("\n\n") : (text || "");

    if (!fullText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the PDF. The document may be empty or contain only scanned images." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: fullText,
      pages: totalPages || 1,
    });
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF file" },
      { status: 500 }
    );
  }
}
