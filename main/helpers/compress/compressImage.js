import fs from "fs";
import sharp from "sharp";
import sizeOf from "buffer-image-size";
import dayjs from "dayjs";

import getSettings from "./getSettings";

const compressImage = async (file, eventEmitter) => {
  const filepath = file.original_path;
  const buffer = await fs.promises.readFile(filepath);
  const width = sizeOf(buffer).width;

  let settings = getSettings();
  const resize = settings.resize.image
    ? {
        width: width > settings.resize.image ? settings.resize.image : width,
      }
    : {};

  let res = sharp(buffer).resize(resize);

  if (file.ext === "jpeg" || file.ext === "jpg") {
    res = res.jpeg({ quality: settings.quality.image.jpeg });
  }
  if (file.ext === "png") {
    res = res.png({ quality: settings.quality.image.png });
  }
  if (file.ext === "tiff") {
    res = res.tiff({ quality: settings.quality.image.tiff });
  }

  res = await res
    .withMetadata()
    .toFile(file.outputPath, { withMetadata: true })
    .catch((err) => console.log(err));

  eventEmitter.send("file-progress", {
    filename: file.name_without_ext + file.original_ext.toLowerCase(),
    type: "Image",
    message: `Compressing image: ${file.name}`,
    time: dayjs(),
  });

  if (res) return true;
  else return false;
};

export default compressImage;
