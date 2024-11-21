// src/interfaces/User.ts

import { model, models, Schema, Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  preferences?: {
    targetIndustry?: string;
    notificationSettings?: {
      emailNotifications?: boolean;
      smsNotifications?: boolean;
    };
  };
  uploadedResumes?: Types.ObjectId[]; // Array of Resume IDs
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    preferences: {
      targetIndustry: { type: String },
      notificationSettings: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: true },
      },
    },
    uploadedResumes: [{ type: Schema.Types.ObjectId, ref: "Resume" }],
  },
  { timestamps: false }
);

const User = models.User || model("User", UserSchema);

export default User;