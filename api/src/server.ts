import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import { Server } from "http";
import path from "path";
import * as OpenApiValidator from "koa-openapi-validator";

import { config, connectMongoose } from "./config";
import { router } from "./router";
import { logger } from "./utils";

const app = new Koa();
app.use(bodyParser());
app.use(helmet());

app.use(router.routes());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.info(`Error handler: ${err.message}`);
    ctx.status = err.status ?? 500;
    ctx.body = {
      message: err.message,
      errors: err.errors
    };
  }
});

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "api.yaml")
  })
);

export let server: Server;
connectMongoose(() => {
  server = app.listen({ port: config.server.port }, () => {
    logger.info(
      `Server is running on http://localhost:${config.server.port}${config.api.path} 🚀`
    );
  });
});
