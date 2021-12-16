import fs from "fs";
import path from "path";

import { VALID_TYPES } from "../config";
import { getSettings } from "./compress";

const acceptFiles = (filePaths, basePath) => {
  const settings = getSettings();

  let files = filePaths
    .filter((file) => {
      let stats;
      let lstat;
      try {
        stats = fs.statSync(file);
        lstat = fs.lstatSync(file);
      } catch (e) {
        return false;
      }

      let isDir = stats.isDirectory();

      if (!isDir) return file;
      else return false;
    })
    .map((file) => {
      let name = path.basename(file);
      let original_ext = path.extname(file);
      let ext = original_ext.toLowerCase().replace(".", "");

      let name_without_ext = name.replace(original_ext, "");

      let isImage = VALID_TYPES.images.includes(ext) ? "image" : false;
      let isRaw = VALID_TYPES.raw.includes(ext) ? "raw" : false;
      let isVideo = VALID_TYPES.video.includes(ext) ? "video" : false;

      let mediaType = isImage || isRaw || isVideo;

      if (mediaType === "image" && settings.isEnabled.image === false) {
        return null;
      }
      if (mediaType === "raw" && settings.isEnabled.raw === false) {
        return null;
      }
      if (mediaType === "video" && settings.isEnabled.video === false) {
        return null;
      }

      if (mediaType === "image") {
      } else if (mediaType === "raw") {
        ext = settings.convert.raw;
        // ext = original_ext.replace(".", "");
      } else if (mediaType === "video" && settings.convert.video) {
        ext = settings.convert.video;
      }
      let fileDir = file
        // remove base path from full string
        .replace(basePath, "")
        // remove name from string
        .replace(name, "")
        // remove last back slash from string
        .slice(0, -1);

      let outputDir = `${settings.outputDir}/${fileDir ? fileDir + "/" : ""}`;
      let outputPath = `${outputDir}${name_without_ext}.${ext}`;

      return {
        original_path: file,
        name,
        name_without_ext,
        original_ext,
        ext,
        mediaType,
        fileDir,
        outputPath,
        outputDir,
      };
    })
    .filter((file) => file);

  return files;
};

export default acceptFiles;
