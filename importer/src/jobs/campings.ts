import { Job } from "agenda";
import {
  getCountriesNotLockedAndNotUpdated,
  fetchCampings,
  saveCampings,
  updateCountriesLastUpdatedAt
} from "../services";
import { logger } from "../utils";
import { agenda, config } from "../config";

type CampingImport = {
  countryCode: string;
  part: string;
  tag: string;
};

export const importCampingsForCountry = async ({
  attrs: {
    data: { countryCode, part, tag }
  }
}: Job<CampingImport>) => {
  try {
    const campings = await fetchCampings(countryCode, part, tag);
    await saveCampings(campings, countryCode);
    await updateCountriesLastUpdatedAt(countryCode);
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
  logger.debug(`Starting import`);
  const countries = await getCountriesNotLockedAndNotUpdated();
  logger.debug(`Got ${countries.length} countries`);
  for (const country of countries) {
    for (const tag of config.osm.tags) {
      for (const part of config.osm.parts) {
        const importData: CampingImport = {
          countryCode: country.code,
          part,
          tag
        };
        agenda.now("import campings for country", importData);
      }
    }
  }
};
