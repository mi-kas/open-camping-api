import { connectMongoose, startAgenda } from "./config";
import { logger } from "./utils";

connectMongoose(async () => {
  logger.info(`Importer is running 🚀`);
  await startAgenda();
});
