import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    amount: Number,
    reference: String,
    status: String
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
