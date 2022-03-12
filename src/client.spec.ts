import { Client, StreamData } from './client';
import axios, { AxiosStatic } from 'axios';

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}

jest.mock('axios');
const mockedAxios = axios as AxiosMock;

function makeSut() {
  const mockedUrl: string = "http://test.localhost";

  const dataMocked: StreamData = {
    id: 'id',
    name: 'name'
  };

  const expectedCall = { "method": "GET", "responseType": "stream", "url": mockedUrl };

  const client = new Client(mockedUrl);

  return {
    client,
    mockedUrl,
    dataMocked,
    expectedCall
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
      expect(result).toStrictEqual([]);
      expect(mockedAxios).toHaveBeenCalledWith(sut.expectedCall);
    });

  });



});