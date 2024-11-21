// src/interfaces/Resume.ts

import { Schema, model, Types, models } from "mongoose";

export interface IResume {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId; // Reference to the User who uploaded the resume
  sessionId?: string;
  analysis?: string;
  uploadDate?: Date;
  fileName?: string; // File path or storage reference
  parsedContent: {
    fullText: string;
    sections: {
      education?: string;
      experience?: string;
      skills?: string;
      projects?: string;
      certifications?: string;
      [key: string]: string | undefined; // For any additional sections
    };
  };
  analysisId?: Types.ObjectId; // Reference to the AnalysisResults
}

// src/models/Resume.ts

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    sessionId: { type: String }, // For anonymous users
    uploadDate: { type: Date, default: Date.now },
    fileName: { type: String, required: true },
    analysis: { type: String, required: true },
    parsedContent: {
      fullText: { type: String, required: true },
      sections: {
        type: Map,
        of: String,
        default: {},
      },
    },
    analysisId: { type: Types.ObjectId, ref: "AnalysisResults" },
  },
  { timestamps: true }
);

const Resume = models.Resume || model("Resume", ResumeSchema);

export default Resume;