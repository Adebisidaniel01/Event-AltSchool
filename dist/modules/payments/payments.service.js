"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../../config/env");
exports.PaystackService = {
    async initialize(email, amount) {
        const res = await axios_1.default.post("https://api.paystack.co/transaction/initialize", { email, amount: amount * 100 }, {
            headers: {
                Authorization: `Bearer ${env_1.ENV.PAYSTACK_SECRET}`
            }
        });
        return res.data.data;
    }
};
