import mongoose from "mongoose";
import { components } from "../types/api";

export type Camping = Omit<components["schemas"]["Camping"], "_id">;

export interface CampingDocument extends Camping, mongoose.Document {}

const CampingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // Note that longitude comes first in a GeoJSON coordinate array, not latitude
        required: true
      }
    },
    address: {
      street: { type: String },
      city: { type: String },
      region: { type: String },
      country: { type: String }
    },
    description: { type: String },
    stars: Number,
    infrastructure: {
      electricityAtPitch: Boolean,
      waterAtPitch: Boolean,
      sewageAtPitch: Boolean,
      gasAtPitch: Boolean,
      tvAtPitch: Boolean,
      gasBottleExchange: Boolean,
      wlan: Boolean,
      internetTerminal: Boolean,
      lockers: Boolean,
      lounge: Boolean,
      dryingRoom: Boolean,
      cookingFacilities: Boolean,
      dogShowers: Boolean,
      dogMeadow: Boolean,
      dogBathing: Boolean,
      rvDisposal: Boolean,
      supermarket: Boolean,
      breadService: Boolean,
      imbiss: Boolean,
      restaurant: Boolean,
      wheelchairRamps: Boolean,
      pavedStreets: Boolean,
      bonfireArea: Boolean,
      campfireAllowedAtPitch: Boolean,
      firewood: Boolean,
      charcoalBbqAllowed: Boolean,
      tableBenches: Boolean
    },
    sanitary: {
      babyChangeRoom: Boolean,
      cabins: Boolean,
      rentableCabins: Boolean,
      wheelchairAccessible: Boolean,
      washingMachines: Boolean,
      clothesDryer: Boolean
    },
    leisure: {
      playground: Boolean,
      indoorPlayground: Boolean,
      pettingZoo: Boolean,
      animation: Boolean,
      swimmingNaturalWater: Boolean,
      sandBeach: Boolean,
      accessibleWaterEntrance: Boolean,
      nudistBeach: Boolean,
      outdoorPool: Boolean,
      waterslide: Boolean,
      indoorPool: Boolean,
      thermalBaths: Boolean,
      sauna: Boolean,
      tennis: Boolean,
      tableTennis: Boolean,
      volleyball: Boolean,
      minigolf: Boolean,
      golf: Boolean,
      sailingSurfing: Boolean,
      boatHire: Boolean,
      slipway: Boolean,
      bikeRent: Boolean,
      horseRiding: Boolean,
      fishing: Boolean,
      divingStation: Boolean,
      skiLift: Boolean,
      crossCountrySkiing: Boolean
    },
    rentals: {
      tents: Boolean,
      cabins: Boolean,
      caravans: Boolean,
      bungalows: Boolean,
      appartments: Boolean,
      dogsAllowed: Boolean
    },
    links: {
      campinginfo: { type: String, required: true },
      booking: String
    }
  },
  { timestamps: true }
);

CampingSchema.index({ location: "2dsphere" });

const model = mongoose.model<CampingDocument>("Camping", CampingSchema);

export default model;
