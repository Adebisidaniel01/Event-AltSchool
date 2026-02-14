"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQR = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const uuid_1 = require("uuid");
const generateQR = async () => {
    const token = (0, uuid_1.v4)();
    const qr = await qrcode_1.default.toDataURL(token);
    return { token, qr };
};
exports.generateQR = generateQR;
