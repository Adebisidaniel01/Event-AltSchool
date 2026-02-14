"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv").config();
const required = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
    "PAYSTACK_SECRET"
];
required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing env variable: ${key}`);
    }
});
exports.ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    PAYSTACK_SECRET: process.env.PAYSTACK_SECRET,
    REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379"
};
