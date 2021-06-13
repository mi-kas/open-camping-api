import mongoose from "mongoose";

export type Country = {
  name: string;
  code: string;
  lastUpdateAt?: Date;
};

export interface CountryDocument extends Country, mongoose.Document {}

const CountrySchema = new mongoose.Schema<
  CountryDocument,
  mongoose.Model<CountryDocument>
>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    lastUpdateAt: { type: Date }
  },
  { timestamps: true }
);

export const CountryModel = mongoose.model<
  CountryDocument,
  mongoose.Model<CountryDocument>
>("Country", CountrySchema);
