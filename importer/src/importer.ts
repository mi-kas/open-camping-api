import { startAgenda } from "./config";
import { logger, connectMongoose } from "@open-camping-api/commons";

connectMongoose(async () => {
  logger.info(`Importer is running 🚀`);
  await startAgenda();
});
