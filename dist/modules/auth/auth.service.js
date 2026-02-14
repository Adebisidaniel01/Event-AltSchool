"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../users/user.model");
const env_1 = require("../../config/env");
exports.AuthService = {
    async register(email, password, role) {
        const hashed = await bcryptjs_1.default.hash(password, 10);
        return user_model_1.User.create({ email, password: hashed, role });
    },
    async login(email, password) {
        const user = await user_model_1.User.findOne({ email });
        if (!user)
            throw new Error("Invalid credentials");
        if (!user.password) {
            throw new Error("User password not found");
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_1.ENV.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.ENV.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    }
};
