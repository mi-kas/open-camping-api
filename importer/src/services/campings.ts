import fetch from "node-fetch";
import { generateUrl } from "../utils";
import { logger, Camping, CampingModel } from "@open-camping-api/commons";

export const fetchCampings = async (
  countryCode: string,
  part: string,
  tag: string
) => {
  const url = generateUrl(countryCode, part, tag);
  const current = `Country: ${countryCode}\tPart: ${part}\tTag: ${tag}`;
  logger.debug(`${current}\tStarted`);
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
    return data?.elements ?? [];
  } catch (err) {
    logger.error(
      `${current}\tERROR: Did not receive JSON, instead received from: ${url}\t${text}`
    );
    throw err;
  }
};

const getCampingFromRaw = (raw: any, countryCode: string): Camping => {
  // Longitude comes first in a GeoJSON coordinate array, not latitude
  const coordinates =
    raw.type === "node" ? [raw.lon, raw.lat] : [raw.center.lon, raw.center.lat];
  return {
    osmId: raw.id,
    type: raw.type,
    location: {
      type: "Point",
      coordinates
    },
    tags: { ...raw.tags, ["addr:country"]: countryCode },
    countryCode
  };
};

export const saveCampings = async (
  rawCampings: Array<any>,
  countryCode: string
) => {
  for (const rawCamping of rawCampings) {
    await CampingModel.findOneAndUpdate(
      { osmId: rawCamping.id },
      getCampingFromRaw(rawCamping, countryCode),
      { upsert: true, new: true }
    );
  }
};
