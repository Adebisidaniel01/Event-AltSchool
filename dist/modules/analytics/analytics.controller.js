"use strict";
const { Ticket } = require("../tickets/ticket.model");
const { AnalyticsService } = require("./analytics.service");
const AnalyticsController = {
    async overview(req, res) {
        const totalTickets = await Ticket.countDocuments();
        const scanned = await Ticket.countDocuments({ scanned: true });
        res.json({
            totalTickets,
            scanned,
        });
    },
    async byEvent(req, res) {
        const data = await AnalyticsService.byEvent(req.user.id);
        res.json(data);
    },
};
module.exports = { AnalyticsController };
