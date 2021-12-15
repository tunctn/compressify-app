import { ipcMain } from "electron";
import dayjs from "dayjs";
import PromisePool from "@supercharge/promise-pool";

import { getSettings } from "./compress";
import { mainWindow } from "../background";
import log from "npmlog";
import logfile from "npmlog-file";

const startCompressing = async (event, filepaths = []) => {
  let eventEmitter = mainWindow.webContents;

  let stop = false;
  if (!stop) {
    ipcMain.on("stop", () => {
      stop = true;
    });
  }

  const settings = getSettings();
  let total = filepaths.length;
  let success = 0;

  let start = dayjs();

  let promises = [];
  for (let index = 0; index < 99; index++) {
    promises.push(index);
  }

  const { results, errors } = await PromisePool.withConcurrency(5)
    .for(promises)
    .handleError(async (error, user) => {
      console.log(stop, error, user);
      if (stop) {
        eventEmitter.send("ipc-compression-progress", 0);

        // throwing errors will stop PromisePool and you must catch them yourself
        throw error;
      }
    })
    .process(async (filepath, index, pool) => {
      log.info("compressing", "current: %j", index);
    });

  // meaning it is finished actually, whether with error or not
  stop = false;

  let end = dayjs();
  let diff = end.diff(start, "seconds");

  log.info("exiting", "took: %j seconds", diff);
  logfile.write(log, "log.txt");
  // console.log(results, errors);
  // console.clear();
  // console.log(Math.round((success * 100) / total), "%", diff, "seconds");

  return event.reply("start", results);
};
export default startCompressing;
