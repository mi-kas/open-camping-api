import { FilterQuery } from "mongoose";
import { CampingModel, CampingDocument } from "@open-camping-api/commons";

import { components } from "../types/api";

export type CampingResponse = components["schemas"]["Camping"];

export type CampingSearch = {
  location?: {
    lat: number;
    lon: number;
    radius: number;
  };
  offset: number;
  limit: number;
};

const toCampingResponse = (camping: CampingDocument): CampingResponse => ({
  id: camping._id,
  location: camping.location,
  tags: camping.tags,
  countryCode: camping.countryCode
});

export const searchCamping = async (
  search: CampingSearch
): Promise<Array<CampingResponse>> => {
  let filters: FilterQuery<CampingDocument> = {};

  if (search?.location) {
    filters = {
      ...filters,
      location: {
        $near: {
          $maxDistance: search.location.radius * 1000, // km to meters
          $geometry: {
            type: "Point",
            coordinates: [search.location.lon, search.location.lat]
          }
        }
      }
    };
  }
  const campings = await CampingModel.find(filters)
    .skip(search.offset)
    .limit(search.limit)
    .exec();

  return campings.map(camping => toCampingResponse(camping));
};

export const searchCampingById = async (
  id: string
): Promise<CampingResponse> => {
  const camping = await CampingModel.findById(id).exec();
  if (!camping) {
    return undefined;
  }
  return toCampingResponse(camping);
};
