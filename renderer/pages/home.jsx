import Head from "next/head";
import { useState } from "react";
import FilesAndFolders from "../components/filesAndFolders";
import Footer from "../components/footer";
import Progress from "../components/progress";
import Settings from "../components/settings";
import Start from "../components/start";

import Split from "react-split";

const defaultFiles = [];

export default function Home() {
  const [filePaths, setFilePaths] = useState(defaultFiles);

  const [cancelled, setCancelled] = useState(false);
  return (
    <div className="app">
      <Head>
        <title>Compressify</title>
        <meta name="description" content="Created by https://tunc.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Split
        className="container main-page "
        sizes={[70, 30]}
        minSize={[400, 300]}
        maxSize={[Infinity, 800]}
      >
        {/* <div className="left col"> */}
        <Split
          className="left col"
          direction="vertical"
          sizes={[80, 20]}
          minSize={[400, 140]}
        >
          <div className="files-and-folders">
            <FilesAndFolders
              setFilePaths={setFilePaths}
              filePaths={filePaths}
            />
          </div>
          <div className="progress-area">
            <Progress cancelled={cancelled} />
          </div>
        </Split>
        {/* </div> */}
        <div className="right col">
          <div className="settings">
            <Settings />
          </div>
          <div className="start">
            <Start filePaths={filePaths} setCancelled={setCancelled} />
          </div>
        </div>
      </Split>

      <Footer />
    </div>
  );
}
