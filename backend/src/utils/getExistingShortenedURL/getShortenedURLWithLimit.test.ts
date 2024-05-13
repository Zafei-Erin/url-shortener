import { describe } from "node:test";
import { getExistingShortenedURL } from "./getExistingShortenedURL";
import {
  connectMongoDB,
  disConnectMongoDB,
  getURLCollection,
} from "../../../mongoDB/client";
import { URI } from "../../config/defaults";

const testURL = "https://test.com";

describe("getShortenedURLWithLimit", () => {
  beforeAll(async () => {
    await connectMongoDB(URI);
  });

  afterAll(async () => {
    await getURLCollection().deleteOne({
      specified: testURL,
    });
    await disConnectMongoDB();
  }, 5000);

  it("returns same shortened url when provided same specified url", async () => {
    const url = "https://google.com";
    const first = await getExistingShortenedURL(url);
    const second = await getExistingShortenedURL(url);
    expect(first == second).toBe(true);
  });

  it("returns different shortened url when provided different specified url", async () => {
    const url1 = "https://google.com";
    const url2 = "https://github.com/";
    const first = await getExistingShortenedURL(url1);
    const second = await getExistingShortenedURL(url2);
    expect(first == second).toBe(false);
  });
});
