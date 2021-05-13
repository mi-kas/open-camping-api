if (process.env.NODE_ENV !== "production") require("dotenv").config();

const isProduction = () => process.env.NODE_ENV === "production";

export const config = {
  server: {
    port: 4000
  },
  db: {
    uri: process.env.DB_URI,
    reconnectTimeoutMs: 30000 // 30 sec
  },
  api: {
    path: "/api/v1"
  },
  logger: {
    level: process.env.LOG_LEVEL ?? "info"
  }
};
