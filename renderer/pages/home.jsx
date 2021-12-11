import Head from "next/head";
import { useEffect } from "react";

import FilesAndFolders from "../components/filesAndFolders";
import Footer from "../components/footer";
import Process from "../components/process";
import Settings from "../components/settings";
import Start from "../components/start";

export default function Home() {
  useEffect(() => {
    window.document.body.setAttribute("style", "-webkit-app-region: drag;");
  }, []);
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
            <FilesAndFolders />
          </div>
          <div className="process">
            <Process />
          </div>
        </div>
        <div className="right col">
          <div className="settings">
            <Settings />
          </div>
          <div className="start">
            <Start />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
