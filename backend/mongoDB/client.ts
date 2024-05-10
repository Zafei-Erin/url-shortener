import { MongoClient, ServerApiVersion } from "mongodb";

let client: MongoClient;
const database = "shortener";
const collection = "url";

export const connectMongoDB = async (URI: string) => {
  client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
};

export const disConnectMongoDB = async () => {
  await client.close();
};

export type URLCollection = {
  _id?: string;
  shortened: string;
  specified: string;
};

export const getURLCollection = () => {
  return client.db(database).collection<URLCollection>(collection);
};
