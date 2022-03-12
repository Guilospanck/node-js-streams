import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Guilherme-${index}`
    };

    yield data;
  }
}

// A http request is a readable stream and a http response is a writable stream
const handler = async (_: IncomingMessage, res: ServerResponse) => {
  const readable = new Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data) + '\n');
      }

      // to inform that data is over
      this.push(null);
    }
  });

  // send data to the client
  readable.pipe(res);
};

createServer(handler)
  .listen(3000)
  .on('listening', () => console.log("Server running at port 3000!"));