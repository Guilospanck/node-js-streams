FROM node:16.14.0-stretch-slim AS build

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16.14.0-stretch-slim
WORKDIR /node-streams
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=build /build/dist ./

CMD ["node", "main.js"]

