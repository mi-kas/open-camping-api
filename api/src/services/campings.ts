import { FilterQuery } from "mongoose";
import { CampingModel, CampingDocument } from "@open-camping-api/commons";

import { components } from "../types";

const EARTH_RADIUS_IN_METERS = 6378100;

type CampingResponse = components["schemas"]["Camping"];
type CampingsResponse = components["schemas"]["CampingsResponse"];
export type CampingSearch = components["schemas"]["CampingSearch"];

const isPointSearch = (
  location: CampingSearch["location"]
): location is components["schemas"]["PointSearch"] =>
  location.geometry.type === "Point";

const isPolygonSearch = (
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
): Promise<CampingsResponse> => {
  let query: FilterQuery<CampingDocument> = {};

  if (search?.countryCode) {
    query = {
      ...query,
      countryCode: search.countryCode
    };
  }

  if (search?.location) {
    if (isPointSearch(search.location)) {
      query = {
        ...query,
        location: {
          $geoWithin: {
            $centerSphere: [
              search.location.geometry.coordinates,
              search.location.maxDistance / EARTH_RADIUS_IN_METERS
            ]
          }
        }
      };
    }
    if (isPolygonSearch(search.location)) {
      query = {
        ...query,
        location: {
          $geoWithin: {
            $geometry: search.location.geometry
          }
        }
      };
    }
  }
  const campingsPromise = CampingModel.find(query)
    .skip(search.offset)
    .limit(search.limit)
    .exec();
  const totalCountPromise = CampingModel.countDocuments(query);
  const [campings, totalCount] = await Promise.all([
    campingsPromise,
    totalCountPromise
  ]);
  const items = campings.map(camping => toCampingResponse(camping));

  return {
    items,
    meta: {
      totalCount,
      offset: search.offset,
      limit: search.limit,
      hasNextPage: search.offset + items.length < totalCount,
      hasPrevPage: totalCount > 0 && search.offset > 0
    }
  };
};

export const getCampingById = async (id: string): Promise<CampingResponse> => {
  const camping = await CampingModel.findById(id).exec();
  if (!camping) {
    return undefined;
  }
  return toCampingResponse(camping);
};
