import { config } from "../config";
import { CountryModel } from "../models";

const nowMinusDays = (days: number) => {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getCountriesNotLockedAndNotUpdated = () => {
  return CountryModel.find({
    lastUpdateAt: {
      $not: { $gte: nowMinusDays(config.importer.intervalInDays) }
    }
  })
    .sort({ code: 1 })
    .exec();
};

export const updateCountriesLastUpdatedAt = (countryCode: string) => {
  return CountryModel.findOneAndUpdate(
    { code: countryCode },
    { lastUpdateAt: new Date() },
    { new: true }
  ).exec();
};
