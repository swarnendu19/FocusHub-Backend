import { getEnv } from "../utils/getEnv";

const appConfig = () => ({
    PORT: getEnv("PORT", "8000"),
    NODE_ENV: getEnv("NODE_ENV", "development"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    DATABASE_URL: getEnv("DATABASE_URL"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),
});

const config = appConfig();
export default config;