import { useState, useEffect } from "react";
import { shell } from "electron";

import s from "./footer.module.scss";
const Footer = () => {
  const [version, setVersion] = useState("");
  useEffect(() => setVersion(window?.appVersion), []);

  const handleExternal = (link) => shell.openExternal(link);

  return (
    <footer className={s.footer}>
      <div>v{version} 12/12/2021</div>
      <div>
        {" "}
        <button
          className="link reset-button"
          onClick={() => handleExternal("https://tunc.co/apps/compressify")}
        >
          Compressify.app
        </button>
        - 2021
      </div>
      <div>
        <button
          className="link reset-button"
          onClick={() => handleExternal("https://tunc.co/s/twitter")}
        >
          @tunctn_
        </button>
      </div>
    </footer>
  );
};

export default Footer;
