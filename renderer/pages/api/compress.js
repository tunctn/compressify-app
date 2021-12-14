// import path from "path";
// import fs from "fs";
// import sizeOf from "buffer-image-size";
// import sharp from "sharp";
// import multer from "multer";
// import dayjs from "dayjs";
// const upload = multer();

// import { formatBytes, decideQuality, toBase64 } from "../../src/helpers";

// import nextConnect from "next-connect";

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// // Returns middleware that processes multiple files sharing the same field name.
// const uploadMiddleware = upload.array("images");

// // Adds the middleware to Next-Connect
// apiRoute.use(uploadMiddleware);

// // Process a POST request
// apiRoute.post(async (req, response) => {
//   let start = dayjs();

//   const file = req.files[0];
//   const buffer = file.buffer;

//   const dimensions = sizeOf(buffer);

//   const image = {
//     name: file.originalname,
//     encoding: file.encoding,
//     extension: file.mimetype.replace("image/", ""),
//     buffer: buffer,
//     size: file.size,
//     width: dimensions.width,
//     height: dimensions.height,
//     quality: decideQuality(file.size),
//   };

//   const res = await sharp(image.buffer)
//     .resize({ width: image.width > 1920 ? 1920 : image.width })
//     .jpeg({ quality: image.quality })
//     .toBuffer({ resolveWithObject: true })
//     .then((compressed) => compressed)
//     .catch((err) => console.log(err));

//   const base64String = toBase64(res.data);

//   res.base64 = base64String;
//   res.name = path.parse(image.name).name;
//   res.filename = res.name + "." + res.info.format;
//   res.format = res.info.format;
//   res.image = `data:image/${res.format};base64,${base64String}`;
//   res.width = res.info.width;
//   res.height = res.info.height;
//   res.size = res.info.size;
//   res.result = {
//     percentage_diff: (100 - (res.size / image.size) * 100).toFixed(2),
//     byte_diff: image.size - res.size,
//     formatted_byte_diff: formatBytes(image.size - res.size),
//   };

//   let end = dayjs();
//   let diff = end.diff(start, "miliseconds");
//   res.time_taken_to_process_as_ms = diff;

//   response.status(200).json(res);
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };
