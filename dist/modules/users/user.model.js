"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["CREATOR", "EVENTEE"] },
    refreshToken: String
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
