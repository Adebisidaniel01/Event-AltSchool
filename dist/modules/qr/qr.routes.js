"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrRoutes = void 0;
const express_1 = require("express");
const qr_controller_1 = require("./qr.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
exports.qrRoutes = (0, express_1.Router)();
exports.qrRoutes.post("/scan", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("CREATOR"), qr_controller_1.QRController.scan);
