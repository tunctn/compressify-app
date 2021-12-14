export const TYPES = {
  IMAGE: {
    JPEG: { KEY: "jpeg", VALUE: "JPEG" },
    JPG: { KEY: "jpg", VALUE: "JPG" },
    PNG: { KEY: "png", VALUE: "PNG" },
    GIF: { KEY: "gif", VALUE: "GIF" },
    TIFF: { KEY: "tiff", VALUE: "TIFF" },
    BMP: { KEY: "bmp", VALUE: "BMP" },
  },

  RAW: {
    NEF: { KEY: "nef", VALUE: "NEF" },
  },

  VIDEO: {
    AVI: { KEY: "avi", VALUE: "AVI" },
    MP4: { KEY: "mp4", VALUE: "MP4" },
    MKV: { KEY: "mkv", VALUE: "MKV" },
  },
};

export const SETTINGS = {
  OUTPUT: {
    DIR: {
      DEFAULT: "",
      NAME: "output-dir",
    },
    DEAL_WITH_DUPLICATE: {
      DEFAULT: true,
      NAME: "output-deal_with_duplicate",
    },
    DELETE_LOGS_AFTER_FINISHED: {
      DEFAULT: false,
      NAME: "output-delete_logs_after_finished",
    },
  },

  IMAGE: {
    ENABLED: {
      DEFAULT: true,
      NAME: "image-enabled",
    },
    QUALITY: {
      JPEG: {
        DEFAULT: 80,
        NAME: "image-jpeg_quality",
      },
      PNG: {
        DEFAULT: 60,
        NAME: "image-png_quality",
      },
      GIF: {
        DEFAULT: 30,
        NAME: "image-gif_quality",
      },
      TIFF: {
        DEFAULT: 20,
        NAME: "image-tiff_quality",
      },
      BMP: {
        DEFAULT: 70,
        NAME: "image-bmp_quality",
      },
    },
  },

  RAW: {
    ENABLED: {
      DEFAULT: true,
      NAME: "raw-enabled",
    },
    QUALITY: {
      DEFAULT: 40,
      NAME: "raw-quality",
    },
    CONVERT_TO: {
      DEFAULT: TYPES.IMAGE.JPEG,
      NAME: "raw-convert_to",
      OPTIONS: TYPES.IMAGE,
    },
  },

  VIDEO: {
    ENABLED: {
      DEFAULT: true,
      NAME: "video-enabled",
    },
    BITRATE: {
      DEFAULT: 4000,
      NAME: "video-bitrate",
    },
    CONVERT: {
      ENABLED: {
        DEFAULT: true,
        NAME: "video-convert-enabled",
      },
      TO: {
        DEFAULT: TYPES.VIDEO.MP4,
        NAME: "video-convert-to",
        OPTIONS: TYPES.VIDEO,
      },
    },
  },
};

export const SOCKET_URL = "http://localhost:7777";
