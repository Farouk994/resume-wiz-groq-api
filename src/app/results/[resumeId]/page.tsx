// src/app/results/[resumeId]/page.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  Resume from "@/lib/database/models/resume.schema";
import { connectToDatabase } from "@/lib/database/mongoose";
import { getUserIdFromToken } from "@/lib/database/utils/auth";
import { Types } from "mongoose";

interface Analysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export default function ResultsPage({ params }: { params: { resumeId: string } }) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/resumes/${params.resumeId}`);
        if (response.ok) {
          const data = await response.json();
          setAnalysis(data.analysis);
        } else {
          router.push("/upload"); // Redirect if resume not found or unauthorized
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
        router.push("/upload");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.resumeId, router]);

  if (loading) {
    return <div>Loading analysis...</div>;
  }

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Resume Analysis Results</h1>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Summary:</h3>
        <p>{analysis.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Strengths:</h3>
        <ul className="list-disc list-inside">
          {analysis.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Weaknesses:</h3>
        <ul className="list-disc list-inside">
          {analysis.weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Suggestions:</h3>
        <ul className="list-disc list-inside">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
