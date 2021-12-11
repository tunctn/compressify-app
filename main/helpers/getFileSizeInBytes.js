import fs from "fs";
const getFileSizeInBytes = (file) => {
  let stats = fs.statSync(file);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

export default getFileSizeInBytes;
