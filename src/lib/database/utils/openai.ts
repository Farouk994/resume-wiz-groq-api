// src/lib/utils/openai.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const openai = new OpenAIApi(configuration);

export const analyzeResume = async (resumeText: string) => {
  try {
 
    const prompt = `
      Analyze the following resume and provide:

      Summary:
      [Provide a brief summary.]

      Strengths:
      [List the strengths.]

      Weaknesses:
      [List the weaknesses.]

      Suggestions:
      [List suggestions for improvement.]

      Resume:
      ${resumeText}
    `;

    console.log('Sending prompt to OpenAI');
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant analyzing resumes.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    console.log('Received response from OpenAI');
    const analysisText = response.choices[0].message?.content;

    if (!analysisText) {
      throw new Error(
        "The analysis text is empty. The OpenAI API response may be incorrect or empty."
      );
    }

    // Parse the analysis text into structured data
    console.log('Parsing analysis text');
    const analysis = parseAnalysis(analysisText);
    console.log('Analysis text parsed successfully',analysis);

    return analysis;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

// Helper function to parse the analysis text into structured data
const parseAnalysis = (text: string) => {
  // Implement parsing logic based on the expected format of the OpenAI response
  // For example, split the text into sections
  const analysis = {
    summary: "",
    strengths: [] as string[],
    weaknesses: [] as string[],
    suggestions: [] as string[],
  };

  // Parse the text to fill in the analysis object
  // This is a simple example; you may need more robust parsing
  const lines = text?.split("\n").map((line) => line.trim());

  let currentSection: keyof typeof analysis | null = null;

  for (const line of lines) {
    if (line.toLowerCase().includes("summary:")) {
      currentSection = "summary";
      continue;
    } else if (line.toLowerCase().includes("strengths:")) {
      currentSection = "strengths";
      continue;
    } else if (line.toLowerCase().includes("weaknesses:")) {
      currentSection = "weaknesses";
      continue;
    } else if (line.toLowerCase().includes("suggestions:")) {
      currentSection = "suggestions";
      continue;
    }

    if (currentSection && line) {
      if (currentSection === "summary") {
        analysis.summary += line + " ";
      } else {
        analysis[currentSection].push(line);
      }
    }
  }

  return analysis;
};
