import { Request, Response } from "express";
import { generateAndUploadQRCode } from "../utils/uploadQrCode";
import shortUrl from "../model/url.model";

export async function generateQrCode(req: Request, res: Response) {
  try {
    // Get the shortened URL for QR code generation
    const desUrl = req.body;
    console.log(desUrl);

    const url = await shortUrl.findOne(desUrl);

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Extract the original URL and generate/upload the QR code
    const { originalURL } = url;
    const qrCodeUrl = await generateAndUploadQRCode(originalURL);

    res.status(200).json({ qrCodeUrl: qrCodeUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal error" });
  }
}
