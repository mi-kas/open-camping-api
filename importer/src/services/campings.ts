import fetch from "node-fetch";
import { logger, generateUrl } from "../utils";
import { lockCountry, unlockAndUpdateLastUpdateCountry } from ".";

export const fetchCampings = async (
  countryCode: string,
  part: string,
  tag: string
) => {
  await lockCountry(countryCode);
  const url = generateUrl(countryCode, part, tag);
  const current = `Country: ${countryCode}\tPart: ${part}\tTag: ${tag}`;
  // logger.info(current);
  const start = Date.now();
  const res = await fetch(url);
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (data?.remark) {
      logger.error(`${current}\tREMARK: ${data.remark}`);
      throw Error("Got data with remark");
    }
    logger.info(
      `${current}\tCampings: ${data?.elements?.length ?? 0}\tDuration: ${(
        (Date.now() - start) /
        1000
      ).toFixed(0)}sec`
    );
    // return data?.elements ?? [];
  } catch (err) {
    logger.error(
      `${current}\tERROR: Did not receive JSON, instead received: ${url}`,
      text
    );
    throw err;
  } finally {
    await unlockAndUpdateLastUpdateCountry(countryCode);
  }
};
