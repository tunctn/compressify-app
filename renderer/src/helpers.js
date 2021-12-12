import fs from "fs";
import getFolderTree from "./getFolderTree";
import getFilePaths from "./getFilePaths";
import formatBytes from "./formatBytes";

export const replaceAll = (search, replacement) => {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

export const getFilesizeInBytes = (file) => {
  let stats = fs.statSync(file);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

export const toBase64 = (buffer) => {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return Buffer.from(buffer).toString("base64");
};

export const decideQuality = (byte) => {
  // rough numbers used
  if (byte < 700_000) return 80;
  if (byte > 700_000) return 70;
  if (byte > 1_000_000) return 65; // 1mb
  if (byte > 1_500_000) return 60;
  if (byte > 2_000_000) return 55;
  if (byte > 3_000_000) return 50;
  if (byte > 4_000_000) return 45;
  if (byte > 5_000_000) return 40;

  return 30;
};

export { getFolderTree, getFilePaths, formatBytes };
