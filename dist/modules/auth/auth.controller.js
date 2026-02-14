"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth_service_1 = require("./auth.service");
const user_model_1 = require("../users/user.model");
exports.AuthController = {
    async register(req, res) {
        const { email, password, role } = req.body;
        const user = await auth_service_1.AuthService.register(email, password, role);
        res.status(201).json(user);
    },
    async login(req, res) {
        const tokens = await auth_service_1.AuthService.login(req.body.email, req.body.password);
        res.json(tokens);
    },
    async refresh(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }
        const payload = jsonwebtoken_1.default.verify(refreshToken, env_1.ENV.JWT_REFRESH_SECRET);
        const user = await user_model_1.User.findById(payload.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_1.ENV.JWT_SECRET, { expiresIn: "15m" });
        res.json({ accessToken: newAccessToken });
    },
};
