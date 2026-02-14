import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  notifyAt: Date
});

export const Notification = model("Notification", notificationSchema);
