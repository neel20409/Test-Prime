import { NextRequest, NextResponse } from "next/server";

const pdfParseModule = require("pdf-parse");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";
    let pages = 1;

    if (typeof pdfParseModule === "function") {
      const data = await pdfParseModule(buffer);
      extractedText = data.text || "";
      pages = data.numpages || 1;
    } else if (pdfParseModule.PDFParse) {
      const parser = new pdfParseModule.PDFParse({ data: buffer });
      const data = await parser.getText();
      extractedText = data.text || "";
      pages = data.total || (data.pages ? data.pages.length : 1);
      if (typeof parser.destroy === "function") {
        await parser.destroy();
      }
    } else {
      throw new Error("Could not initialize PDF parser engine");
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the PDF. The document may be empty or contain only raster images." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      pages,
    });
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process PDF file" },
      { status: 500 }
    );
  }
}
