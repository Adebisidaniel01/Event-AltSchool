import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { authenticate } from "../../middlewares/auth.middleware";

export const notificationRoutes = Router();

notificationRoutes.post("/", authenticate, NotificationController.create);
