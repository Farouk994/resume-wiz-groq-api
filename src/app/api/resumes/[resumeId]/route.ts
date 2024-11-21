// src/app/api/resumes/[resumeId]/route.ts

import { NextResponse } from "next/server";
import  Resume, { IResume } from "@/lib/database/models/resume.schema";
import { connectToDatabase } from "@/lib/database/mongoose";
import { getUserIdFromToken } from "@/lib/database/utils/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { resumeId: string } }) {
  try {
    await connectToDatabase();

    // Get the user ID from the token
    const userId = await getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Find the resume by ID and user ID
    // const resume = await Resume.findOne({
    //   _id: params.resumeId,
    //   userId,
    // }).lean();
    const resume = await Resume.findOne({_id: params.resumeId, userId}).lean().exec() as IResume | null;


    if (!resume) {
      return NextResponse.json({ error: "Resume not found." }, { status: 404 });
    }

    return NextResponse.json({ analysis: resume.analysis });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
