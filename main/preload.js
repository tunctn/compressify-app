const { dialog, app } = require("@electron/remote");

window.Electron = {};
window.Electron.dialog = dialog;
window.appVersion = app.getVersion();
