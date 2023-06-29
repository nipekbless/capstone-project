import { Request, Response } from "express";
import ShortURL from "../model/url.model";
import { validateURL } from "../utils/validateUrl";
import { customAlphabet } from "nanoid";
import Cache from "../config/redisConfig";

// Generate custom ID
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  3
);

export async function shortenUrl(req: Request, res: Response) {
  try {
    //get original url from request body
    const { originalURL } = req.body;
    console.log(originalURL);
    const hostUrl = "http://localhost:2020";

    // check if url is valid
    const isValidUrl = validateURL(originalURL);

    if (isValidUrl) {
      // Check if the URL is already cached
      const cachedUrl = await Cache.get(originalURL);

      if (cachedUrl) {
        return res.send(cachedUrl);
      }

      //shorten url and return to client
      const shortid = nanoid();
      const completeUrl = `${hostUrl}/${shortid}`;
      const shortenedUrl = new ShortURL({
        originalURL,
        shortUrl: completeUrl,
        shortId: shortid,
      });
      await shortenedUrl.save();

      // Cache the shortened URL for future use
      await Cache.set(originalURL, completeUrl);

      return res.send(completeUrl);
    }
    res.send("Invalid URL");
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}
