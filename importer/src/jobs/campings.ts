import { Job } from "agenda";
import { getCountriesNotLockedAndNotUpdated, fetchCampings } from "../services";
import { logger } from "../utils";
import { agenda, config } from "../config";

export const importCampingsForCountry = async ({
  attrs: {
    data: { countryCode, part, tag }
  }
}: Job<{ countryCode: string; part: string; tag: string }>) => {
  logger.info(`Import campings for country: ${countryCode}`);
  try {
    await fetchCampings(countryCode, part, tag);
  } catch (err) {
    logger.warn(`Retry immport campings for country: ${countryCode}`);
    agenda.now("import campings for country", {
      countryCode,
      part,
      tag
    });
  }
};

export const startImport = async () => {
  logger.info(`Starting import`);
  const countries = await getCountriesNotLockedAndNotUpdated();
  logger.info(`Got ${countries.length} countries`);
  for (const country of countries) {
    for (const tag of config.osm.tags) {
      for (const part of config.osm.parts) {
        agenda.now("import campings for country", {
          countryCode: country.code,
          part,
          tag
        });
      }
    }
  }
};
