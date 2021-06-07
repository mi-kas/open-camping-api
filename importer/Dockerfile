FROM node:lts-alpine AS install
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY .eslintrc.js .
COPY importer ./importer
COPY commons ./commons
RUN yarn install --frozen-lockfile

FROM install AS dev
CMD ["yarn", "run", "start"]

# Run unit tests with code coverage before building release image:
FROM install AS test
CMD ["yarn", "run", "test"]

FROM install AS build
RUN yarn run build

FROM node:lts-alpine AS release
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY --from=build /app/importer/package.json /importer/api/package.json
COPY --from=build /app/importer/build /importer/api/build
COPY --from=build /app/commons/build /app/commons/build
# Remove dev dependencies
RUN yarn install --frozen-lockfile --production
# Clear the global yarn cache
RUN yarn cache clean
EXPOSE 4000
CMD ["node", "importer/build/importer.js"]