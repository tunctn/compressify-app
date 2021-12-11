import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import express from "express";
import path from "path";
import sizeOf from "buffer-image-size";
import multer from "multer";
import dayjs from "dayjs";
import cors from "cors";

import sharp from "sharp"; // for images
import libraw from "libraw"; // for raw images

import hbjs from "handbrake-js"; // for videos
import ffmpeg from "fluent-ffmpeg"; // for videos

const command = ffmpeg();
const expressApp = express();
const upload = multer();

const corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
expressApp.use(cors(corsOptions));

expressApp.post("/compress", async (req, res, next) => {
  const { relativePath } = req.query;
});
// expressApp.post(
//   "/compress",
//   upload.single("images"),
//   async (req, response, next) => {
//     try {
//       let start = dayjs();

//       // const file = req.files[0];
//       const file = req.file;
//       const { webkitRelativePath } = req.query;
//       const buffer = file.buffer;

//       const dimensions = sizeOf(buffer);

//       const image = {
//         name: file.originalname,
//         encoding: file.encoding,
//         extension: file.mimetype.replace("image/", ""),
//         buffer: buffer,
//         size: file.size,
//         width: dimensions.width,
//         height: dimensions.height,
//         quality: decideQuality(file.size),
//       };

//       const res = await sharp(image.buffer)
//         .resize({ width: image.width > 1920 ? 1920 : image.width })
//         .jpeg({ quality: image.quality })
//         .toBuffer({ resolveWithObject: true })
//         .then((compressed) => compressed)
//         .catch((err) => {
//           console.log(err);
//         });

//       const base64String = toBase64(res.data);

//       res.base64 = base64String;
//       res.originalname = file.originalname;
//       res.name = path.parse(image.name).name;
//       res.filename = res.name + "." + res.info.format;
//       res.format = res.info.format;
//       res.image = `data:image/${res.format};base64,${base64String}`;
//       res.width = res.info.width;
//       res.height = res.info.height;
//       res.size = res.info.size;
//       res.result = {
//         percentage_diff: (100 - (res.size / image.size) * 100).toFixed(2),
//         byte_diff: image.size - res.size,
//         formatted_byte_diff: formatBytes(image.size - res.size),
//       };
//       res.webkitRelativePath = webkitRelativePath;

//       let end = dayjs();
//       let diff = end.diff(start, "miliseconds");
//       res.time_taken_to_process_as_ms = diff;
//       response.status(200).json(res);
//     } catch (error) {
//       console.log(error);
//       response.status(200).send();
//     }
//   }
// );
expressApp.listen(8889, () =>
  console.log("Example app listening on port 8889!")
);

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 800,
  });

  // mainWindow.setResizable(false)

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
