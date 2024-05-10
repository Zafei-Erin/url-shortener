import { Request, Response } from "express";
import { getURLCollection } from "../../mongoDB/client";

export const getShortenedURL = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getURLCollection().findOne({
    _id: id,
  });

  /* Check if it exists */
  if (result == null) {
    return res.status(404).json({ message: "No such shortened url." });
  }

  return res.redirect(result.specified);
};
