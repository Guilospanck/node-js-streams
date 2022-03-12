# NodeJS Streams
Basic example using NodeJS Streams.

## Streams
Basically we have three main structures: `Readable`, `Transform` and `Writable`.

### Readable
The Readable is the `source` of data. So, let's say we have a `client-server` architecture and we, the client, want to retrieve some information from the server.

The Readable will be kept in the server and it will read and send the stream of data.

### Transform
The Transform is the `man in the middle`. It's responsive for making changes on the data. Everything you want to do with the stream of data, you can use the Transform to do that.

### Writable
The Writable usually lies in the client and is responsive to finally do something with the data received.

<divider></divider>

## TypeScript
Install TS dev dependencies:
```bash
yarn add -D typescript ts-node
```
Then generate a new `tsconfig.json` file:
```bash
npx tsc --init
```
