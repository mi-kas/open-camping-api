import mongoose from "mongoose";

export type Country = {
  name: string;
  code: string;
  locked: boolean;
  lastUpdate?: Date;
};

export interface CountryDocument extends Country, mongoose.Document {}

const CountrySchema = new mongoose.Schema<
  CountryDocument,
  mongoose.Model<CountryDocument>
>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    locked: { type: Boolean, required: true, default: false },
    lastUpdate: { type: Date }
  },
  { timestamps: true }
);

const model = mongoose.model<CountryDocument, mongoose.Model<CountryDocument>>(
  "Country",
  CountrySchema
);

export default model;
