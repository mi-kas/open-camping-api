import mongoose from "mongoose";
import { config } from "../config";
import { logger } from "../utils";

type Callback = () => void;

const connect = async (cb: Callback) => {
  logger.info("Mongoose connecting... 🚧");
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      dbName: "camping-api"
    });
    logger.info("Mongoose successfully connected to host 🔗");
    cb();
  } catch (err) {
    logger.error(
      `Mongoose error on startup - retrying in ${
        config.db.reconnectTimeoutMs / 1000
      } sec ⏱: ${err}`
    );
  }
};

export const connectMongoose = (cb: Callback) => {
  mongoose.connection.on("error", err => {
    logger.error(`Mongoose error ❌: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected from host ⛔️");
  });

  mongoose.connection.on("reconnectFailed", err => {
    logger.warn(`Mongoose reconnecting failed ⛔️: ${err}`);
  });

  mongoose.connection.on("reconnect", () => {
    logger.info("Mongoose reconnected 🔗");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logger.error(
        "Mongoose connection is disconnected due to application termination 🚫"
      );
      process.exit(0);
    });
  });

  connect(cb);
};
