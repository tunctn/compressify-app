import fs from "fs";
import path from "path";

function normalizePath(path) {
  if (!typeof path === "string") {
    return;
  }
  return path.replace(/\\/g, "/");
}

const getFilePaths = (folderPaths) => {
  let paths = folderPaths.map((folderPath) => {
    let p = path.resolve(folderPath);
    let result;

    let stats;
    let lstat;

    try {
      stats = fs.statSync(folderPath);
      lstat = fs.lstatSync(folderPath);
    } catch (e) {
      return null;
    }

    if (stats.isDirectory()) {
      result = {};
      function buildObject(startPath) {
        let dir = fs.readdirSync(startPath);
        dir.forEach(function (e) {
          let newPath = path.join(startPath, e);

          let stat = fs.statSync(newPath);
          if (stat && stat.isDirectory()) buildObject(newPath);
          if (stat.isFile()) {
            newPath.split("\\").reduce(function (r, a) {
              return r[a] || (r[a] = {});
            }, result);
          }
        });
      }
      buildObject(p);

      let newResults = [];
      for (const [key, value] of Object.entries(result)) {
        newResults.push(key);
      }
      result = [...newResults];
      result.push(folderPath);
    } else {
      result = folderPath;
    }

    return result;
  });

  paths = paths.flat(1);
  paths = paths.sort().map((path) => normalizePath(path));
  return paths;
};

export default getFilePaths;
