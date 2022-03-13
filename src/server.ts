import { createServer, IncomingMessage, ServerResponse, Server as HttpServer } from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

export class Server {
  _server: HttpServer
  _self: any

  constructor() {
    this._self = this;
    this._server = this.init();
  }

  init() {
    return createServer(this.handler)
      .listen(3000)
      .on('listening', () => console.log("Server running at port 3000!"));
  }

  // A http request is a readable stream and a http response is a writable stream
  async handler(_: IncomingMessage, res: ServerResponse) {    
    const readable = new Readable({
      read() {
        for (const data of Server.run()) {
          this.push(JSON.stringify(data) + '\n');
        }

        // to inform that data is over
        this.push(null);
      }
    });

    // send data to the client
    readable.pipe(res);
  };

  static *run() {
    for (let index = 0; index <= 99; index++) {
      const data = {
        id: randomUUID(),
        name: `Guilherme-${index}`
      };

      yield data;
    }
  }

}
