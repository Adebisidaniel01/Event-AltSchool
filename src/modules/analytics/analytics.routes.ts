import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

export const analyticsRoutes = Router();

analyticsRoutes.get(
  "/",
  authenticate,
  authorize("CREATOR"),
  AnalyticsController.overview
);
analyticsRoutes.get(
  "/events",
  authenticate,
  authorize("CREATOR"),
  AnalyticsController.byEvent
);
