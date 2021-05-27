import { NextFunction, Request, Response } from "express";
import { searchCamping, CampingSearch } from "../services/camping";

export const findNearby = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const offset = Number(req.query?.offset ?? 0);
  const limit = Number(req.query?.limit ?? 20);
  let searchParams: CampingSearch = { offset, limit };

  if (req.query?.lat && req.query?.lng) {
    if (!req.query?.radius) {
      return next({
        status: 400,
        message: "request.query should have required property 'radius'"
      });
    }
    searchParams = {
      ...searchParams,
      location: {
        radius: Number(req.query.radius),
        lat: Number(req.query.lat),
        lng: Number(req.query.lng)
      }
    };
  }

  const items = await searchCamping(searchParams);
  return res.json({ items });
};
