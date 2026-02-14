"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event" },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    qrCode: String,
    scanned: { type: Boolean, default: false }
});
exports.Ticket = (0, mongoose_1.model)("Ticket", ticketSchema);
