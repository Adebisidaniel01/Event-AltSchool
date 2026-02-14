"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.notificationRoutes = (0, express_1.Router)();
exports.notificationRoutes.post("/", auth_middleware_1.authenticate, notification_controller_1.NotificationController.create);
