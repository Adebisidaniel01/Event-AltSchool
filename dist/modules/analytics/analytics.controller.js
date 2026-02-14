"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const ticket_model_1 = require("../tickets/ticket.model");
const analytics_service_1 = require("./analytics.service");
exports.AnalyticsController = {
    async overview(req, res) {
        const totalTickets = await ticket_model_1.Ticket.countDocuments();
        const scanned = await ticket_model_1.Ticket.countDocuments({ scanned: true });
        res.json({
            totalTickets,
            scanned,
        });
    },
    async byEvent(req, res) {
        const data = await analytics_service_1.AnalyticsService.byEvent(req.user.id);
        res.json(data);
    },
};
