import { getData } from "../api/data";

describe("Getting Yoga Poses", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  const validUrl = "localhose:3000/api/yoga-poses";

  it("gets Data and returns yoga poses sucessfully", async () => {
    const mockData = { name: "hayam", age: 26 };
    fetch.mockResolvedValueOnce({
      ok: 200,
      json: async () => mockData,
    });

    const result = await getData(validUrl);
    expect(fetch).toHaveBeenCalledWith(validUrl);
    expect(result).toEqual(mockData);
  });

  it("Throws an Error when connection problems happen", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getData()).rejects.toThrow(`Response Status 500`);
  });
});

// TODO turn this module to .js file and ask if vitest can deal with such modules and also ask if there will be different in performance between .jsx files and .js files
