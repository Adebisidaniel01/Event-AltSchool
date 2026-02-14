import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const ticketRoutes = Router();

ticketRoutes.post("/buy", authenticate, TicketController.buy);
