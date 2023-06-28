import { Request, Response } from "express";
import { generateAndSaveQRCode } from "../utils/uploadQrCode";
import shortUrl from "../model/url.model";

export async function generateQrCode(req: Request, res: Response) {
  try {
    // get shortenend url for qrcode generation
    const desUrl = req.body;
    const url = await shortUrl.findOne(desUrl);

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Extract its original url and use it to generate qrCode
    const { originalURL } = url;
    await generateAndSaveQRCode(originalURL);
    res.status(200).json("QRcode generated succesfully")
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: "internal error" });
  }
}
