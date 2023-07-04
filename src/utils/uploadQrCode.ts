import * as cloudinary from "cloudinary";
import * as qrCode from "qrcode";
import { createWriteStream } from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Generate and save QR code, upload to Cloudinary, and return the secure URL
export async function generateAndUploadQRCode(text: string): Promise<string> {
  try {
    const qrCodeImageData = await qrCode.toBuffer(text);
    const outputFilePath = "qrcode.png";

    // Save QR code buffer to file
    await new Promise((resolve, reject) => {
      const fileStream = createWriteStream(outputFilePath);
      fileStream.write(qrCodeImageData);
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
      fileStream.end();
    });

    // Upload QR code to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(outputFilePath, {
      folder: "qrcodes",
      public_id: "qrcode",
      overwrite: true,
      resource_type: "image",
    });

    console.log("QR code saved to Cloudinary:", uploadResult.secure_url);

    // Return the secure URL of the uploaded QR code
    return uploadResult.secure_url;
  } catch (error) {
    console.error("QR code generation and upload failed:", error);
    throw error;
  }
}
