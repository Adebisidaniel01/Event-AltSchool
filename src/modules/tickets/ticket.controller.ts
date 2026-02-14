import { Response } from "express";
import { Ticket } from "./ticket.model";
import { generateQR } from "../qr/qr.service";

export const TicketController = {
  async buy(req: any, res: Response) {
    const { eventId } = req.body;
    const { token, qr } = await generateQR();

    const ticket = await Ticket.create({
      event: eventId,
      user: req.user.id,
      qrCode: token
    });

    res.json({ ticket, qr });
  }
};
