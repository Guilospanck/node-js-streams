import { Client, StreamData } from './client';
import axios, { AxiosStatic } from 'axios';
import { Readable } from 'stream';

/** https://stackoverflow.com/questions/51275434/type-of-axios-mock-using-jest-typescript  */
interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}

jest.mock('axios');
const mockedAxios = axios as AxiosMock;

function makeSut() {
  const mockedUrl: string = "http://test.localhost";

  const dataMocked: StreamData = {
    id: '0000-1111-2222-3333',
    name: 'Guilherme-1'
  };

  const expectedDataTransformed: StreamData = {
    id: '0000-1111-2222-3333',
    name: 'Guilherme-1 is odd'
  };

  const expectedCall = { "method": "GET", "responseType": "stream", "url": mockedUrl };

  const readableMocked = new Readable({
    read() {
      this.push(JSON.stringify(dataMocked));
      this.push(null);
    }
  });

  const client = new Client(mockedUrl);

  return {
    client,
    mockedUrl,
    dataMocked,
    expectedCall,
    expectedDataTransformed,
    readableMocked
  };
}

describe("Client", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("consume", () => {
    test("should make a get request and return data", async () => {
      // arrange
      const sut = makeSut();
      mockedAxios.mockResolvedValue({ data: sut.dataMocked });

      // act
      const result: StreamData = await sut.client._consume();

      // assert
      expect(result).toMatchObject(sut.dataMocked);
      expect(mockedAxios).toHaveBeenCalledWith(sut.expectedCall);
    });

    test("should throw an error on get request", async () => {
      // arrange
      const sut = makeSut();
      mockedAxios.mockRejectedValue(new Error("error"));

      // act
      const result: StreamData = await sut.client._consume();

      // assert
      expect(result).rejects;
      expect(result).toStrictEqual([]);
      expect(mockedAxios).toHaveBeenCalledWith(sut.expectedCall);
    });

  });

  describe("get", () => {
    test("should get data from consume and transform it", async () => {
      // arrange
      const sut = makeSut();
      mockedAxios.mockResolvedValue({ data: sut.readableMocked });

      // act
      const result = await sut.client.get();

      // assert
      expect(result[0]).toMatchObject(sut.expectedDataTransformed);
      expect(mockedAxios).toHaveBeenCalledWith(sut.expectedCall);

    });

    test("should throw an error when getting data", async () => {
      // arrange
      const sut = makeSut();
      mockedAxios.mockRejectedValue(new Error("error"));

      // act
      const result = await sut.client.get();

      // assert
      expect(result).toStrictEqual([]);
      expect(mockedAxios).toHaveBeenCalledWith(sut.expectedCall);
    });
  });


});