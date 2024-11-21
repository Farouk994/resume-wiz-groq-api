// src/lib/actions/resume.actions.ts

import Resume from "@/lib/database/models/resume.schema";
import { IResume } from "@/lib/database/models/resume.schema";
import { connectToDatabase } from "@/lib/database/mongoose";
import { parseResumeContent } from "../database/utils/groq/parser";
// import { analyzeResumeWithGROQ } from "@/lib/utils/groq"; // New Sanity integration
// import { analyzeResume as analyzeResumeWithOpenAI } from "@/lib/utils/openai"; // Original OpenAI integration
import { Types } from "mongoose";
import { analyzeResume as analyzeResumeWithGROQ } from "../database/utils/groq/groq";
import { File as FormidableFile } from "formidable";
import { readFile } from "fs/promises";

// :TODO: Takes the full text of the resume and parses it.
// Implement parsing logic to extract specific sections as needed.

// Enum to decide which analysis engine to use
export enum AnalysisEngine {
  MONGODB = "mongodb",
  SANITY = "sanity",
}

// Upload and analyze resume using either MongoDB or Sanity (based on engine selection)
export const uploadAndAnalyzeResume = async (
  // userId: Types.ObjectId | null,
  file: globalThis.File,
  engine: AnalysisEngine
): Promise<any> => {
  console.log("uploadAndAnalyzeResume called");
  console.log(`File name: ${file.name}, size: ${file.size} bytes`);

  // Read file content
  console.log("Reading file content");
  const fileContent = await file.text();
  console.log("File content read successfully");

  // Parse the resume content
  console.log("Parsing resume content");
  const parsedContent = parseResumeContent(fileContent);
  console.log("Resume content parsed successfully");

  if (engine === AnalysisEngine.SANITY) {
    // Use Sanity for analyzing the resume content
    console.log("Analyzing resume with Sanity (GROQ)");
    const analysis = await analyzeResumeWithGROQ(parsedContent.fullText);
    console.log("Resume analysis with Sanity completed");

    // Provide a default file name if necessary
    const fileName = file.name ?? "unknown";

    const result = {
      originalFile: fileName,
      parsedContent,
      analysis,
    };
    console.log("Returning analysis result from Sanity");
    return result;
  } else if (engine === AnalysisEngine.MONGODB) {
    // Use MongoDB for storing the resume content
    console.log("Saving resume to MongoDB");
    await connectToDatabase();

    const originalFilename = file.name ?? "unknown";

    // Create and save the resume document in MongoDB
    const newResume: IResume = {
      // userId,
      fileName: originalFilename,
      parsedContent,
      analysis: "Analysis done via Sanity or custom logic if needed", // Placeholder if analysis isn't done directly
    };
    const resumeDocument = new Resume(newResume);
    await resumeDocument.save();

    console.log("Resume saved to MongoDB successfully");
    return resumeDocument;
  } else {
    throw new Error("Invalid analysis engine or missing userId for MongoDB.");
  }
};
