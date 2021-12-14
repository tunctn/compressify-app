import path from "path";
import hbjs from "handbrake-js";

const compressVideo = async (outputdir, filepath, settings) => {
  let name = path.basename(filepath);
  let outputname = outputdir + "/" + name;

  const options = {
    input: filepath,
    output: outputname.replace(".AVI", ".mkv"),
    preset: "H.265 MKV 1080p30",
  };

  return await new Promise((resolve, reject) => {
    return hbjs
      .spawn(options)
      .on("error", (err) => {
        console.log(err);
        reject(err);
        // invalid user input, no video found etc
      })
      .on("progress", (progress) => {
        console.log("Percent complete: %s, ETA: %s", progress.percentComplete, progress.eta);
      })
      .on("complete", () => {
        resolve();
      });
  });
};
export default compressVideo;
