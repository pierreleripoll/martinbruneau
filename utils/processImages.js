import sharp from "sharp";
import fs from "fs";
import { readdir } from "fs/promises";
import { join, basename, extname } from "path";

const sizes = [
  { width: 1920, suffix: "1920px" },
  { width: 1080, suffix: "1080px" },
  { width: 600, suffix: "600px" },
  { width: 400, suffix: "400px" },
];

const originalDir = join(process.cwd(), "photos/original");
const outputDir = join(process.cwd(), "photos/optimized");
const outputDirMetadata = join(process.cwd(), "assets");
const metadataList = [];

const processImages = async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = await readdir(originalDir);

  for (const file of files) {
    const filePath = join(originalDir, file);
    const buffer = fs.readFileSync(filePath);
    const metadata = await sharp(buffer).metadata();
    const filename = basename(file, extname(file));
    const imageMetadata = {
      id: filename,
      width: metadata.width,
      height: metadata.height,
      sizes: [],
    };

    for (const size of sizes) {
      const resizeOptions = {
        fit: "inside",
        width: metadata.width > metadata.height ? size.width : undefined,
        height: metadata.width <= metadata.height ? size.width : undefined,
      };

      await processFormat(
        buffer,
        resizeOptions,
        filename,
        "webp",
        85,
        imageMetadata
      );
      await processFormat(
        buffer,
        resizeOptions,
        filename,
        "jpeg",
        85,
        imageMetadata
      );
    }

    await processOriginal(buffer, filename, imageMetadata);
    metadataList.push(imageMetadata);
  }

  fs.writeFileSync(
    join(outputDirMetadata, "metadata-photos.json"),
    JSON.stringify(
      metadataList.sort((a, b) => a.id - b.id),
      null,
      2
    )
  );
  console.log("Finished processing images and metadata.");
};

const processFormat = async (
  buffer,
  resizeOptions,
  filename,
  format,
  quality,
  imageMetadata
) => {
  const suffix = `${resizeOptions.width || resizeOptions.height}px`;
  const formatFilename = `${filename}-${suffix}.${format}`;
  const outputPath = join(outputDir, formatFilename);

  let metadata = {};
  if (!fs.existsSync(outputPath)) {
    const formatBuffer = await sharp(buffer)
      .resize(resizeOptions)
      [format]({ quality })
      .toBuffer();
    fs.writeFileSync(outputPath, formatBuffer);
    metadata = await sharp(formatBuffer).metadata();
  } else {
    const buffer = fs.readFileSync(outputPath);
    metadata = await sharp(buffer).metadata();
  }
  imageMetadata.sizes.push({
    filename: formatFilename,
    format,
    width: metadata.width,
    height: metadata.height,
  });
};

const processOriginal = async (buffer, filename, imageMetadata) => {
  const originalWebpFilename = `${filename}-original.webp`;
  const originalWebpPath = join(outputDir, originalWebpFilename);
  let metadata = {};

  if (!fs.existsSync(originalWebpPath)) {
    const originalWebpBuffer = await sharp(buffer)
      .webp({ quality: 90 })
      .toBuffer();
    fs.writeFileSync(originalWebpPath, originalWebpBuffer);
    metadata = originalWebpBuffer.metadata();
  } else {
    const buffer = fs.readFileSync(originalWebpPath);
    metadata = await sharp(buffer).metadata();
  }

  imageMetadata.sizes.push({
    filename: originalWebpFilename,
    format: "webp",
    width: metadata.width,
    height: metadata.height,
  });
};

processImages().catch(console.error);

export default processImages;
