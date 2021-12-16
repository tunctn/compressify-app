import dayjs from "dayjs";
import { ipcMain } from "electron";
import hbjs from "handbrake-js";

import getSettings from "./getSettings";

const compressVideo = async (file, eventEmitter) => {
  const filepath = file.original_path;

  let settings = getSettings();

  const options = {
    input: filepath,
    output: file.outputPath,

    ...(settings.video_preset
      ? { preset: settings.video_preset }
      : {
          encoder: "x265",
          quality: settings.quality.video,
          vb: settings.video_bitrate,
        }),
  };

  return await new Promise((resolve, reject) => {
    let handbrake = hbjs.spawn(options);

    handbrake
      .on("error", (err) => {
        reject(err);
        // invalid user input, no video found etc
      })
      .on("progress", (progress) => {
        eventEmitter.send("file-progress", {
          filename: file.name_without_ext + file.original_ext.toLowerCase(),
          type: "Video",
          percent: progress.percentComplete,
          time: dayjs(),
          eta: progress.eta,
        });
      })
      .on("complete", () => {
        resolve();
      });

    ipcMain.on("stop", () => handbrake.cancel());

    return handbrake;
  });
};
export default compressVideo;
