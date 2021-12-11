import s from "./s.module.scss";

const FilesAndFolders = () => {
  const handleFolders = () => {
    // console.log(dialog, window.sharp);
    // console.log(dialog);
    // dialog.showOpenDialog({
    //   properties: ["openDirectory", "multiSelections"],
    // });
  };

  return (
    <div className={`area ${s.faf}`}>
      <div className="area__top-area">
        <div className="area-title">Files and folders</div>
        <div className={s.buttons}>
          <button onClick={handleFolders}>Add folders</button>
          {/* <button onClick={handleFiles}>Add files</button> / */}
        </div>
      </div>
    </div>
  );
};

export default FilesAndFolders;
