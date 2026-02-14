import { Router } from "express";
import { PaymentController } from "./payments.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const paymentRoutes = Router();

paymentRoutes.post("/initialize", authenticate, PaymentController.initialize);
paymentRoutes.post("/webhook", PaymentController.webhook);
