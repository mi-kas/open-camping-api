const hosts = [
  "https://lz4.overpass-api.de",
  "https://z.overpass-api.de",
  "https://overpass.openstreetmap.ru",
  "https://overpass.openstreetmap.fr",
  "https://overpass.kumi.systems",
  "https://overpass.nchc.org.tw"
];

export const config = {
  db: {
    uri: process.env.DB_URI,
    reconnectTimeoutMs: 30000 // 30 sec
  },
  importer: {
    intervalInDays: 30
  },
  logger: {
    level: process.env.LOG_LEVEL ?? "info"
  },
  osm: {
    host: hosts[2],
    parts: ["node", "way", "relation"],
    tags: ["tourism=camp_site", "tourism=camp_pitch"],
    baseQuery: "data=[out:json][timeout:900]",
    format: "out%20meta%20center"
  }
};
