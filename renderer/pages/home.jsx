import Head from "next/head";
import { useState } from "react";
import FilesAndFolders from "../components/filesAndFolders";
import Footer from "../components/footer";
import Progress from "../components/progress";
import Settings from "../components/settings";
import Start from "../components/start";

const defaultProgress = {
  started: false,
  startedAt: null,
  cancelled: false,
  finishedOn: null,
};

export default function Home() {
  const [filePaths, setFilePaths] = useState([]);
  const [progress, setProgress] = useState(defaultProgress);

  return (
    <div className="app">
      <Head>
        <title>Compressify</title>
        <meta name="description" content="Created by https://tunc.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container main-page">
        <div className="left col">
          <div className="files-and-folders">
            <FilesAndFolders
              setFilePaths={setFilePaths}
              filePaths={filePaths}
            />
          </div>
          <div className="progress-area">
            <Progress />
          </div>
        </div>
        <div className="right col">
          <div className="settings">
            <Settings />
          </div>
          <div className="start">
            <Start
              files={filePaths}
              progress={progress}
              setProgress={setProgress}
              defaultProgress={defaultProgress}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
