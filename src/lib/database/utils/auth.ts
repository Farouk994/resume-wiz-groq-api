// getUserIdFromToken: A utility function to implement to extract the user ID from the JWT token.

// src/lib/utils/auth.ts

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

// export async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
//   try {
//     const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

//     if (!token) {
//       return null;
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
//     return decoded.userId;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// }

export async function getUserIdFromToken(request: NextRequest): Promise<Types.ObjectId | null> {
    try {
      const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
  
      if (!token) {
        return null;
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      console.log('decoded=====>', decoded)
  
      // Convert the userId to Types.ObjectId
      const userId = new Types.ObjectId(decoded.userId);
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }