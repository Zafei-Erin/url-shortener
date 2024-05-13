import { URLCollection, getURLCollection } from "../../../mongoDB/client";
import { TRY_LIMIT, server } from "../../config/defaults";
import { getRandomHash } from "../getRandomHash/getRandomHash";

// create a new shortened URL
export const generateAndInsertShortenedURL = async (
  url: string,
  limit: number = TRY_LIMIT
) => {
  let counts = 0;

  while (counts < limit) {
    const hash = getRandomHash();
    const shortened = `${server}/${hash}`;
    const pair: URLCollection = {
      _id: hash,
      shortened: shortened,
      specified: url,
    };

    try {
      const response = await getURLCollection().insertOne(pair);
      if (response.acknowledged) {
        return shortened;
      }
    } catch (error) {
      console.log("duplicated shortened url");
      counts++;
    }
  }
  return null;
};
