import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: String,
  date: Date,
  price: Number,
  creator: { type: Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export const Event = model("Event", eventSchema);
