import { config } from "../config";

export const generateUrl = (countryCode: string, part: string, tag: string) => {
  const query = `${config.osm.baseQuery};area["ISO3166-1"=${countryCode}][admin_level=2];${part}[${tag}](area);${config.osm.format};`;
  return `${config.osm.host}/api/interpreter?${query}`;
};
