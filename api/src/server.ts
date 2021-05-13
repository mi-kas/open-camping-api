import express from "express";
import * as OpenApiValidator from "express-openapi-validator";

import { config } from "./config";
import { router } from "./router";
import { logger } from "./utils";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./api.yaml"
  })
);

app.use(config.api.path, router);

app.use((err, req, res, next) => {
  // 7. Customize errors
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});

export const server = app.listen({ port: config.server.port }, () => {
  logger.info(
    `Server is running on http://localhost:${config.server.port}${config.api.path} 🚀`
  );
});
