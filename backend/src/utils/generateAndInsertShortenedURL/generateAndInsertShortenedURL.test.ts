import { describe } from "node:test";
import { generateAndInsertShortenedURL } from "./generateAndInsertShortenedURL";
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

  it("returns error when exceed limits of try.", async () => {
    const result = await generateAndInsertShortenedURL(testURL, 0);
    expect(result).toBe(null);
  });

  it("returns the new shortened url when generate and insert data successfully.", async () => {
    const result = await generateAndInsertShortenedURL(testURL, 10);
    expect(typeof result).toBe("string");
  });
});
