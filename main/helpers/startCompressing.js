import { ipcMain } from "electron";
import dayjs from "dayjs";
import PromisePool from "@supercharge/promise-pool";
import fs from "fs";
import {
  compressImage,
  compressVideo,
  compressRaw,
  getSettings,
} from "./compress";
import acceptFiles from "./acceptFiles";
import { mainWindow } from "../background";
import log from "npmlog";
import logfile from "npmlog-file";

const isProd = process.env.NODE_ENV === "production";

const sharedStart = (array) => {
  let A = array.concat().sort(),
    a1 = A[0],
    a2 = A[A.length - 1],
    L = a1.length,
    i = 0;
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
  return a1.substring(0, i);
};

const startCompressing = async (event, filePaths = []) => {
  let eventEmitter = mainWindow.webContents;

  // return if no files
  if (filePaths.length === 0) {
    event.reply("start", "no-files");
    return;
  }

  // control stop action
  let stop = false;
  if (!stop) {
    ipcMain.on("stop", () => {
      stop = true;
      setTimeout(() => {
        eventEmitter.send("ipc-compression-progress", 0);
        eventEmitter.send("progress-cancelled", true);
      }, 200);
    });
  }

  const settings = getSettings();

  let basePath = sharedStart(filePaths);
  let files = acceptFiles(filePaths, basePath);

  let total = files.length;
  let success = 0;

  let start = dayjs();

  log.info("started", "datetime: %j", start.format("DD/MM/YYYY HH:mm:ss"));

  eventEmitter.send("progress-started", {
    time: start.format("YYYY-MM-DD HH:mm:ss"),
  });

  // create output dir
  if (!fs.existsSync(settings.outputDir)) {
    fs.mkdirSync(settings.outputDir);
  }

  const { results, errors } = await PromisePool.withConcurrency(10)
    .for(files)
    .handleError(async (error, file) => {
      log.warn(error, `NAME=${file.name} - PATH=${file.original_path}`);
      if (stop) {
        console.log("stopped");
        throw error;
      }
    })
    .process(async (file, index, pool) => {
      if (stop) return;
      if (!file) return;
      if (!fs.existsSync(file.outputDir)) {
        fs.mkdirSync(file.outputDir, { recursive: true });
      }

      if (file.mediaType === "image") {
        await compressImage(file, eventEmitter);
      } else if (file.mediaType === "video") {
        await compressVideo(file, eventEmitter);
      } else if (file.mediaType === "raw") {
        await compressRaw(file, eventEmitter, log);
      } else {
        log.warn("mediatype", "invalid media type: %j", file.mediaType);
      }
      success = success + 1;

      eventEmitter.send("total-progress", (index * 100) / total);
    });

  // meaning it is finished actually, whether with error or not
  stop = false;

  let end = dayjs();
  let diff = end.diff(start, "seconds");

  log.info(
    "success rate",
    "%j files out of %j files are success",
    success,
    total
  );

  log.info("finished", "took: %j seconds", diff);

  if (isProd) {
    logfile.write(log, settings.outputDir + "/log.txt");
  } else {
    logfile.write(log, "logs/log-" + end.format("YYYY-MM-DDHH:mm:ss") + ".txt");
  }

  eventEmitter.send("progress-finished", {
    elapsed_seconds: diff,
    time: end.format("YYYY-MM-DD HH:mm:ss"),
  });

  return event.reply("start", results);
};

ipcMain.on("start", startCompressing);

export default startCompressing;
