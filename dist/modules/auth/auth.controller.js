"use strict";
const jwt = require("jsonwebtoken");
const { ENV } = require("../../config/env");
const { AuthService } = require("./auth.service");
const { User } = require("../users/user.model");
const AuthController = {
    async register(req, res) {
        const { email, password, role } = req.body;
        const user = await AuthService.register(email, password, role);
        res.status(201).json(user);
    },
    async login(req, res) {
        const tokens = await AuthService.login(req.body.email, req.body.password);
        res.json(tokens);
    },
    async refresh(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }
        const payload = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign({ id: user.id, role: user.role }, ENV.JWT_SECRET, { expiresIn: "15m" });
        res.json({ accessToken: newAccessToken });
    },
};
module.exports = { AuthController };
