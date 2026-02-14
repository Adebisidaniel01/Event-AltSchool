"use strict";
const { Event } = require("../events/event.model");
const { Ticket } = require("../tickets/ticket.model");
const AnalyticsService = {
    async byEvent(creatorId) {
        const events = await Event.find({ creator: creatorId });
        const data = await Promise.all(events.map(async (event) => {
            const tickets = await Ticket.countDocuments({ event: event.id });
            const scanned = await Ticket.countDocuments({
                event: event.id,
                scanned: true,
            });
            return {
                event: event.title,
                tickets,
                scanned,
            };
        }));
        return data;
    },
};
module.exports = { AnalyticsService };
