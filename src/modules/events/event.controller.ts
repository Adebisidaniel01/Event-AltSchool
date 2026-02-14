import { Request, Response } from "express";
import { EventService } from "./event.service";

export const EventController = {
  async list(req: Request, res: Response) {
    const events = await EventService.getAllEvents();
    res.json(events);
  },

  async create(req: any, res: Response) {
    const event = await EventService.createEvent({
      ...req.body,
      creator: req.user.id
    });
    res.status(201).json(event);
  }
};
