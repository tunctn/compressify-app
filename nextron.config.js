const path = require("path");

module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  mainSrcDir: "main",
  // specify an alternate renderer src directory, defaults to 'renderer'
  rendererSrcDir: "renderer",
  // sassOptions: {
  //   includePaths: [path.join(__dirname || "", "styles")],
  // },

  // main process' webpack config
  webpack: (config, env) => {
    // do some stuff here
    config.output.globalObject = "this";

    Object.assign(config, {
      entry: {
        background: "./main/background.js",
        preload: "./main/preload.js",
        splash: "./main/splash.js",
      },
    });

    return config;
  },
};
