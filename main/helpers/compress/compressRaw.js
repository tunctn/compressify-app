import fs from "fs";

import sizeOf from "buffer-image-size";
import sharp from "sharp";

const { spawn } = require("child_process");

const dcrawpath = require("dcrawjs-darwin");
// var dcrawpath
// try { dcrawpath = require('dcrawjs-darwin')} catch(e){}
// try { dcrawpath = require('dcrawjs-win32')} catch(e){}
// if (!dcrawpath) throw new Error('could not load os specific dcraw build, either dependencies are missing, or your os is not supported')

import dayjs from "dayjs";

import getSettings from "./getSettings";

const compressRaw = async (file, eventEmitter, log) => {
  let settings = getSettings();

  const filepath = file.original_path;

  // const buf = new Uint8Array(fs.readFileSync(filepath));
  const buf = fs.readFileSync(filepath);

  try {
    await new Promise(function (resolve, reject) {
      try {
        console.log(file.name);
        const sh = spawn(dcrawpath, ["-e", filepath]);
        let chunks = [];
        sh.stdout.on("data", (chunk) => {
          chunks.push(chunk);
        });
        sh.stderr.on("data", (data) => {
          console.log(data.toString());
        });
        sh.on("close", () => {
          resolve(Buffer.concat(chunks));
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });

    const thumbnail_path = file.original_path.replace(
      file.original_ext,
      ".thumb.jpg"
    );

    const thumbnail_buffer = await fs.promises.readFile(thumbnail_path);
    const thumbnail_width = sizeOf(thumbnail_buffer).width;

    const resize = settings.resize.raw
      ? {
          width:
            thumbnail_width > settings.resize.raw ? settings.resize.raw : width,
        }
      : {};

    // let res = await sharp(thumbnail_buffer)
    //   .toFile(file.outputPath)
    //   .then(console.log)
    //   .catch(console.log);

    let res = sharp(thumbnail_buffer).resize(resize);

    if (settings.convert.raw === "jpeg") {
      res = res.jpeg({ quality: settings.quality.raw });
    } else if (settings.convert.raw === "png") {
      res = res.png({ quality: settings.quality.raw });
    } else if (settings.convert.raw === "tiff") {
      res = res.jpeg({ quality: settings.quality.raw });
    }

    res = await res
      .withMetadata()
      .toFile(file.outputPath, { withMetadata: true })
      .catch((err) => console.log(err));

    eventEmitter.send("file-progress", {
      filename: file.name_without_ext + file.original_ext.toLowerCase(),
      type: "Image",
      message: `Compressing raw: ${file.name}`,
      time: dayjs(),
    });

    fs.unlinkSync(thumbnail_path);

    if (res) return true;
    else return false;
  } catch (e) {
    log.warn(e, `NAME=${file.name} - PATH=${file.original_path}`);
    let newPath = `${file.outputDir}${file.name_without_ext.replaceAll(
      " ",
      ""
    )}-untouched${file.original_ext}`;
    fs.writeFileSync(newPath, buf);
  }
};
export default compressRaw;
