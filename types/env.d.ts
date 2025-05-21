// types/env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      // Add other env vars here as needed
      NODE_ENV?: "development" | "production" | "test";
      PORT?: string;
    }
  }
  