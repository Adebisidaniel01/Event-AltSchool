"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const event_model_1 = require("../events/event.model");
const ticket_model_1 = require("../tickets/ticket.model");
exports.AnalyticsService = {
    async byEvent(creatorId) {
        const events = await event_model_1.Event.find({ creator: creatorId });
        return Promise.all(events.map(async (event) => {
            const totalTickets = await ticket_model_1.Ticket.countDocuments({
                event: event._id,
            });
            const scanned = await ticket_model_1.Ticket.countDocuments({
                event: event._id,
                scanned: true,
            });
            return {
                eventId: event._id,
                eventTitle: event.title,
                totalTickets,
                scanned,
            };
        }));
    },
};
