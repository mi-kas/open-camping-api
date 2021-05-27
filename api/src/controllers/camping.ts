import { Request, Response } from "express";
import { searchCamping, CampingSearch } from "../services/camping";

export const findNearby = async (req: Request, res: Response) => {
  const offset = Number(req.query?.offset ?? 0);
  const limit = Number(req.query?.limit ?? 20);
  let searchParams: CampingSearch = { offset, limit };

  if (req.query?.lat && req.query?.lng) {
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
