import Agenda from "agenda";

import { config } from ".";
import { logger } from "../utils";
import { startImport, importCampingsForCountry } from "../jobs";

export const agenda = new Agenda({
  db: {
    address: config.db.uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  maxConcurrency: 1
});

export const startAgenda = async () => {
  agenda.define("start import", startImport);
  agenda.define("import campings for country", importCampingsForCountry);
  await agenda.start();
  logger.info(`Agenda started ⏱`);
  await agenda.every(`${config.importer.intervalInDays} days`, "start import");
  // agenda.now("start import", {});
};
