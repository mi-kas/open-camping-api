import express, { Request, Response, NextFunction } from "express";
import { Server } from "http";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";
import mongoose from "mongoose";

import { config, connectMongoose } from "./config";
import { router } from "./router";
import { logger } from "./utils";

const app = express();
export let server: Server;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "api.yaml"),
    serDes: [
      OpenApiValidator.serdes.dateTime,
      OpenApiValidator.serdes.date,
      // custom serializer for mongo's object ids
      {
        format: "mongo-objectid",
        deserialize: (s: string) => mongoose.Types.ObjectId(s),
        serialize: (o: mongoose.Types.ObjectId): string => o.toString()
      }
    ]
  })
);

app.use(config.api.path, router);

// Capture 404 errors
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Unable to find the requested resource!" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.debug(`Error handler: ${err.message}`);
  res.status(err.status ?? 500).json({
    message: err.message,
    errors: err.errors
  });
});

connectMongoose(() => {
  server = app.listen({ port: config.server.port }, () => {
    logger.info(
      `Server is running on http://localhost:${config.server.port}${config.api.path} 🚀`
    );
  });
});
