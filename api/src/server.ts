import express, { Request, Response, NextFunction } from "express";
import path from "path";
import * as OpenApiValidator from "express-openapi-validator";

import { config } from "./config";
import { router } from "./router";
import { logger } from "./utils";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "api.yaml")
  })
);

app.use(config.api.path, router);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.debug(`Error handler: ${err.message}`);
  const code = err.status ?? 500;
  res.status(code).json({
    code,
    message: err.message,
    errors: err.errors
  });
});

export const server = app.listen({ port: config.server.port }, () => {
  logger.info(
    `Server is running on http://localhost:${config.server.port}${config.api.path} 🚀`
  );
});
