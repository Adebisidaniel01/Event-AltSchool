"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRoutes = void 0;
const express_1 = require("express");
const ticket_controller_1 = require("./ticket.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.ticketRoutes = (0, express_1.Router)();
exports.ticketRoutes.post("/buy", auth_middleware_1.authenticate, ticket_controller_1.TicketController.buy);
