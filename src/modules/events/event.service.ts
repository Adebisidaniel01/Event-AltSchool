import { Event } from "./event.model";
import { redis, redisConnected } from "../../config/cache";

const EVENTS_CACHE_KEY = "events:all";

export const EventService = {
  async getAllEvents() {
    // 1. Check cache first (if Redis is connected)
    if (redisConnected && redis) {
      try {
        const cached = await redis.get(EVENTS_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch (error) {
        console.warn("Redis cache read error:", error);
      }
    }

    // 2. Hit DB only if cache miss or Redis unavailable
    const events = await Event.find().populate("creator");

    // 3. Store in cache if Redis is connected (TTL = 60s)
    if (redisConnected && redis) {
      try {
        await redis.setEx(EVENTS_CACHE_KEY, 60, JSON.stringify(events));
      } catch (error) {
        console.warn("Redis cache write error:", error);
      }
    }

    return events;
  },

  async createEvent(data: any) {
    const event = await Event.create(data);

    // 4. Invalidate cache after mutation (if Redis is connected)
    if (redisConnected && redis) {
      try {
        await redis.del(EVENTS_CACHE_KEY);
      } catch (error) {
        console.warn("Redis cache invalidation error:", error);
      }
    }

    return event;
  }
};
