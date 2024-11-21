// src/lib/utils/fileParser.ts

import mammoth from "mammoth";

/**
 * Extracts clean, readable text from a .docx resume file.
 * @param buffer - The buffer containing the resume content.
 * @returns A promise that resolves to the extracted text.
 * @throws An error if text extraction fails.
 */
export async function extractResumeText(buffer: Buffer): Promise<string> {
  try {
    const { value } = await mammoth.extractRawText({ buffer });
    return value.trim();
  } catch (error) {
    console.error("Error extracting text:", error);
    throw new Error("Could not extract meaningful text from the resume.");
  }
}
