import { Schema, model } from "mongoose";

export type Role = "CREATOR" | "EVENTEE";

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["CREATOR", "EVENTEE"] },
  refreshToken: String
}, { timestamps: true });

export const User = model("User", userSchema);
