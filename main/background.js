import { app, ipcMain } from "electron";
import serve from "electron-serve";
require("@electron/remote/main").initialize();

// helpers
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";
if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

export let mainWindow;

app.on("ready", () => {
  mainWindow = createWindow("main", {
    width: 770,
    height: 720,
    minWidth: 770,
    minHeight: 720,
    show: false, // for splash screen
  });

  if (isProd) {
    mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});

app.on("window-all-closed", () => app.quit());

ipcMain.setMaxListeners(5);
