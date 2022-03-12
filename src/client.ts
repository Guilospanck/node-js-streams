import { Transform, Writable } from 'stream';
import axios from 'axios';

const url = 'http://localhost:3000';

type StreamData = {
  id: string,
  name: string
}

const consume = async () => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return response.data;
};

const stream = await consume();
stream
  .pipe(
    new Transform({
      transform(chunk, _, callback) {
        const item: StreamData = JSON.parse(chunk);
        const number: number = Number(/\d+/.exec(item.name)![0]);
        let name = item.name;

        if(number % 2 === 0) {
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
    })
  )
  .pipe(
    new Writable({
      write(chunk, _, callback) {
        console.log(chunk.toString());
        callback();
      }
    })
  );
