import fs from "fs";
import path from "path";
// import path from "path";

import { VALID_EXTENSIONS } from "../../main/config";

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

        let size = stats.size;
        let type = stats.isDirectory()
          ? "folder"
          : path.extname(originalpath).toLowerCase();

        let isValid = VALID_EXTENSIONS.includes(type.replace(".", ""));

        realIndex = realIndex + 1;

        let newPart = {
          name: part,
          path: originalpath,
          type,
          level: j,
          index: realIndex,
          size,
          isValid,
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

const findGrandParent = (array) => {
  let grandparent;

  const walk = (tree) => {
    const parent = [...tree];
    return parent.find((branches) => {
      let found = false;
      branches.children.forEach((child) => {
        if (child.type !== "folder") {
          found = true;
          return branches;
        }
      });
      if (found) {
        grandparent = branches;
        return branches;
      } else {
        walk(branches.children);
      }
    });
  };
  walk(array);
  return grandparent;
};

const getFolderTree = (array) => {
  if (array.length === 0) return { baselevel: 0, tree: [] };

  array = array
    .map((file) => {
      let slice = file.split("/");
      return [...slice];
    })

    .filter((file) => file);

  let tree = arrangeIntoTree(array);

  let grandparent = findGrandParent(tree);
  let baselevel = grandparent.level - 1;

  return { baselevel, tree };
};

export default getFolderTree;
