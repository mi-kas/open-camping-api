import Agenda from "agenda";
import { logger, config as commonsConfig } from "@open-camping-api/commons";
import { config } from "./config";
import { startImport, importCampingsForCountry } from "../jobs";

export const agenda = new Agenda({
  db: {
    address: commonsConfig.db.uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  maxConcurrency: config.importer.concurrency,
  defaultConcurrency: config.importer.concurrency
});

export const startAgenda = async () => {
  agenda.define("start import", startImport);
  agenda.define(
    "import campings for country",
    { concurrency: config.importer.concurrency },
    importCampingsForCountry
  );
  await agenda.start();
  logger.info(`Agenda started ⏱`);
  await agenda.every(`${config.importer.intervalInDays} days`, "start import");
};
