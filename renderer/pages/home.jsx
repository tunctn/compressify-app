import { useState, useEffect } from "react";
import Head from "next/head";

import axios from "axios";
import dayjs from "dayjs";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Bulk Image Compressor</title>
        <meta name="description" content="Created by https://tunc.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="left"></div>
        <input type="file" multiple={true} webkitDirectory={true} />
      </main>

      <footer></footer>

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
