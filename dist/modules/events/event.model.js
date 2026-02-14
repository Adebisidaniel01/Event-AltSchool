"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: String,
    date: Date,
    price: Number,
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
exports.Event = (0, mongoose_1.model)("Event", eventSchema);
