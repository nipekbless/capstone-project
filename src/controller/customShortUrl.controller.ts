import { Request, Response } from "express";
import shortUrl from "../model/url.model";

export async function customShortUrl(req: Request, res: Response) {
  const targetId = req.params;
  const customUrl = req.body.customUrl;
  const hostUrl = "https://trim-q1wc.onrender.com";

  try {
    // search the database for target short URL data and replace with the custom url
    const updatedShortUrl = await shortUrl.findOneAndUpdate(
      targetId,
      { shortUrl: `${hostUrl}/${customUrl}` , shortId: customUrl},
      { new: true }
    );
    if (!updatedShortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json(updatedShortUrl.shortUrl);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}
