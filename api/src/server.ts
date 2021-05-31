import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { Server } from "http";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";

import { config, connectMongoose } from "./config";
import { router } from "./router";
import { logger } from "./utils";

const app = express();
export let server: Server;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "api.yaml")
  })
);

app.use(config.api.path, router);

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
