import { FilterQuery } from "mongoose";
import { CampingModel, CampingDocument } from "@open-camping-api/commons";

export type CampingSearch = {
  location?: {
    lat: number;
    lng: number;
    radius: number;
  };
  offset: number;
  limit: number;
};

export const searchCamping = async (search: CampingSearch) => {
  let filters: FilterQuery<CampingDocument> = {};

  if (search?.location) {
    filters = {
      ...filters,
      location: {
        $near: {
          $maxDistance: search.location.radius * 1000, // km to meters
          $geometry: {
            type: "Point",
            coordinates: [search.location.lng, search.location.lat]
          }
        }
      }
    };
  }
  const campings = await CampingModel.find(filters)
    .skip(search.offset)
    .limit(search.limit)
    .exec();

  return campings.map(camping => camping.toResponse());
};

export const searchCampingById = async (id: string) => {
  const camping = await CampingModel.findById(id).exec();
  return camping?.toResponse();
};
