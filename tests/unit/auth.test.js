"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../src/config/env");
test("JWT should be valid", () => {
    const token = jsonwebtoken_1.default.sign({ id: "1" }, env_1.ENV.JWT_SECRET);
    const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
    expect(decoded).toBeTruthy();
});
