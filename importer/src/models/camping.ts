import mongoose from "mongoose";

export enum CampingType {
  NODE = "node",
  WAY = "way",
  RELATION = "relation"
}

export type Camping = {
  osmId: number;
  type: CampingType;
  location: {
    type: "Point";
    coordinates: Array<number>; // Note that longitude comes first in a GeoJSON coordinate array, not latitude
  };
  tags: any;
  countryCode: string;
};

export interface CampingDocument extends Camping, mongoose.Document {}

const CampingSchema = new mongoose.Schema<
  CampingDocument,
  mongoose.Model<CampingDocument>
>(
  {
    osmId: { type: Number, required: true },
    type: { type: String, enum: Object.values(CampingType), required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    tags: { type: Object },
    countryCode: { type: String, required: true }
  },
  { timestamps: true }
);

CampingSchema.index({ location: "2dsphere" });

const model = mongoose.model<CampingDocument, mongoose.Model<CampingDocument>>(
  "camping",
  CampingSchema
);

export default model;
