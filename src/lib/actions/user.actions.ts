"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.schema";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "../database/utils/utils";
// import { v2 as cloudinary } from 'cloudinary'

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}