import { useState } from "react";
import s from "./s.module.scss";

import FolderTree from "./folderTree";
import { getFilePaths } from "../../src/helpers";

import directoryTree from "directory-tree";

const FilesAndFolders = ({ setFilePaths, filePaths }) => {
  const handleAdd = async (type) => {
    const dialog = window.Electron.dialog;

    let properties = ["multiSelections", "dontAddToRecent", "createDirectory"];
    switch (type) {
      case "files":
        properties.push("openFile");
        break;

      case "folders":
        properties.push("openDirectory");
        properties.push("createDirectory");
        break;

      default:
        properties.push("openFile");
        break;
    }

    const dialogPaths = await dialog
      .showOpenDialog({
        buttonLabel: `Add ${type}`,
        properties: properties,
        filters: [
          {
            name: "Images",
            extensions: ["*"],
          },
          { name: "Movies", extensions: ["*"] },
          { name: "All Files", extensions: ["*"] },
        ],
      })
      .then((result) => result.filePaths)
      .catch(console.log);

    const paths = getFilePaths(dialogPaths);

    let combined = [...filePaths, ...paths];
    let unique = [...new Set(combined)];

    setFilePaths(unique);
  };

  return (
    <div className={`area ${s.faf}`}>
      <div className="area__top-area">
        <div className="area-title">Files and folders</div>
        <div className={s.buttons}>
          <button onClick={() => handleAdd("folders")}>Add folders</button>
          <button onClick={() => handleAdd("files")}>Add files</button>
          <button onClick={() => setFilePaths([])}>Clear all</button>
        </div>
      </div>
      <div className={s.foldertree_holder}>
        <FolderTree setFilePaths={setFilePaths} filePaths={filePaths} />
      </div>
    </div>
  );
};

export default FilesAndFolders;
