import { Request, Response } from "express";
import {
  getExistingShortenedURL,
  generateAndInsertShortenedURL,
} from "../../utils";

export const postShortenedURL = async (req: Request, res: Response) => {
  const { url } = req.body;

  /* Check input format or empty input */
  if (!url || typeof url != "string") {
    return res.status(400).json({ message: "Please provide a string URL." });
  }

  /* Validate url */
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ message: "This is not a valid URL." });
  }

  /* Check if provided url is existing */
  const existingShortenedURL = await getExistingShortenedURL(url);
  if (existingShortenedURL !== null) {
    return res.status(201).json({ shortened: existingShortenedURL });
  }

  /* Create shortened url */
  const newShortenedURL = await generateAndInsertShortenedURL(url);
  if (newShortenedURL !== null) {
    return res.status(201).json({ shortened: newShortenedURL });
  }

  return res
    .status(500)
    .json({ message: "Could not generate new shortened URL." });
};
