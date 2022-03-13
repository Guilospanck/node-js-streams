# NodeJS Streams
[![codecov](https://codecov.io/gh/Guilospanck/node-js-streams/branch/main/graph/badge.svg?token=ZBFI1KICHQ)](https://codecov.io/gh/Guilospanck/node-js-streams)

Basic example using NodeJS Streams.

## Installation
Git clone this repository:
```bash
git clone https://github.com/Guilospanck/node-js-streams.git
```
### "Slow" test
Change directory into the repository:
```bash
cd node-js-streams/
```
Then run:
```bash
yarn
```
To install dependencies and then run:
```bash
yarn start:dev
```

### Fast test
Be sure to have [Docker] and [Docker Compose] installed.

Change directory into the repository:
```bash
cd node-js-streams/
```
Then run:
```bash
sudo docker-compose -f docker-compose.yml up -d --build
```
In order to view the logs once it's built, run:
```bash
sudo docker ps # get the id of the container
sudo docker logs [id]
```

----

## Streams
Basically we have three main structures: `Readable`, `Transform` and `Writable`.

### Readable
The Readable is the `source` of data. So, let's say we have a `client-server` architecture and we, the client, want to retrieve some information from the server.

The Readable will be kept in the server and it will read and send the stream of data.

### Transform
The Transform is the `man in the middle`. It's responsive for making changes on the data. Everything you want to do with the stream of data, you can use the Transform to do that.

### Writable
The Writable usually lies in the client and is responsive to finally do something with the data received.

## Chunk and callbacks
- `Chunk` is the data coming from the stream. It is a buffer and if you want to get the data, just parse it using `JSON.parse(chunk);` or use `toString();`.
- `Callback` is used to inform the server (the readable stream) that the client received the data and it can send the other. If we don't pass it, it won't get the next data.

-------- 

## TypeScript
Install TS dev dependencies:
```bash
yarn add -D typescript ts-node
```
Then generate a new `tsconfig.json` file:
```bash
npx tsc --init
```
Use the `tsconfig.json` that exists in this repository for a more complete version.

Also, add a new file called `nodemon.json` in order to run Nodemon with TypeScript without getting an error.

--------

## Jest with TS
Install the Jest dev dependencies:
```bash
yarn add -D jest ts-jest @types/jest
```
Then generate a new `jest.config.js` (or `jest.config.cjs`) file:
```bash
npx ts-jest config:init
```

[Docker]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
[Docker Compose]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04