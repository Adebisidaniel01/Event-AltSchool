"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event" },
    notifyAt: Date
});
exports.Notification = (0, mongoose_1.model)("Notification", notificationSchema);
