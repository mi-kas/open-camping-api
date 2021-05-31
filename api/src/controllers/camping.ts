import { Context } from "koa";
import mongoose from "mongoose";
import {
  searchCamping,
  searchCampingById,
  CampingSearch
} from "../services/camping";

export const findNearby = async (ctx: Context, next) => {
  const offset = Number(ctx.query?.offset ?? 0);
  const limit = Number(ctx.query?.limit ?? 20);
  let searchParams: CampingSearch = { offset, limit };

  if (ctx.query?.lat && ctx.query?.lng) {
    if (!ctx.query?.radius) {
      ctx.throw(400, "request.query should have required property 'radius'");
    }
    searchParams = {
      ...searchParams,
      location: {
        radius: Number(ctx.query.radius),
        lat: Number(ctx.query.lat),
        lng: Number(ctx.query.lng)
      }
    };
  }

  const items = await searchCamping(searchParams);
  ctx.status = 200;
  ctx.body = { items };
};

export const findById = async (ctx: Context, next) => {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404, "camping not found");
  }

  const item = await searchCampingById(ctx.params.id);

  if (!item) {
    ctx.throw(404, "camping not found");
  }

  ctx.status = 200;
  ctx.body = { item };
};
