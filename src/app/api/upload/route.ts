// POST request handler to analyze the resume
import { NextResponse, NextRequest } from "next/server";
import { extractResumeText } from "@/lib/database/utils/groq/fileParser";
import { analyzeResume } from "@/lib/database/utils/groq/groq";

export async function POST(request: NextRequest) {
  try {
    console.log("Received a POST request to /api/upload");

    // Parse the form data using the formData method
    const formData = await request.formData();

    // Get the uploaded file from formData
    const file = formData.get("resume") as globalThis.File;

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    console.log(`Received file: ${file.name}, size: ${file.size} bytes`);

    // Convert the file to an ArrayBuffer and then to a Buffer for text extraction
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract clean resume text using the utility function
    const resumeText = await extractResumeText(buffer);
    console.log("Resume text extracted successfully");

    // Call the Groq AI analysis function
    console.log("Calling Groq AI to analyze the resume...");
    const feedback = await analyzeResume(resumeText);
    console.log("Resume analyzed successfully");

    // Return the structured analysis to the frontend
    return NextResponse.json(
      {
        message: "Resume uploaded and analyzed successfully.",
        analysis: feedback,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading or analyzing resume:", error);
    return NextResponse.json(
      {
        error: "An error occurred while uploading or analyzing the resume.",
      },
      { status: 500 }
    );
  }
}
