import { config } from "../config";

export const generateUrl = (country: string, part: string, tag: string) => {
  const query = `${config.osm.baseQuery};area["ISO3166-1"=${country["alpha-2"]}][admin_level=2];${part}[${tag}](area);${config.osm.format};`;
  return `${config.osm.host}/api/interpreter?${query}`;
};
