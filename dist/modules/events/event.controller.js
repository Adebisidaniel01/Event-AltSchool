"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_service_1 = require("./event.service");
exports.EventController = {
    async list(req, res) {
        const events = await event_service_1.EventService.getAllEvents();
        res.json(events);
    },
    async create(req, res) {
        const event = await event_service_1.EventService.createEvent({
            ...req.body,
            creator: req.user.id
        });
        res.status(201).json(event);
    }
};
