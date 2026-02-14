import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { eventRoutes } from "./modules/events/event.routes";
import { ticketRoutes } from "./modules/tickets/ticket.routes";
import { paymentRoutes } from "./modules/payments/payments.routes";
import { analyticsRoutes } from "./modules/analytics/analytics.routes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/events", eventRoutes);
routes.use("/tickets", ticketRoutes);
routes.use("/payments", paymentRoutes);
routes.use("/analytics", analyticsRoutes);
import { qrRoutes } from "./modules/qr/qr.routes";
routes.use("/qr", qrRoutes);
