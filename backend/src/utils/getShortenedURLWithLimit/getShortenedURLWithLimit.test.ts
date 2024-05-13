import { describe } from "node:test";
import { getShortenedURLWithLimit } from "./getShortenedURLWithLimit";
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
    const first = await getShortenedURLWithLimit(url);
    const second = await getShortenedURLWithLimit(url);
    expect(first.data == second.data).toBe(true);
  });

  it("returns different shortened url when provided different specified url", async () => {
    const url1 = "https://google.com";
    const url2 = "https://github.com/";
    const first = await getShortenedURLWithLimit(url1);
    const second = await getShortenedURLWithLimit(url2);
    expect(first.data == second.data).toBe(false);
  });

  it("returns error when exceed limits of try.", async () => {
    const first = await getShortenedURLWithLimit(testURL, 0);
    expect(first.error).toBe(true);
  });
});
