import { Router } from "express";
import { EventController } from "./event.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

export const eventRoutes = Router();

eventRoutes.get("/", EventController.list);
eventRoutes.post(
  "/",
  authenticate,
  authorize("CREATOR"),
  EventController.create
);
