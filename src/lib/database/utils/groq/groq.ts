import Groq from "groq-sdk";
import { groqPromptV2 } from "./groqPromptV2";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to analyze the resume using Groq AI
export const analyzeResume = async (resumeText: string) => {
  try {
    console.log("Analyzing resume with Groq AI");

    // Call Groq AI for analysis of the extracted resume text
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: groqPromptV2(resumeText),
        },
      ],
      model: "mixtral-8x7b-32768",
    });

    // Extract feedback from the response
    const feedback =
      response.choices[0]?.message?.content || "No feedback available.";
    // console.log("Groq AI Analysis Feedback:", feedback);

    // Parse the feedback into structured sections
    // Assuming the feedback is formatted consistently, you can use regular expressions or markers to parse it.
    const parsedFeedback = parseFeedback(feedback);

    return parsedFeedback;
  } catch (error) {
    console.error("Error analyzing resume with Groq AI:", error);
    throw error;
  }
};

// Helper function to parse the feedback string into different sections
const parseFeedback = (feedback: string) => {
  // Define regular expressions to extract different sections from the feedback
  const getSection = (sectionName: string) => {
    const regex = new RegExp(`${sectionName}\\s*:\\s*([^]+?)(?=\\n\\n|$)`, "i");
    const match = feedback.match(regex);
    return match ? match[1].trim() : null;
  };
  const getGrade = (grade: string) => {
    const regex = new RegExp(`${grade}\\s*:\\s*([^]+?)(?=\\n\\n|$)`, "i");
    const match = feedback.match(regex);
    return match ? match[1].trim() : null;
  };
  const getAreasOfImprovement = (improvement: string) => {
    const regex = new RegExp(`${improvement}\\s*:\\s*([^]+?)(?=\\n\\n|$)`, "i");
    const match = feedback.match(regex);
    return match ? match[1].trim() : null;
  };
  // console.log("Overall Grade:", getSection("Overall Resume Grade"));
  // console.log("Areas for Improvement:", getSection("Areas of Improvement"));
  
  console.log ({
    overallGrade: getGrade("Overall Resume Assessment") || "No grade available",
    detailedFeedback:
      getSection("Content Relevance and Structure") || "No detailed feedback available",
    unnecessarySections:
      getSection("Unnecessary Sections")?.split("\n").filter(Boolean) || [],
    areasForImprovement:
      getSection("Formatting for ATS Compatibility") || "No ATS Compatibility",
    skillsGaps: getSection("Technical and Relevant Skills")?.split("\n").filter(Boolean) || [],
    strengths:
      getSection("Top Recommendations Summary") || "No summary",
    topRecommendations:
      getSection("Summary of Recommendations")?.split("\n").filter(Boolean) ||
      [],
  });
 
};
