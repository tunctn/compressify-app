import { useState, useEffect } from "react";
import Head from "next/head";

import { useDropzone } from "react-dropzone";
import axios from "axios";

import Cookies from "js-cookie";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const handleZip = async (files, name, renameAs, setLoading) => {
  setLoading(true);
  let zip = new JSZip();

  files.forEach((file, index) => {
    const type = file.format;
    let name = renameAs ? `${renameAs}-${index + 1}.${type}` : file.filename;

    let ogname = file.originalname;
    let relativepath = file.webkitRelativePath;
    let foldername = relativepath.replace(`/${ogname}`, "");
    let folder = zip.folder(foldername);

    const fileData = b64toBlob(file.base64, type);
    folder.file(name, fileData);
  });

  zip
    .generateAsync({ type: "blob" })
    .then(function (content) {
      // see FileSaver.js
      saveAs(content, name ? `${name}.zip` : "compressed.zip");
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};

const handleCookies = (name, val) => {
  if (val) Cookies.set(name, val);
  else Cookies.remove(name);
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [compressing, setCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [totalSizes, setTotalSizes] = useState({
    original: 0,
    compressed: 0,
  });
  const [selectByFolder, setSelectByFolder] = useState(false);
  const [corrupted, setCorrupted] = useState(0);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*, video/*",
  });

  const [files, setFiles] = useState([]);
  const [zipLoading, setZipLoading] = useState(false);

  const handleClear = () => {
    setCompressed(false);
    setCompressedFiles([]);
    setCompressing(false);
    setProgress(0);
    setZipLoading(false);
    setCorrupted(0);
    setTotalSizes({
      original: 0,
      compressed: 0,
    });
    setFiles([]);
  };

  useEffect(() => {
    handleClear();
    if (acceptedFiles) {
      let totalSize = 0;
      acceptedFiles.forEach((file) => (totalSize += file.size));
      setFiles(acceptedFiles);
      setTotalSizes({ compressed: 0, original: totalSize });
    }
  }, [acceptedFiles]);

  const [approxSeconds, setApproxSeconds] = useState(0);
  const doResize = async () => {
    setCompressing(true);
    setCompressedFiles([]);
    setApproxSeconds(0);
    setProgress(0);
    setCorrupted(0);
    setCompressed(false);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const promises = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("images", file);

      return await axios
        .post(
          `http://localhost:8889/compress?relativePath=${file.webkitRelativePath}`,
          // formData,
          config
        )
        .then((r) => {
          setProgress((progress) => progress + 1);
          return r.data;
        })
        .catch((err) => err);
    });

    let files = await Promise.all(promises).then((res) => res);
    files = files.filter((file) => file);

    const corrupted = acceptedFiles.length - files.length;
    setCorrupted(corrupted);

    let totalSize = 0;
    files.forEach((file) => (totalSize += file.size));
    setTotalSizes((t) => ({ original: t.original, compressed: totalSize }));

    setCompressedFiles(files);
    setCompressing(false);
    setCompressed(true);
    return;
  };

  const compressionProgress = `${(progress / files.length) * 100}`;
  const compressionProgressInt = Math.floor(parseInt(compressionProgress));
  const dynamicApproxSeconds =
    approxSeconds - (compressionProgressInt * approxSeconds) / 100;

  const [name, setName] = useState(
    Cookies.get("name") || dayjs().format("YYYY-MM-DD") + "-compressed"
  );
  const [renameAs, setRenameAs] = useState(Cookies.get("renameAs") || "");
  const handleSave = () => {
    handleCookies("name", name);
    handleCookies("renameAs", renameAs);

    handleZip(
      compressedFiles,
      name || dayjs().format("YYYY-MM-DD") + "-compressed",
      renameAs,
      setZipLoading
    );
  };

  const totalCompressed = acceptedFiles.length - corrupted;

  return (
    <div className="container">
      <Head>
        <title>Bulk Image Compressor</title>
        <meta name="description" content="Created by https://tunc.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main */}
      <main>
        {/* Header */}
        <div className="header">
          <h1>Bulk Image Compressor</h1>
          <p>
            This is a small project for compressing a bunch of images without
            uploading to a server (meaning all your data stays on your
            computer).
          </p>
        </div>

        {/* Form */}
        <form className="form">
          <div className="formRow">
            <div className="formGroup checkboxGroup">
              <input
                className="checkbox"
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                onChange={(e) => setSelectByFolder(!selectByFolder)}
                value={selectByFolder}
              />
              <label className="label" htmlFor="vehicle3">
                Select by folder
              </label>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="zip-name" className="label">
                Folder name
              </label>
              <input
                className="input"
                type="text"
                value={name}
                placeholder={dayjs().format("YYYY-MM-DD") + "-compressed"}
                id="zip-name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="rename-as" className="label">
                Rename files as (optional)
              </label>
              <input
                className="input"
                type="text"
                value={renameAs}
                id="rename-as"
                onChange={(e) => setRenameAs(e.target.value)}
              />
              <small className="inputInfo">
                Empty means keep the originals
              </small>
            </div>
          </div>
        </form>

        {/* Dropzone */}
        <div className="dropzoneHolder">
          <div
            className="dropzone"
            {...getRootProps({ className: "dropzone" })}
          >
            <input
              {...getInputProps()}
              {...(selectByFolder && { webkitdirectory: "true" })}
            />
            {files ? (
              <p>
                {files.length} files, total size:{" "}
                {(totalSizes.original / 1024 / 1024).toFixed(2)} MB
              </p>
            ) : (
              <p>
                Drag and drop some files here or you can click to select files
              </p>
            )}
          </div>
          <button
            className="clearButton"
            onClick={handleClear}
            hidden={files.length === 0}
          >
            {compressed ? "Reset" : "Clear"}
          </button>
        </div>

        {/* Buttons */}
        <div className="startArea">
          <button
            className="start"
            onClick={compressed ? handleSave : doResize}
            disabled={compressing || files.length === 0}
          >
            {compressed
              ? zipLoading
                ? "Preparing zip"
                : `Get zip (${totalCompressed} files, ${(
                    totalSizes.compressed /
                    1024 /
                    1024
                  ).toFixed(2)} MB)`
              : compressing
              ? `${Math.floor(compressionProgress)}%`
              : `Compress images`}
          </button>

          {(compressing || compressed) && (
            <>
              <progress
                className="progress"
                value={compressed ? 100 : compressionProgress}
                max={100}
              ></progress>
              <div className="compressionProgress">
                <div>
                  {progress} / {files.length} files
                  <br />
                  <small>
                    {corrupted > 0 &&
                      `${corrupted} file${
                        corrupted > 1 ? "s" : ""
                      } couldn't get compressed.`}
                  </small>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info */}
        {compressed && (
          <div className="compressedInfo">
            <div className="totalDecrease">
              Total size is{" "}
              {(
                100 -
                (totalSizes.compressed / totalSizes.original) * 100
              ).toFixed(2)}
              % smaller (-
              {(
                (totalSizes.original - totalSizes.compressed) /
                1024 /
                1024
              ).toFixed(2)}{" "}
              MB )
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="created">
          Created by{" "}
          <a
            href="https://twitter.com/tunctn_"
            target="_blank"
            rel="noopener noreferrer"
          >
            tunctn_
          </a>
        </div>
        <small className="footersmall">
          Please use it at your own risk, this is a hobby project and {`I'm`}{" "}
          not responsible from lost data.
        </small>
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        #__next {
          height: inherit;
        }

        body {
          background: var(--colors-gray1);

          -webkit-font-smoothing: antialiased;
          color: rgba(255, 255, 255, 0.68);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        a {
          color: white;
        }

        a {
          color: white;
          border-bottom: 1px solid var(--colors-gray6);
          font-weight: 500;
          padding-bottom: 4px;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        button {
          color: white;
          background: var(--colors-gray1);
          border: 1px solid var(--colors-gray5);
          width: 100%;
          padding: 20px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover:not(:disabled) {
          background: var(--colors-gray2);
        }
        button:disabled {
          color: rgba(255, 255, 255, 0.3) !important;
          cursor: not-allowed;
        }
        button:focus {
          outline: none;
        }
        button:focus-visible {
          box-shadow: 0 0 0 2px var(--colors-gray4);
        }

        .low-opacity {
          opacity: 0.5;
        }
        .container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          min-height: 100%;
          flex-direction: column;
          justify-content: space-between;
        }

        .header {
          text-align: left;
        }

        .small {
          opacity: 0.5;
          margin-top: 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .formRow {
          display: flex;
          gap: 8px;
        }

        .formGroup {
          flex: 1;
          text-align: left;
          margin-bottom: 10px;
        }

        .checkboxGroup {
          display: flex;
          flex-direction: row;
          justify-content: start;
        }

        .label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .inputInfo {
          font-size: 13px;
          opacity: 0.5;
        }

        .input {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid var(--colors-gray5);
          border-radius: 4px;
          color: white;
          background: var(--colors-gray1);
        }

        .input:focus {
          outline: none;
        }

        .input:focus-visible {
          background: var(--colors-gray2);
          box-shadow: 0 0 0 2px var(--colors-gray4);
        }

        .dropzone {
          margin-bottom: 20px;
          height: 200px;
          padding: 20px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border: 1px solid var(--colors-gray5);
          cursor: pointer;
        }
        .dropzone:hover {
          background: var(--colors-gray2);
        }

        .startArea {
          position: relative;
        }

        .progress {
          /* Reset the default appearance */
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;

          /* Get rid of default border in Firefox. */
          border: none;

          z-index: 1;
          display: block;
          position: absolute;

          width: calc(100% - 2px);
          margin-top: -3px;
          margin-left: 1px;
          height: 2px;
        }

        .progress[value]::-webkit-progress-bar {
          background-color: var(--colors-gray3);
          border-radius: 0 0 4px 4px;
        }

        .progress[value]::-webkit-progress-value {
          background-color: rgb(65, 116, 67);
          border-radius: 0 0 4px 4px;
        }

        .compressionProgress {
          margin-top: 10px;
          font-size: 13px;
        }

        .dropzoneHolder {
          position: relative;
        }
        .clearButton {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: max-content;
          padding: 6px 12px;
        }

        .compressedInfo {
          margin-top: 20px;
          font-size: 16px;
        }

        .compressedInfoGroup {
          margin-top: 10px;
        }

        .totalDecrease {
          color: rgb(76, 177, 104);
          font-weight: 600;
        }

        .footer {
          text-align: left;
          margin-top: 50px;
        }

        .created {
          font-size: 13px;
          margin-bottom: 20px;
        }

        .approxTime {
          font-size: 12px;
          margin-top: 10px;
        }

        .footersmall {
          font-size: 12px;
          opacity: 0.5;
        }

        :root {
          --colors-gray1: hsl(0 0% 8.5%);
          --colors-gray2: hsl(0 0% 11%);
          --colors-gray3: hsl(0 0% 13.6%);
          --colors-gray4: hsl(0 0% 15.8%);
          --colors-gray5: hsl(0 0% 17.9%);
          --colors-gray6: hsl(0 0% 20.5%);
          --colors-gray7: hsl(0 0% 24.3%);
          --colors-gray8: hsl(0 0% 31.2%);
          --colors-gray9: hsl(0 0% 43.9%);
          --colors-gray10: hsl(0 0% 49.4%);
          --colors-gray11: hsl(0 0% 62.8%);
          --colors-gray12: hsl(0 0% 93%);
          --colors-blue1: hsl(212 35% 9.2%);
          --colors-blue2: hsl(216 50% 11.8%);
          --colors-blue3: hsl(214 59.4% 15.3%);
          --colors-blue4: hsl(214 65.8% 17.9%);
          --colors-blue5: hsl(213 71.2% 20.2%);
          --colors-blue6: hsl(212 77.4% 23.1%);
          --colors-blue7: hsl(211 85.1% 27.4%);
          --colors-blue8: hsl(211 89.7% 34.1%);
          --colors-blue9: hsl(206 100% 50%);
          --colors-blue10: hsl(209 100% 60.6%);
          --colors-blue11: hsl(210 100% 66.1%);
          --colors-blue12: hsl(206 98% 95.8%);
          --colors-bg: #000;
          --colors-lowContrast: black;
          --colors-highContrast: white;
        }
      `}</style>
    </div>
  );
}
