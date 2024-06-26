import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import { join, basename } from "path";
import { mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const localDir = join(__dirname, "../photos/original/");
if (!existsSync(localDir)) {
  mkdirSync(localDir, { recursive: true });
}

const bucketName = "martinbruneau";
const prefix = "lamelancolieduhangar/";
const region = "sbg"; // Set your region
const endpoint = "https://s3.sbg.io.cloud.ovh.net";

const s3 = new S3Client({
  region: region,
  endpoint: endpoint,
  forcePathStyle: true, // needed for some S3 compatible services that require the bucket name in the path
  signatureVersion: "v4",
});

const fetchImages = async () => {
  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      })
    );

    for (const obj of data.Contents) {
      const key = obj.Key;
      const filename = basename(key);
      const filePath = join(localDir, filename);

      const { Body } = await s3.send(
        new GetObjectCommand({ Bucket: bucketName, Key: key })
      );

      // Create a file stream
      const fileStream = createWriteStream(filePath);

      // Use stream.pipeline to handle backpressure and errors properly
      await pipeline(Body, fileStream);
      console.log(`Downloaded and saved ${filename} to ${filePath}`);
    }
  } catch (error) {
    console.error("Failed to fetch and save images:", error);
    throw error;
  }
};

export default fetchImages;

// Call the function at the end of the file
fetchImages()
  .then(() => console.log("Fetching images completed."))
  .catch((error) => console.error("Error fetching images:", error));
