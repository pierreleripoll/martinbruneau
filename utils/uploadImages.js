import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const localDir = join(__dirname, "../photos/optimized/");
const uploadPrefix = "optimized/";

const bucketName = "martinbruneau";
const region = "sbg";
const endpoint = "https://s3.sbg.io.cloud.ovh.net";

const s3 = new S3Client({
  region: region,
  endpoint: endpoint,
  forcePathStyle: true,
  signatureVersion: "v4",
});

const getContentType = (filename) => {
  const ext = extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream"; // Default content type if unsure
  }
};

const uploadImages = async () => {
  try {
    const files = await readdir(localDir);

    for (const file of files) {
      const filePath = join(localDir, file);
      const buffer = await readFile(filePath);
      const contentType = getContentType(file);
      const key = `${uploadPrefix}${basename(file)}`;

      const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ACL: "public-read",
        ContentType: contentType, // Set correct content type based on file extension
      };

      await s3.send(new PutObjectCommand(params));
      console.log(
        `Uploaded ${key} to ${bucketName} with content type ${contentType}`
      );
    }
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

export default uploadImages;

// Optionally, call the function to test
uploadImages()
  .then(() => console.log("Uploading images completed."))
  .catch((error) => console.error("Error in uploading images:", error));
