import { FilterQuery } from "mongoose";
import { CampingModel, CampingDocument } from "@open-camping-api/commons";

import { components } from "../types";

export type CampingResponse = components["schemas"]["Camping"];

export type CampingSearch = components["schemas"]["CampingSearch"];

export const isPointSearch = (
  location: CampingSearch["location"]
): location is components["schemas"]["PointSearch"] =>
  location.geometry.type === "Point";

export const isPolygonSearch = (
  location: CampingSearch["location"]
): location is components["schemas"]["PolygonSearch"] =>
  location.geometry.type === "Polygon";

const toCampingResponse = (camping: CampingDocument): CampingResponse => ({
  id: camping._id,
  location: camping.location,
  tags: camping.tags,
  countryCode: camping.countryCode
});

export const getCampings = async (
  search: CampingSearch
): Promise<Array<CampingResponse>> => {
  let filters: FilterQuery<CampingDocument> = {};

  if (search?.countryCode) {
    filters = {
      ...filters,
      countryCode: search.countryCode
    };
  }

  if (search?.location) {
    if (isPointSearch(search.location)) {
      filters = {
        ...filters,
        location: {
          $near: {
            $maxDistance: search.location.maxDistance,
            $geometry: search.location.geometry
          }
        }
      };
    }
    if (isPolygonSearch(search.location)) {
      filters = {
        ...filters,
        location: {
          $geoWithin: {
            $geometry: search.location.geometry
          }
        }
      };
    }
  }
  const campings = await CampingModel.find(filters)
    .skip(search.offset)
    .limit(search.limit)
    .exec();

  return campings.map(camping => toCampingResponse(camping));
};

export const getCampingById = async (id: string): Promise<CampingResponse> => {
  const camping = await CampingModel.findById(id).exec();
  if (!camping) {
    return undefined;
  }
  return toCampingResponse(camping);
};
