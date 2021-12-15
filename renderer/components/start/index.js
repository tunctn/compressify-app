import { useEffect, useState, useCallback } from "react";
import { ipcRenderer } from "electron";
import dayjs from "dayjs";

import s from "./s.module.scss";

// import { SocketContext } from "../../context/socket";

const FilesAndFolders = ({ files, progress, defaultProgress, setProgress }) => {
  // const socket = useContext(SocketContext);

  const [ipcProgress, setIPCProgress] = useState(0);
  const handleIpcProgress = useCallback((e, p) => {
    setIPCProgress(p);
  }, []);

  useEffect(() => {
    ipcRenderer.on("start", (e, args) => {
      console.log(e, args);
    });
    ipcRenderer.on("ipc-compression-progress", handleIpcProgress);
    return () => {
      ipcRenderer.off("ipc-compression-progress", handleIpcProgress);
    };
  }, [handleIpcProgress]);

  const start = async () => {
    // setCompressionProgress(0);
    // let fls = [...files];
    ipcRenderer.send("start", files);
    // await ipcRenderer.invoke("start", files);
    // .then((res) => {
    // if (res) setP((p) => p + 1);
    // resolve(res);
    // });
  };

  const cancel = () => {
    ipcRenderer.send("stop");
    // setProgress({ ...defaultProgress, cancelled: true, finishedOn: dayjs() });
  };

  const handleClick = () => {
    start();
    // if (progress.started === false && hasFiles) {
    //   start();
    // } else {
    //   cancel();
    // }
  };

  return (
    <div className={`${s.start}`}>
      <button
        // disabled={progress.started ? false : files.length ? false : true}
        onClick={handleClick}
      >
        {`ipc=${ipcProgress}`} - {files.length} -{" "}
        {/* {p} / {files.length} ( {Math.round((p * 100) / files.length)}% ) --- */}
        {progress.started ? "Cancel compressing" : "Start compressing"}
      </button>

      <button onClick={cancel}>cancel</button>
    </div>
  );
};

export default FilesAndFolders;
