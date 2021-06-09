import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getCampings, getCampingById, CampingSearch } from "../services";

const notFoundError = {
  status: 404,
  message: "camping not found"
};

export const searchCampings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const offset = Number(req.body?.offset ?? 0);
  const limit = Number(req.body?.limit ?? 20);
  let searchParams: CampingSearch = { offset, limit };

  if (req.body?.countryCode) {
    searchParams = {
      ...searchParams,
      countryCode: req.body.countryCode
    };
  }

  if (req.body?.location) {
    searchParams = {
      ...searchParams,
      location: req.body.location
    };
  }

  const items = await getCampings(searchParams);
  return res.json({ items });
};

export const findCampingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(notFoundError);
  }

  const item = await getCampingById(req.params.id);

  if (!item) {
    return next(notFoundError);
  }

  return res.json({ item });
};
