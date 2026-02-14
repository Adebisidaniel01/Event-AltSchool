import { Request, Response } from "express";
import { Notification } from "./notification.model";
import { scheduleReminder } from "./notification.scheduler";

export const NotificationController = {
  async create(req: any, res: Response) {
    const { eventId, notifyAt } = req.body;

    const notification = await Notification.create({
      user: req.user.id,
      event: eventId,
      notifyAt
    });

    scheduleReminder(new Date(notifyAt), () => {
      console.log("Reminder for event", eventId);
    });

    res.status(201).json(notification);
  }
};
