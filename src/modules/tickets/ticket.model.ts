import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: "Event" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  qrCode: String,
  scanned: { type: Boolean, default: false }
});

export const Ticket = model("Ticket", ticketSchema);
