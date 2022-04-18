import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import dayjs from "dayjs";

import s from "./s.module.scss";

const getDuration = (seconds) => {
  let minutes, hours;
  if (seconds < 60) return `${seconds} second${seconds > 0 ? "s" : ""}`;
  if (seconds < 60 * 60) {
    minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 0 ? "s" : ""}`;
  }
  if (minutes < 60 * 60) {
    hours = Math.floor(hours / 60);
    let str = `${hours} hour${hours > 0 ? "s" : ""}`;
    if (minutes > 0) {
      str = str + ` and ${minutes} minute${minutes > 0 ? "s" : ""}`;
    }
    return str;
  }
  return `It took so fcking long, isn't it?`;
};

const Progress = ({ cancelled }) => {
  const [totalProgress, setTotalProgress] = useState(0);
  const [fileProgress, setFileProgress] = useState("");

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [times, setTimes] = useState({
    start: null,
    finish: null,
    elapsed_seconds: null,
  });

  const handleProgress = (e, args) => {
    setTotalProgress(args);
  };
  const handleFileProgress = (e, args) => {
    let { type, time, eta, progress, filename } = args;

    time = dayjs().format("HH:mm:ss");
    if (eta) {
      let h, m, s;
      h = eta.split("h");
      m = h[1].split("m");
      s = m[1].split("s");

      h = h[0];
      m = m[0];
      s = s[0];

      if (h[0] === "0") h = h[1];
      if (m[0] === "0") m = m[1];
      if (s[0] === "0") s = s[1];

      let str = [];
      if (h !== "0") str.push(`${h} hour${h > 1 ? "s" : ""}`);
      if (m !== "0") str.push(`${m} minute${m > 1 ? "s" : ""}`);
      if (s !== "0" && h === "0" && m === "0")
        str.push(`${s} second${s > 1 ? "s" : ""}`);

      str = str.join(` `) + " left";
      eta = str;
    }

    setFileProgress({ time, type, eta, progress, filename });
  };
  const handleStart = (e, args) => {
    setTimes({
      start: args.time,
      finish: null,
      elapsed_seconds: null,
    });
    setStarted(true);
    setFinished(false);
    setFileProgress([]);
    setTotalProgress(0);
  };

  const handleFinished = (e, args) => {
    setTimes((t) => ({
      start: t.start,
      finish: args.time,
      elapsed_seconds: args.elapsed_seconds,
    }));
    console.log("finished", args);
    setFinished(true);
  };

  useEffect(() => {
    ipcRenderer.on("progress-started", handleStart);
    ipcRenderer.on("progress-finished", handleFinished);
    ipcRenderer.on("total-progress", handleProgress);
    ipcRenderer.on("file-progress", handleFileProgress);
    return () => {
      ipcRenderer.off("progress-started", handleStart);
      ipcRenderer.on("progress-finished", handleFinished);
      ipcRenderer.off("total-progress", handleProgress);
      ipcRenderer.off("file-progress", handleFileProgress);
    };
  }, []);
  return (
    <div className={`area ${s.area}`}>
      <div className={s.top}>
        <div className={s.progress_text}>Progress</div>
        <div className={s.brief}>
          <div className={s.message} hidden={finished || cancelled}>
            {fileProgress?.filename}
            <span className={s.eta}>{fileProgress?.eta}</span>
          </div>

          <div className={s.cancelled} hidden={!cancelled}>
            Cancelled
          </div>

          <div className={s.finished} hidden={!finished}>
            Finished
          </div>
          <div className={s.percent} hidden={!started || finished}>
            {Math.ceil(totalProgress)}%
          </div>
        </div>
        <div className={s.progressbar} data-cancel={cancelled}>
          <progress
            className={`progress ${s.progress}`}
            value={finished ? 100 : totalProgress}
            min={0}
            max={100}
          ></progress>
        </div>
      </div>

      {started && (
        <div className={s.time}>
          <div className={s.start}>
            {times.start &&
              `Started: ${dayjs(times.start).format("DD/MM/YY HH:mm:ss")}`}
          </div>

          {finished ? (
            <div className={s.elapsed}>
              <span className={s.text}>Finished in</span>
              <span className={s.duration} data-finished="true">
                {getDuration(times.elapsed_seconds)}
              </span>
            </div>
          ) : (
            <div className={s.elapsed}>
              <span className={s.text}>Elapsed time</span>
              <span className={s.duration}>
                {getDuration(dayjs().diff(dayjs(times.start), "seconds"))}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Progress;
