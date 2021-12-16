export const TYPES = {
  IMAGE: {
    JPEG: { KEY: "jpeg", VALUE: "JPEG" },
    // JPG: { KEY: "jpg", VALUE: "JPG" },
    PNG: { KEY: "png", VALUE: "PNG" },
    // GIF: { KEY: "gif", VALUE: "GIF" },
    TIFF: { KEY: "tiff", VALUE: "TIFF" },
  },

  RAW: {
    NEF: { KEY: "nef", VALUE: "NEF" },
  },

  VIDEO: {
    AVI: { KEY: "avi", VALUE: "AVI" },
    MP4: { KEY: "mp4", VALUE: "MP4" },
    MKV: { KEY: "mkv", VALUE: "MKV" },
  },

  VIDEO_PRESETS: [
    { VALUE: "None", DESC: "" },
    // General
    // Very fast
    {
      VALUE: "Very Fast 1080p30",
      DESC: "Small H.264 video (up to 1080p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Very Fast 720p30",
      DESC: "Small H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Very Fast 576p25",
      DESC: "Small H.264 video (up to 576p25) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Very Fast 480p30",
      DESC: "Small H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container.",
    },
    // Fast
    {
      VALUE: "Fast 1080p30",
      DESC: "H.264 video (up to 1080p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Fast 720p30",
      DESC: "H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Fast 576p25",
      DESC: "H.264 video (up to 576p25) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Fast 480p30",
      DESC: "H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container.",
    },
    // HQ
    {
      VALUE: "HQ 1080p30 Surround",
      DESC: "High quality H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "HQ 720p30 Surround",
      DESC: "High quality H.264 video (up to 720p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "HQ 576p25 Surround",
      DESC: "High quality H.264 video (up to 576p25), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "HQ 480p30 Surround",
      DESC: "High quality H.264 video (up to 480p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    // Super HQ
    {
      VALUE: "Super HQ 1080p30 Surround",
      DESC: "Super high quality H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "Super HQ 720p30 Surround",
      DESC: "Super high quality H.264 video (up to 720p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "Super HQ 576p25 Surround",
      DESC: "Super high quality H.264 video (up to 576p25), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },
    {
      VALUE: "Super HQ 480p30 Surround",
      DESC: "Super high quality H.264 video (up to 480p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container.",
    },

    // WEB
    {
      VALUE: "Discord Nitro Large 3-6 Minutes 1080p30",
      DESC: "Encode up to 3 minutes of video in large size for Discord Nitro Classic (50 MB or less) or up to 6 minutes of video in large size for Discord Nitro (100 MB or less). H.264 video (up to 1080p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Discord Nitro Medium 5-10 Minutes 720p30",
      DESC: "Encode up to 5 minutes of video in large size for Discord Nitro Classic (50 MB or less) or up to 6 minutes of video in large size for Discord Nitro (100 MB or less). H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Discord Nitro Small 10-20 Minutes 480p",
      DESC: "Encode up to 10 minutes of video in large size for Discord Nitro Classic (50 MB or less) or up to 6 minutes of video in large size for Discord Nitro (100 MB or less). H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Discord Small 2 Minutes 360p30",
      DESC: "Encode up to 2 minutes of video in small size for Discord (8 MB or less). H.264 video (up to 360p30) and AAC mono audio, in an MP4 container.",
    },
    {
      VALUE: "Discord Tiny 5 Minutes 240p30",
      DESC: "Encode up to 5 minutes of video in tiny size for Discord (8 MB or less). H.264 video (up to 240p30) and AAC mono audio, in an MP4 container.",
    },
    {
      VALUE: "Gmail Large 3 Minutes 720p30",
      DESC: "Encode up to 3 minutes of video in large size for Gmail (25 MB or less). H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Gmail Medium 5 Minutes 480p30",
      DESC: "Encode up to 5 minutes of video in medium size for Gmail (25 MB or less). H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container.",
    },
    {
      VALUE: "Gmail Small 10 Minutes 288p30",
      DESC: "Encode up to 10 minutes of video in small size for Gmail (25 MB or less). H.264 video (up to 288p30) and AAC mono audio, in an MP4 container.",
    },
    {
      VALUE: "Vimeo YouTube HQ 2160p60 4K",
      DESC: "High quality H.264 video (up to 2160p60) and high bit rate AAC stereo audio in an MP4 container. Compatible with video hosting services supporting 4K video, such as Vimeo and YouTube.",
    },
    {
      VALUE: "Vimeo YouTube HQ 1440p60 2.5K",
      DESC: "High quality H.264 video (up to 1440p60) and high bit rate AAC stereo audio in an MP4 container. Compatible with videohosting services supporting 2.5K video, such as Vimeo and YouTube.",
    },
    {
      VALUE: "Vimeo YouTube HQ 1080p60",
      DESC: "High quality H.264 video (up to 1080p60) and high bit rate AAC stereo audio in an MP4 container. Compatible with video hosting services supporting 1080p60, such as Vimeo and YouTube.",
    },
    {
      VALUE: "Vimeo YouTube HQ 720p60",
      DESC: "High quality H.264 video (up to 720p60) and high bit rate AAC stereo audio in an MP4 container. Compatible with video hosting services supporting 720p60, such as Vimeo and YouTube.",
    },
    {
      VALUE: "Vimeo YouTube 720p30",
      DESC: "H.264 video (up to 720p30) and high bit rate AAC stereo audio in an MP4 container. Compatible with most video hosting services, such as Vimeo and YouTube.",
    },

    // DEVICES
    {
      VALUE: "Android 1080p30",
      DESC: "H.264 video (up to 1080p30) and AAC stereo audio, in an MP4 container. Compatible with Android devices.",
    },
    {
      VALUE: "Android 720p30",
      DESC: "H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container. Compatible with Android devices.",
    },

    {
      VALUE: "Android 576p25",
      DESC: "H.264 video (up to 576p25) and AAC stereo audio, in an MP4 container. Compatible with Android devices.",
    },
    {
      VALUE: "Android 480p30",
      DESC: "H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container. Compatible with Android devices.",
    },
    {
      VALUE: "Apple 2160p60 4K HEVC Surround",
      DESC: "H.265 video (up to 2160p60), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Apple iPhone 7, 7 Plus, 8, 8 Plus, X, XR, XS, XS Max; Apple TV 4K.",
    },
    {
      VALUE: "Apple 1080p60 Surround",
      DESC: "H.264 video (up to 1080p60), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Apple iPad 5th and 6th Generation; iPad mini 2, 3, and 4; iPad Air 1st Generation and Air 2; iPad Pro 1st, 2nd, and 3rd Generation; Apple TV 4th Generation and later.",
    },
    {
      VALUE: "Apple 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Apple iPhone 5, 5s, SE, 6, 6 Plus, 6s, 6s Plus, and later; iPod touch 6th Generation; iPad 3rd, 4th Generation and later; iPad mini 1st Generation and later; Apple TV 3rd, 4th Generation and later.",
    },
    {
      VALUE: "Apple 720p30 Surround",
      DESC: "H.264 video (up to 720p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Apple iPhone 4, 4S, and later; iPod touch 4th, 5th Generation and later; iPad 1st Generation, iPad 2, and later; Apple TV 2nd Generation and later.",
    },
    {
      VALUE: "Apple 540p30 Surround",
      DESC: "H.264 video (up to 540p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Apple iPhone 1st Generation, 3G, 3GS, and later; iPod touch 1st, 2nd, 3rd Generation and later; iPod Classic; Apple TV 1st Generation and later.",
    },
    {
      VALUE: "Apple 240p30",
      DESC: "H.264 video (up to 240p30) and AAC stereo audio, in an MP4 container. Compatible with Apple iPod 5th Generation and later.",
    },
    {
      VALUE: "Chromecast 2160p60 4K HEVC Surround",
      DESC: "H.265 video (up to 2160p60), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Google Chromecast Ultra.",
    },
    {
      VALUE: "Chromecast 1080p60 Surround",
      DESC: "H.264 video (up to 1080p60), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Google Chromecast 3rd Generation.",
    },
    {
      VALUE: "Chromecast 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Google Chromecast 1st, 2nd Generation and later.",
    },
    {
      VALUE: "Amazon Fire 2160p60 4K HEVC Surround",
      DESC: "H.265 video (up to 2160p60), AAC stereo audio, and Dolby Digital (AC-3) audio, in an MP4 container. Compatible with Amazon Fire TV 2nd Generation and later; Fire TV Cube, Fire TV Stick 4K.",
    },
    {
      VALUE: "Amazon Fire 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) audio, in an MP4 container. Compatible with Amazon Fire TV 1st Generation and later; Fire TV Stick 1st Generation and later; Fire HD 10 7th Generation (2017); Fire HDX 4th Generation (2014).",
    },
    {
      VALUE: "Amazon Fire 720p30",
      DESC: "H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container. Compatible with Amazon Fire HD 4th Generation (2014) and later; Kindle Fire HDX 3rd Generation (2013); Kindle Fire HD 2nd Generation (2012) and later.",
    },
    {
      VALUE: "Playstation 2160p60 4K Surround",
      DESC: "H.264 video (up to 2160p60), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Playstation 4 Pro.",
    },
    {
      VALUE: "Playstation 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Playstation 3 and 4.",
    },
    {
      VALUE: "Playstation 720p30",
      DESC: "H.264 video (up to 720p30) and AAC stereo audio, in an MP4 container. Compatible with Playstation Vita TV.",
    },
    {
      VALUE: "Playstation 540p30",
      DESC: "H.264 video (up to 540p30) and AAC stereo audio, in an MP4 container. Compatible with Playstation Vita.",
    },
    {
      VALUE: "Roku 2160p60 4K HEVC Surround",
      DESC: "H.265 video (up to 2160p60), AAC stereo audio, and surround audio, in an MKV container. Compatible with Roku 4, Streaming Stick+, Premiere+, and Ultra.",
    },
    {
      VALUE: "Roku 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Roku 1080p models.",
    },
    {
      VALUE: "Roku 720p30 Surround",
      DESC: "H.264 video (up to 720p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Roku 720p models.",
    },
    {
      VALUE: "Roku 576p25",
      DESC: "H.264 video (up to 576p25) and AAC stereo audio, in an MP4 container. Compatible with Roku standard definition models.",
    },
    {
      VALUE: "Roku 480p30",
      DESC: "H.264 video (up to 480p30) and AAC stereo audio, in an MP4 container. Compatible with Roku standard definition models.",
    },
    {
      VALUE: "Xbox 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Xbox One.",
    },
    {
      VALUE: "Xbox Legacy 1080p30 Surround",
      DESC: "H.264 video (up to 1080p30), AAC stereo audio, and Dolby Digital (AC-3) surround audio, in an MP4 container. Compatible with Xbox 360.",
    },
    {
      VALUE: "H.265 MKV 2160p60",
      DESC: "H.265 video (up to 2160p60) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.265 MKV 1080p30",
      DESC: "H.265 video (up to 1080p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.265 MKV 720p30",
      DESC: "H.265 video (up to 720p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.265 MKV 576p25",
      DESC: "H.265 video (up to 576p25) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.265 MKV 480p30",
      DESC: "H.265 video (up to 480p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.264 MKV 2160p60",
      DESC: "H.264 video (up to 2160p60) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.264 MKV 1080p30",
      DESC: "H.264 video (up to 1080p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.264 MKV 720p30",
      DESC: "H.264 video (up to 720p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.264 MKV 576p25",
      DESC: "H.264 video (up to 576p25) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "H.264 MKV 480p30",
      DESC: "H.264 video (up to 480p30) and AAC stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP9 MKV 2160p60",
      DESC: "VP9 video (up to 2160p60) and Opus stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP9 MKV 1080p30",
      DESC: "VP9 video (up to 1080p30) and Opus stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP9 MKV 720p30",
      DESC: "VP9 video (up to 720p30) and Opus stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP9 MKV 576p25",
      DESC: "VP9 video (up to 576p25) and Opus stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP9 MKV 480p30",
      DESC: "VP9 video (up to 480p30) and Opus stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP8 MKV 1080p30",
      DESC: "VP8 video (up to 1080p30) and Vorbis stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP8 MKV 720p30",
      DESC: "VP8 video (up to 720p30) and Vorbis stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP8 MKV 576p25",
      DESC: "VP8 video (up to 576p25) and Vorbis stereo audio, in an MKV container.",
    },
    {
      VALUE: "VP8 MKV 480p30",
      DESC: "VP8 video (up to 480p30) and Vorbis stereo audio, in an MKV container.",
    },
    {
      VALUE: "Production Max",
      DESC: "Maximum bit rate, constant frame rate H.264 video and high bit rate AAC stereo audio in an MP4 container. For professional use as an intermediate format for video editing. Creates gigantic files.",
    },
    {
      VALUE: "Production Standard",
      DESC: "High bit rate, constant frame rate H.264 video and high bit rate AAC stereo audio in an MP4 container. For professional use as an intermediate format for video editing. Creates very large files.",
    },
    {
      VALUE: "Production Proxy 1080p",
      DESC: "Intra-only, constant frame rate H.264 video (up to 1080p) and high bit rate AAC stereo audio in an MP4 container. For professional use as a low resolution proxy format for video editing.",
    },
    {
      VALUE: "Production Proxy 540p",
      DESC: "Intra-only, constant frame rate H.264 video (up to 540p) and high bit rate AAC stereo audio in an MP4 container. For professional use as a low resolution proxy format for video editing.",
    },
  ],
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
    RESIZE: {
      ENABLED: {
        DEFAULT: true,
        NAME: "image-resize-enabled",
      },
      MAX_WIDTH: {
        DEFAULT: 1920,
        NAME: "image-resize-max_width",
      },
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
    RESIZE: {
      ENABLED: {
        DEFAULT: true,
        NAME: "raw-resize-enabled",
      },
      MAX_WIDTH: {
        DEFAULT: 1920,
        NAME: "raw-resize-max_width",
      },
    },
    CONVERT_TO: {
      DEFAULT: TYPES.IMAGE.TIFF,
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
    QUALITY: {
      DEFAULT: 80,
      NAME: "video-quality",
    },
    CONVERT: {
      ENABLED: {
        DEFAULT: true,
        NAME: "video-convert-enabled",
      },
      TO: {
        DEFAULT: TYPES.VIDEO.MKV,
        NAME: "video-convert-to",
        OPTIONS: TYPES.VIDEO,
      },
    },
    PRESET: {
      DEFAULT: "H.265 MKV 1080p30",
      NAME: "video-preset",
      OPTIONS: TYPES.VIDEO_PRESETS,
    },
  },
};

export const SOCKET_URL = "http://localhost:7777";
