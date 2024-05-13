import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 4000;
export const URI = process.env.DB_URI || "";
export const server = process.env.SERVER || "http://localhost";
export const TRY_LIMIT = 10;
export const HASH_LENGTH = 7;
