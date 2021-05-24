import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import CampingSchema, { CampingDocument } from "../models/camping";
import { logger } from "../utils";

export const findNearby = async (req: Request, res: Response) => {
  logger.info(req.query);
  const offset = Number(req.query?.offset ?? 0);
  const limit = Number(req.query?.limit ?? 20);
  let filters: FilterQuery<CampingDocument> = {};

  if (req.query?.lat && req.query?.lng) {
    filters = {
      ...filters,
      location: {
        $near: {
          ...(!Number.isNaN(req.query?.radius) && {
            $maxDistance: Number(req.query.radius) * 1000
          }),
          $geometry: {
            type: "Point",
            coordinates: [req.query.lng, req.query.lat]
          }
        }
      }
    };
  }
  const items = await CampingSchema.find(filters).skip(offset).limit(limit);

  return res.json({ items });
};
