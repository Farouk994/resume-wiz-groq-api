// src/lib/utils/shared.ts
export const parseAnalysisText = (text: string) => {
    const analysis = {
      summary: "",
      strengths: [] as string[],
      weaknesses: [] as string[],
      suggestions: [] as string[],
    };
  
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
  