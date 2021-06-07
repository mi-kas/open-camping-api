import { config } from "../config";
import CountrySchema from "../models/country";

const nowMinusDays = (days: number) => {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getCountriesNotLockedAndNotUpdated = () => {
  return CountrySchema.find({
    lastUpdateAt: {
      $not: { $gte: nowMinusDays(config.importer.intervalInDays) }
    }
  })
    .sort({ code: 1 })
    .exec();
};

export const updateCountriesLastUpdatedAt = (countryCode: string) => {
  return CountrySchema.findOneAndUpdate(
    { code: countryCode },
    { lastUpdateAt: new Date() },
    { new: true }
  ).exec();
};
