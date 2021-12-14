import os from "os";

import s from "./s.module.scss";
import FolderTree from "./FolderTree";
import { getFilePaths } from "../../src/helpers";

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
      <div className={`area__top-area ${s.toparea}`}>
        <div className={`area-title ${s.areatitle}`}>Files and folders</div>
        <div className={s.buttons}>
          {os.platform() === "darwin" && (
            <button className={s.button} onClick={() => handleAdd("folders")}>
              Add folders
            </button>
          )}

          <button className={s.button} onClick={() => handleAdd("files")}>
            Add files
          </button>
          <button
            className={s.button}
            onClick={() => setFilePaths([])}
            disabled={filePaths.length === 0}
          >
            Clear all
          </button>
        </div>
      </div>
      <div className={s.foldertree_holder}>
        <FolderTree setFilePaths={setFilePaths} filePaths={filePaths} />
      </div>
    </div>
  );
};

export default FilesAndFolders;
