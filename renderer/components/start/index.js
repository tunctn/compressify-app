import { useEffect, useState, useCallback } from "react";
import { ipcRenderer } from "electron";
import dayjs from "dayjs";

import s from "./s.module.scss";

const Start = ({ filePaths, setCancelled }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleFinished = () => setFinished(true);

  useEffect(() => {
    ipcRenderer.on("progress-finished", handleFinished);
    return () => {
      ipcRenderer.off("progress-finished", handleFinished);
    };
  }, []);

  const start = async () => {
    setCancelled(false);
    setFinished(false);
    setStarted(true);
    ipcRenderer.send("start", filePaths);
  };

  const cancel = () => {
    setCancelled(true);
    setFinished(false);
    setStarted(false);
    ipcRenderer.send("cancelled");
    ipcRenderer.send("stop");
  };

  const handleClick = () => {
    if (started) {
      if (finished) {
        start();
      } else {
        cancel();
      }
    } else {
      start();
    }
  };

  return (
    <div className={`${s.start}`}>
      <button disabled={filePaths.length <= 0} onClick={handleClick}>
        {started
          ? finished
            ? "Start compressing"
            : "Cancel compressing"
          : "Start compressing"}
      </button>
    </div>
  );
};

export default Start;
