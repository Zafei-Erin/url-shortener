import { URLCollection, getURLCollection } from "../../../mongoDB/client";
import { getRandomHash } from "../getRandomHash/getRandomHash";
import dotenv from "dotenv";

dotenv.config();
const server = process.env.SERVER || "http://localhost";
const TRY_LIMIT = 10;

export const getShortenedURLWithLimit = async (
  url: string,
  limit: number = TRY_LIMIT
) => {
  // check if it is already created
  const result = await getURLCollection().findOne({
    specified: url,
  });
  if (result !== null) {
    return { error: false, data: result.shortened };
  }

  // create a new shortened URL
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
        return { error: false, data: shortened };
      }
    } catch (error) {
      console.log("duplicated shortened url");
      counts++;
    }
  }
  return { error: true, data: null };
};
