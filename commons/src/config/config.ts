export const config = {
  db: {
    uri: process.env.DB_URI,
    reconnectTimeoutMs: 30000 // 30 sec
  },
  logger: {
    level: process.env.LOG_LEVEL ?? "info"
  }
};
