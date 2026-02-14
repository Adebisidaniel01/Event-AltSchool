"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnected = exports.redis = void 0;
const redis_1 = require("redis");
const env_1 = require("./env");
let redis = null;
exports.redis = redis;
let redisConnected = false;
exports.redisConnected = redisConnected;
let redisErrorLogged = false;
// Only initialize Redis if enabled
const initializeRedis = async () => {
    const redisEnabled = process.env.REDIS_ENABLED !== "false";
    if (!redisEnabled) {
        console.log("Redis disabled - using database only");
        return;
    }
    try {
        const client = (0, redis_1.createClient)({
            url: env_1.ENV.REDIS_URL,
            socket: {
                reconnectStrategy: () => {
                    // Disable automatic reconnection attempts
                    return new Error("Redis reconnection disabled");
                }
            }
        });
        // Set up error handler BEFORE attempting to connect
        client.on("error", (err) => {
            // Only log the error once to avoid spam
            if (!redisErrorLogged) {
                console.warn("Redis unavailable:", err.message);
                redisErrorLogged = true;
            }
            exports.redisConnected = redisConnected = false;
        });
        client.on("connect", () => {
            console.log("Redis connected");
            exports.redisConnected = redisConnected = true;
        });
        // Attempt connection
        await client.connect();
        exports.redis = redis = client;
    }
    catch (error) {
        if (!redisErrorLogged) {
            console.warn("Redis unavailable:", error?.message || error);
            redisErrorLogged = true;
        }
        exports.redis = redis = null;
        exports.redisConnected = redisConnected = false;
    }
};
// Initialize Redis without blocking
initializeRedis().catch((err) => {
    if (!redisErrorLogged) {
        console.warn("Redis initialization error:", err);
        redisErrorLogged = true;
    }
});
