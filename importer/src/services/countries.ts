import { config } from "../config";
import CountrySchema from "../models/country";

const nowMinusDays = (days: number) => {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getCountriesNotLockedAndNotUpdated = () => {
  return CountrySchema.find({
    $or: [{ locked: null }, { locked: false }],
    lastUpdate: {
      $not: { $gte: nowMinusDays(config.importer.intervalInDays) }
    }
  })
    .sort({ code: 1 })
    .limit(3)
    .exec();
};

export const lockCountry = (countryCode: string) => {
  return CountrySchema.findOneAndUpdate(
    { code: countryCode },
    { locked: true },
    { new: true }
  ).exec();
};

export const unlockAndUpdateLastUpdateCountry = (countryCode: string) => {
  return CountrySchema.findOneAndUpdate(
    { code: countryCode },
    { locked: false, lastUpdate: new Date() },
    { new: true }
  ).exec();
};
