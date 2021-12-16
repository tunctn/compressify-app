import Head from "next/head";
import { useState } from "react";
import FilesAndFolders from "../components/filesAndFolders";
import Footer from "../components/footer";
import Progress from "../components/progress";
import Settings from "../components/settings";
import Start from "../components/start";

import Split from "react-split";

// const defaultFiles = [
//   "/Users/tuncturkmen/Desktop/test",
//   "/Users/tuncturkmen/Desktop/test/avi.AVI",
//   "/Users/tuncturkmen/Desktop/test/jpg.JPG",
//   "/Users/tuncturkmen/Desktop/test/nef.NEF",
//   "/Users/tuncturkmen/Desktop/test/png.png",
//   "/Users/tuncturkmen/Desktop/untitled folder",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/IMG_3373.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/1/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/4/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/abc/2/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2 2/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/3 2 2 2/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/3 2/IMG_3373 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 3.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 4.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 5.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 6.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 7.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy 8.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2 copy.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 2.JPG",
//   "/Users/tuncturkmen/Desktop/untitled folder/def/3/IMG_3373 copy 2.JPG",
// ];

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
