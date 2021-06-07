export const config = {
  db: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME ?? "open-camping-api",
    reconnectTimeoutMs: 30000 // 30 sec
  },
  logger: {
    level: process.env.LOG_LEVEL ?? "info"
  }
};
