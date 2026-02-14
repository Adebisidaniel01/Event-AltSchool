import { Request, Response } from "express";
import { PaystackService } from "./payments.service";
import { Payment } from "./payments.model";

export const PaymentController = {
  async initialize(req: any, res: Response) {
    const { amount, eventId } = req.body;

    const payment = await PaystackService.initialize(
      req.user.email,
      amount
    );

    await Payment.create({
      user: req.user.id,
      event: eventId,
      amount,
      reference: payment.reference,
      status: "PENDING"
    });

    res.json(payment);
  },

  async webhook(req: Request, res: Response) {
    const event = req.body;

    if (event.event === "charge.success") {
      await Payment.findOneAndUpdate(
        { reference: event.data.reference },
        { status: "SUCCESS" }
      );
    }

    res.sendStatus(200);
  }
};
