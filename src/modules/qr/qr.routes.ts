import { Router } from "express";
import { QRController } from "./qr.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

export const qrRoutes = Router();

qrRoutes.post(
  "/scan",
  authenticate,
  authorize("CREATOR"),
  QRController.scan
);
