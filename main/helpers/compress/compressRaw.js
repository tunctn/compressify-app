import fs from "fs";

import sizeOf from "buffer-image-size";
import sharp from "sharp";
import dcraw from "dcraw";
import dayjs from "dayjs";

import getSettings from "./getSettings";

const compressRaw = async (file, eventEmitter) => {
  let settings = getSettings();

  const filepath = file.original_path;

  const buf = new Uint8Array(fs.readFileSync(filepath));
  let thumbnail = await dcraw(buf, { extractThumbnail: true });
  let buffer = Buffer.from(thumbnail);

  const width = sizeOf(buffer).width;
  const resize = settings.resize.raw
    ? {
        width: width > settings.resize.raw ? settings.resize.raw : width,
      }
    : {};

  let res = await sharp(buffer)
    .resize(resize)
    .withMetadata()
    .toBuffer((err, buffer, info) => {
      fs.writeFileSync(file.outputPath, buffer);
      return buffer;
    });

  eventEmitter.send("file-progress", {
    filename: file.name_without_ext + file.original_ext.toLowerCase(),
    type: "Image",
    message: `Compressing image: ${file.name}`,
    time: dayjs(),
  });

  if (res) return true;
  else return false;
};
export default compressRaw;
