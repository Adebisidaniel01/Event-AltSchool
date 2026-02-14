"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/register", auth_controller_1.AuthController.register);
exports.authRoutes.post("/login", auth_controller_1.AuthController.login);
exports.authRoutes.post("/refresh", auth_controller_1.AuthController.refresh);
