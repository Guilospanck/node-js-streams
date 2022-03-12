import { Transform, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import axios from 'axios';

export type StreamData = {
  id: string,
  name: string
}

export class Client {
  _url: string;
  _data: StreamData[] = [];

  constructor(url?: string) {
    this._url = url ?? 'http://localhost:3000';
  }

  async get() {
    try {
      const self = this;
      const stream = await this._consume();
      await pipeline(
        stream,
        new Transform({
          transform(chunk, _, callback) {
            const item: StreamData = JSON.parse(chunk);
            const number: number = Number(/\d+/.exec(item.name)![0]);
            let name = item.name;

            if (number % 2 === 0) {
              name += " is even";
            } else {
              name += " is odd";
            }

            item.name = name;

            // callback is used to inform the server that
            // the client received the data and that it can
            // send another one.
            // If you don't pass a callback, it will stop at
            // the item received.
            callback(null, JSON.stringify(item));
          }
        }),
        new Writable({
          write(chunk, _, callback) {
            console.log(chunk.toString());
            self._data.push(JSON.parse(chunk));
            callback();
          }
        })
      )
      return self._data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async _consume() {
    try {
      const response = await axios({
        url: this._url,
        method: 'GET',
        responseType: 'stream'
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

}
