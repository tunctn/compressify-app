import { useEffect, useState, useContext, useCallback } from "react";
import { ipcRenderer } from "electron";
import dayjs from "dayjs";

import s from "./s.module.scss";

import { SocketContext } from "../../context/socket";

const FilesAndFolders = ({ files, progress, defaultProgress, setProgress }) => {
  const socket = useContext(SocketContext);

  // handle compression process socket
  const [compressionProgress, setCompressionProgress] = useState(0);
  const handleProgress = useCallback((p) => setCompressionProgress(p), []);

  useEffect(() => {
    socket.on("compression-progress", handleProgress);
    return () => {
      socket.off("compression-progress", handleProgress);
    };
  }, [socket, handleProgress]);

  const start = async () => {
    setCompressionProgress(0);
    // let fls = [...files];

    await ipcRenderer.invoke("start-compressing", files).then((res) => {
      // if (res) setP((p) => p + 1);
      // resolve(res);
    });
  };

  const cancel = () => {
    setProgress({ ...defaultProgress, cancelled: true, finishedOn: dayjs() });
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
        {compressionProgress} - {files.length} -{" "}
        {/* {p} / {files.length} ( {Math.round((p * 100) / files.length)}% ) --- */}
        {progress.started ? "Cancel compressing" : "Start compressing"}
      </button>
    </div>
  );
};

export default FilesAndFolders;
