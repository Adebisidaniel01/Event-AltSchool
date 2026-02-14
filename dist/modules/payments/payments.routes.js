"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.paymentRoutes = (0, express_1.Router)();
exports.paymentRoutes.post("/initialize", auth_middleware_1.authenticate, payments_controller_1.PaymentController.initialize);
exports.paymentRoutes.post("/webhook", payments_controller_1.PaymentController.webhook);
