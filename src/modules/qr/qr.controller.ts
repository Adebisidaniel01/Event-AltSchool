import { Request, Response } from "express";
import { Ticket } from "../tickets/ticket.model";

export const QRController = {
  async scan(req: Request, res: Response) {
    const { qrToken } = req.body;

    const ticket = await Ticket.findOne({ qrCode: qrToken }).populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    if (ticket.scanned) {
      return res.status(400).json({ message: "Ticket already used" });
    }

    ticket.scanned = true;
    await ticket.save();

    res.json({
      message: "Access granted",
      event: ticket.event
    });
  }
};
