"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRController = void 0;
const ticket_model_1 = require("../tickets/ticket.model");
exports.QRController = {
    async scan(req, res) {
        const { qrToken } = req.body;
        const ticket = await ticket_model_1.Ticket.findOne({ qrCode: qrToken }).populate("event");
        if (!ticket) {
            return res.status(404).json({ message: "Invalid ticket" });
        }
        if (ticket.scanned) {
            return res.status(400).json({ message: "Ticket already used" });
        }
        ticket.scanned = true;
        await ticket.save();
        res.json({
            message: "Access granted",
            event: ticket.event
        });
    }
};
