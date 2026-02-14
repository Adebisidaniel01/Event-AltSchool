"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_model_1 = require("./notification.model");
const notification_scheduler_1 = require("./notification.scheduler");
exports.NotificationController = {
    async create(req, res) {
        const { eventId, notifyAt } = req.body;
        const notification = await notification_model_1.Notification.create({
            user: req.user.id,
            event: eventId,
            notifyAt
        });
        (0, notification_scheduler_1.scheduleReminder)(new Date(notifyAt), () => {
            console.log("Reminder for event", eventId);
        });
        res.status(201).json(notification);
    }
};
