import { Request, Response } from "express";
import { getShortenedURLWithLimit } from "../utils";

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

  /* Create shortened url */
  const { error, data } = await getShortenedURLWithLimit(url);
  if (error) {
    return res
      .status(500)
      .json({ message: "Could not generate new shortened URL." });
  }

  return res.status(201).json({ shortened: data });
};
