import pino from "pino";
import { config } from "../config";

const prettyPrint =
  process.env.NODE_ENV === "production"
    ? false
    : {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname"
      };

export const logger = pino({
  level: config.logger.level,
  prettyPrint
});

logger.info(`Logger initialized with level: ${config.logger.level}`);
