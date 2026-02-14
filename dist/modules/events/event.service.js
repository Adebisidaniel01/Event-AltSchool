"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const event_model_1 = require("./event.model");
const cache_1 = require("../../config/cache");
const EVENTS_CACHE_KEY = "events:all";
exports.EventService = {
    async getAllEvents() {
        // 1. Check cache first (if Redis is connected)
        if (cache_1.redisConnected && cache_1.redis) {
            try {
                const cached = await cache_1.redis.get(EVENTS_CACHE_KEY);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
            catch (error) {
                console.warn("Redis cache read error:", error);
            }
        }
        // 2. Hit DB only if cache miss or Redis unavailable
        const events = await event_model_1.Event.find().populate("creator");
        // 3. Store in cache if Redis is connected (TTL = 60s)
        if (cache_1.redisConnected && cache_1.redis) {
            try {
                await cache_1.redis.setEx(EVENTS_CACHE_KEY, 60, JSON.stringify(events));
            }
            catch (error) {
                console.warn("Redis cache write error:", error);
            }
        }
        return events;
    },
    async createEvent(data) {
        const event = await event_model_1.Event.create(data);
        // 4. Invalidate cache after mutation (if Redis is connected)
        if (cache_1.redisConnected && cache_1.redis) {
            try {
                await cache_1.redis.del(EVENTS_CACHE_KEY);
            }
            catch (error) {
                console.warn("Redis cache invalidation error:", error);
            }
        }
        return event;
    }
};
