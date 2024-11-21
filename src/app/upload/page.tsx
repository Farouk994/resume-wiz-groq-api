"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setMessage("");
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Display the analysis result
        setAnalysisResult(data.analysis);
      } else {
        setMessage(`Error: ${data.error || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while uploading the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      {message && (
        <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 rounded">
          {message}
        </div>
      )}
      {!analysisResult ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-700 font-semibold mb-1">
              Choose Resume File:
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Uploading and Analyzing..." : "Upload"}
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
          {/* Display the detailed analysis result here */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Overall Grade:</h3>
            <p>{analysisResult.overallGrade}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Detailed Feedback:</h3>
            <p>{analysisResult.detailedFeedback}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Unnecessary Sections:</h3>
            <ul className="list-disc list-inside">
              {analysisResult.unnecessarySections?.map((section: string, index: number) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Areas for Improvement:</h3>
            <ul className="list-disc list-inside">
              {analysisResult.areasForImprovement?.map((area: string, index: number) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Skills Gaps and Recommendations:</h3>
            <ul className="list-disc list-inside">
              {analysisResult.skillsGaps?.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Summary of Strengths:</h3>
            <ul className="list-disc list-inside">
              {analysisResult.strengths?.map((strength: string, index: number) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Top Recommendations:</h3>
            <ul className="list-disc list-inside">
              {analysisResult.topRecommendations?.map((recommendation: string, index: number) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
