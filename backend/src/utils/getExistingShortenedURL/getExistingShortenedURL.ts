import { getURLCollection } from "../../../mongoDB/client";


export const getExistingShortenedURL = async (url: string) => {
  const result = await getURLCollection().findOne({
    specified: url,
  });
  return result !== null ? result.shortened : null;
};

