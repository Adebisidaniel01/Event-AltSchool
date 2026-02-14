"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleReminder = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const scheduleReminder = (date, callback) => {
    const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
    node_cron_1.default.schedule(cronTime, callback);
};
exports.scheduleReminder = scheduleReminder;
