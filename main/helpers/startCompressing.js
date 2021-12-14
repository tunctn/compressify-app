import dayjs from "dayjs";
import PromisePool from "@supercharge/promise-pool";

import { getSettings } from "./compress";

import { ioApp } from "../background";

const startCompressing = async (e, filepaths = []) => {
  const settings = getSettings();

  let total = filepaths.length;
  let success = 0;

  let start = dayjs();

  let num = 99;

  const promises = [];

  for (let index = 0; index < num; index++) {
    promises.push(
      new Promise(async (resolve, reject) => {
        setTimeout(() => {
          console.log(index);
          ioApp.emit("compression-progress", index);
          resolve(index);
        }, 500 * index);
      })
    );
  }

  await Promise.all(promises);

  // const { results, errors } = await PromisePool.withConcurrency(5)
  //   .for(filepaths)
  //   .process(async (filepath, index, pool) => {
  //     // await compressVideo(outputDir, filepath);
  //     // const result = await compress(outputDir, filepath, jpegQuality);
  //     // if (result) {
  //     //   success = success + 1;
  //     // }
  //     // console.log(
  //     //   Math.round((success * 100) / total),
  //     //   "%",
  //     //   " processed=",
  //     //   success,
  //     //   " index=",
  //     //   index
  //     // );

  //     return "true";
  //   });

  // let end = dayjs();
  // let diff = end.diff(start, "seconds");

  // console.log(results, errors);
  // console.clear();
  // console.log(Math.round((success * 100) / total), "%", diff, "seconds");

  return "nice";
};
export default startCompressing;
