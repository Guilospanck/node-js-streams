import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { StreamData } from './client';
import { Server } from './server';

jest.mock('http', () => ({
  createServer: jest.fn((handler: any) => ({
    listen: jest.fn(() => ({
      on: jest.fn(() => ({}))
    })),
  })),
  IncomingMessage: jest.fn(() => ({
    method: "GET"
  }))
}))

const { ServerResponse } = jest.requireActual('http');


function makeSut() {
  const server = new Server();

  return {
    server
  };
}

describe("Server", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generator function 'run'", () => {
    test("it should generate data successfully", () => {
      // arrange
      
      // act
      const result = Server.run();
      const item1: StreamData = result.next().value as StreamData;
      const item2: StreamData = result.next().value as StreamData;
      const item3: StreamData = result.next().value as StreamData;

      // assert
      expect(item1.name).toEqual("Guilherme-0");
      expect(item2.name).toEqual("Guilherme-1");
      expect(item3.name).toEqual("Guilherme-2");

    });
  });

  describe("handler", () => {
    test("", async () => {
      // arrange
      const sut = makeSut();
      const writableStreamMocked = new ServerResponse(IncomingMessage);      

      // act
      const result = await sut.server.handler(new IncomingMessage(new Socket), writableStreamMocked);

      // assert
      expect(result).resolves;

    });
  });

});