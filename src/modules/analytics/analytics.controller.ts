import { Request, Response } from "express";
import { Ticket } from "../tickets/ticket.model";
import { AnalyticsService } from "./analytics.service";

export const AnalyticsController = {
  async overview(req: Request, res: Response) {
    const totalTickets = await Ticket.countDocuments();
    const scanned = await Ticket.countDocuments({ scanned: true });

    res.json({
      totalTickets,
      scanned,
    });
  },

  async byEvent(req: Request, res: Response) {
    const data = await AnalyticsService.byEvent((req as any).user.id);
    res.json(data);
  },
};
