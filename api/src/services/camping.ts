import { FilterQuery } from "mongoose";
import CampingSchema, { CampingDocument } from "../models/camping";

export type CampingSearch = {
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  offset: number;
  limit: number;
};

export const searchCamping = (search: CampingSearch) => {
  let filters: FilterQuery<CampingDocument> = {};

  if (search?.location) {
    filters = {
      ...filters,
      location: {
        $near: {
          $maxDistance: search.location.radius * 1000,
          $geometry: {
            type: "Point",
            coordinates: [search.location.lng, search.location.lat]
          }
        }
      }
    };
  }
  return CampingSchema.find(filters)
    .skip(search.offset)
    .limit(search.limit)
    .lean();
};
