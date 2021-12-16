import "../styles/globals.scss";

import dayjs from "dayjs";
let customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
