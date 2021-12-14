import fs from "fs";
import sharp from "sharp";
import sizeOf from "buffer-image-size";

const compressImage = async (outputDir, filepath, jpegQuality) => {
  let stats;
  let lstat;

  try {
    stats = await fs.promises.stat(filepath);
    lstat = await fs.promises.lstat(filepath);
  } catch (e) {
    return null;
  }
  let isDirectory = stats.isDirectory();
  if (isDirectory) return null;

  let name = path.basename(filepath);
  let extension = path.extname(filepath).toLowerCase().replace(".", "");
  let outputname = outputDir + "/" + name;
  if (extension !== "jpeg" && extension !== "jpg") return;

  let buffer = await fs.promises.readFile(filepath);

  let width = sizeOf(buffer).width;

  let res = await sharp(buffer)
    .resize({ width: width > 1920 ? 1920 : width })
    .jpeg({ quality: jpegQuality })
    .toFile(outputname, { withMetadata: true })
    .catch((err) => console.log(err));

  if (res) return true;
  else return false;
};

export default compressImage;
