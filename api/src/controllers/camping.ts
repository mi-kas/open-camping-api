import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import {
  searchCamping,
  searchCampingById,
  CampingSearch
} from "../services/camping";

const notFoundError = {
  status: 404,
  message: "camping not found"
};

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

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(notFoundError);
  }

  const item = await searchCampingById(req.params.id);

  if (!item) {
    return next(notFoundError);
  }

  return res.json({ item });
};
