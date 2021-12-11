import s from "./s.module.scss";

const FilesAndFolders = () => {
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

    const paths = await dialog
      .showOpenDialog({
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
  };

  return (
    <div className={`area ${s.faf}`}>
      <div className="area__top-area">
        <div className="area-title">Files and folders</div>
        <div className={s.buttons}>
          <button onClick={() => handleAdd("folders")}>Add folders</button>
          <button onClick={() => handleAdd("files")}>Add files</button> /
        </div>
      </div>
    </div>
  );
};

export default FilesAndFolders;
