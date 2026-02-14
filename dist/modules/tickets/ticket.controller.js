"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticket_model_1 = require("./ticket.model");
const qr_service_1 = require("../qr/qr.service");
exports.TicketController = {
    async buy(req, res) {
        const { eventId } = req.body;
        const { token, qr } = await (0, qr_service_1.generateQR)();
        const ticket = await ticket_model_1.Ticket.create({
            event: eventId,
            user: req.user.id,
            qrCode: token
        });
        res.json({ ticket, qr });
    }
};
