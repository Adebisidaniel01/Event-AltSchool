"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payments_service_1 = require("./payments.service");
const payments_model_1 = require("./payments.model");
exports.PaymentController = {
    async initialize(req, res) {
        const { amount, eventId } = req.body;
        const payment = await payments_service_1.PaystackService.initialize(req.user.email, amount);
        await payments_model_1.Payment.create({
            user: req.user.id,
            event: eventId,
            amount,
            reference: payment.reference,
            status: "PENDING"
        });
        res.json(payment);
    },
    async webhook(req, res) {
        const event = req.body;
        if (event.event === "charge.success") {
            await payments_model_1.Payment.findOneAndUpdate({ reference: event.data.reference }, { status: "SUCCESS" });
        }
        res.sendStatus(200);
    }
};
