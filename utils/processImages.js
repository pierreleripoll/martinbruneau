import sharp from "sharp";
import fs from "fs";
import { readdir } from "fs/promises";
import { join, basename, extname } from "path";

const sizes = [
  { width: 1920, suffix: "1920px" },
  { width: 1080, suffix: "1080px" },
  { width: 600, suffix: "600px" },
];

const originalDir = join(process.cwd(), "photos/original");
const outputDir = join(process.cwd(), "photos/optimized");

const processImages = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = await readdir(originalDir);
  const processedImages = [];

  for (const file of files) {
    const filePath = join(originalDir, file);
    const buffer = fs.readFileSync(filePath);
    const metadata = await sharp(buffer).metadata();
    const filename = basename(file, extname(file));

    for (const size of sizes) {
      const resizeOptions = {
        fit: "inside",
      };
      resizeOptions.width =
        metadata.width > metadata.height ? size.width : null;
      resizeOptions.height =
        metadata.width <= metadata.height ? size.width : null;

      // File check and process for WebP and JPEG
      await processFormat(
        buffer,
        resizeOptions,
        filename,
        "webp",
        85,
        metadata,
        processedImages
      );
      await processFormat(
        buffer,
        resizeOptions,
        filename,
        "jpeg",
        85,
        metadata,
        processedImages
      );
    }

    // Check and create original size in WebP
    const originalWebpFilename = `${filename}-original.webp`;
    const originalWebpPath = join(outputDir, originalWebpFilename);
    if (!fs.existsSync(originalWebpPath)) {
      const originalWebpBuffer = await sharp(buffer)
        .webp({ quality: 90 })
        .toBuffer();
      fs.writeFileSync(originalWebpPath, originalWebpBuffer);
      processedImages.push({
        key: originalWebpPath,
        buffer: originalWebpBuffer,
        contentType: "image/webp",
      });
    }
  }

  return processedImages;
};

const processFormat = async (
  buffer,
  resizeOptions,
  filename,
  format,
  quality,
  metadata,
  processedImages
) => {
  const formatFilename = `${filename}-${
    resizeOptions.width || resizeOptions.height
  }px.${format}`;
  const outputPath = join(outputDir, formatFilename);
  if (!fs.existsSync(outputPath)) {
    const formatBuffer = await sharp(buffer)
      .resize(resizeOptions)
      [format]({ quality })
      .toBuffer();
    fs.writeFileSync(outputPath, formatBuffer);
    processedImages.push({
      key: outputPath,
      buffer: formatBuffer,
      contentType: `image/${format}`,
    });
  }
};

processImages()
  .then(() => {
    console.log("Finished processing images.");
  })
  .catch(console.error);

export default processImages;
