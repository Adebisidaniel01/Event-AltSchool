import { createClient } from "redis";
import { ENV } from "./env";

let redis: any = null;
let redisConnected = false;
let redisErrorLogged = false;

// Only initialize Redis if enabled
const initializeRedis = async () => {
  const redisEnabled = process.env.REDIS_ENABLED !== "false";
  
  if (!redisEnabled) {
    console.log("Redis disabled - using database only");
    return;
  }

  try {
    const client = createClient({ 
      url: ENV.REDIS_URL,
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
      redisConnected = false;
    });
    
    client.on("connect", () => {
      console.log("Redis connected");
      redisConnected = true;
    });
    
    // Attempt connection
    await client.connect();
    redis = client;
  } catch (error: any) {
    if (!redisErrorLogged) {
      console.warn("Redis unavailable:", error?.message || error);
      redisErrorLogged = true;
    }
    redis = null;
    redisConnected = false;
  }
};

// Initialize Redis without blocking
initializeRedis().catch((err) => {
  if (!redisErrorLogged) {
    console.warn("Redis initialization error:", err);
    redisErrorLogged = true;
  }
});

export { redis, redisConnected };
