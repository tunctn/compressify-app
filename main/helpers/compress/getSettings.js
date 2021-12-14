import Store from "electron-store";
const store = new Store();

import { SETTINGS } from "../../../renderer/contants";
export const getSetting = (obj) => store.get(obj.NAME) || obj.DEFAULT;

const getSettings = () => {
  // output directory
  const outputDir = getSetting(SETTINGS.OUTPUT.DIR);

  // if the media type will be compressed
  const isEnabled = {
    image: getSetting(SETTINGS.IMAGE.ENABLED),
    raw: getSetting(SETTINGS.RAW.ENABLED),
    video: getSetting(SETTINGS.VIDEO.ENABLED),
  };

  // decide the quality
  const quality = {
    image: () =>
      Object.entries(SETTINGS.IMAGE.QUALITY).map(([key, val]) => {
        return { key: getSetting(val) };
      }),
    raw: getSetting(SETTINGS.RAW.QUALITY),
    video: getSetting(SETTINGS.VIDEO.BITRATE),
  };

  // format type (extension)
  const convert = {
    raw: getSetting(SETTINGS.RAW.CONVERT_TO),
    video:
      getSetting(SETTINGS.VIDEO.CONVERT.ENABLED) &&
      getSetting(SETTINGS.VIDEO.CONVERT.TO),
  };

  return { outputDir, isEnabled, quality, convert };
};
export default getSettings;
