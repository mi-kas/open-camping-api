import { Context } from "koa";
import Router from "koa-router";
import { config } from "./config";
import { findNearby, findById } from "./controllers/camping";

export const router = new Router({
  prefix: config.api.path
});

router.get("/health", (ctx: Context) => {
  ctx.status = 200;
  ctx.body = { status: "alive" };
});

router.get("/campings", findNearby);
router.get("/campings/:id", findById);
