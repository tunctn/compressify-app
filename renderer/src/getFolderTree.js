import fs from "fs";
import path from "path";
// import path from "path";

function arrangeIntoTree(branches) {
  // Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
  let tree = [];

  let realIndex = 0;

  for (let i = 0; i < branches.length; i++) {
    let branch = branches[i];
    let currentLevel = tree;
    for (let j = 0; j < branch.length; j++) {
      let part = branch[j];

      let existingBranch = findWhere(currentLevel, "name", part);

      if (existingBranch) {
        currentLevel = existingBranch.children;
      } else {
        let originalpath = [...branches][i].slice(0, j + 1).join("/");

        if (!originalpath) originalpath = "/";
        let stats;
        let lstat;

        try {
          stats = fs.statSync(originalpath);
          lstat = fs.lstatSync(originalpath);
        } catch (e) {
          return null;
        }

        let type = stats.isDirectory()
          ? "folder"
          : path.extname(originalpath).toLowerCase();

        realIndex = realIndex + 1;

        let newPart = {
          name: part,
          path: originalpath,
          type: type,
          level: j,
          index: realIndex,
          children: [],
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    }
  }
  return tree;

  function findWhere(array, key, value) {
    // Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
    let t = 0; // t is used as a counter
    while (t < array.length && array[t][key] !== value) {
      t++;
    } // find the index where the id is the as the aValue

    if (t < array.length) {
      return array[t];
    } else {
      return false;
    }
  }
}

const getFolderTree = (array) => {
  if (array.length === 0) return { baselevel: 0, tree: [] };

  array = array.map((path) => {
    let slice = path.split("/");
    return [...slice];
  });

  let tree = arrangeIntoTree(array);

  let base = array.reduce((prev, next) =>
    prev.length > next.length ? next : prev
  );
  base.splice(-1);
  // let basepath = base.join("/");
  let baselevel = base.length - 1;
  // let baselevel = 0;

  return { baselevel, tree };
};

export default getFolderTree;
