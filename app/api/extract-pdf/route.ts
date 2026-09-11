import { NextRequest, NextResponse } from "next/server";

// Using require for pdf-parse CommonJS compatibility
const pdfParse = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await pdfParse(buffer);
    const extractedText = data.text || "";

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the PDF. It might be scanned/image-only." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      pages: data.numpages,
      info: data.info,
    });
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF" },
      { status: 500 }
    );
  }
}
