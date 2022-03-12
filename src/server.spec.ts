import { run, server } from './server';

describe("Server", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Expect true to be true", () => {
    expect(true).toBe(true);
  });

});