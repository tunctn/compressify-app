import Store from "electron-store";
const store = new Store();

import { SETTINGS } from "../../../renderer/contants";

export const getSetting = (obj) => {
  let stored = store.get(obj.NAME);

  if (typeof stored === "boolean") {
    if (`${stored}` === `false`) return false;
    else if (stored) return stored;
    else return obj.DEFAULT;
  } else {
    return stored || obj.DEFAULT;
  }
};

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
    image: {
      jpeg: getSetting(SETTINGS.IMAGE.QUALITY.JPEG),
      png: getSetting(SETTINGS.IMAGE.QUALITY.PNG),
      gif: getSetting(SETTINGS.IMAGE.QUALITY.GIF),
      tiff: getSetting(SETTINGS.IMAGE.QUALITY.TIFF),
    },
    raw: getSetting(SETTINGS.RAW.QUALITY),
    video: getSetting(SETTINGS.VIDEO.QUALITY),
  };

  // format type (extension)
  const convert = {
    raw: getSetting(SETTINGS.RAW.CONVERT_TO),
    video:
      getSetting(SETTINGS.VIDEO.CONVERT.ENABLED) &&
      getSetting(SETTINGS.VIDEO.CONVERT.TO),
  };

  const video_preset =
    getSetting(SETTINGS.VIDEO.PRESET) === "None"
      ? false
      : getSetting(SETTINGS.VIDEO.PRESET);

  const video_bitrate = getSetting(SETTINGS.VIDEO.BITRATE);

  const resize = {
    raw:
      getSetting(SETTINGS.RAW.RESIZE.ENABLED) &&
      getSetting(SETTINGS.RAW.RESIZE.MAX_WIDTH),
    image:
      getSetting(SETTINGS.IMAGE.RESIZE.ENABLED) &&
      getSetting(SETTINGS.IMAGE.RESIZE.MAX_WIDTH),
  };

  return {
    outputDir,
    isEnabled,
    quality,
    convert,
    resize,
    video_preset,
    video_bitrate,
  };
};
export default getSettings;
