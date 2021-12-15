import { app, ipcMain } from "electron";

const { once, EventEmitter } = require("events");

import serve from "electron-serve";
require("@electron/remote/main").initialize();

// helpers
import { startCompressing, createWindow } from "./helpers";

// // express
// const express = require("express");
// const expressApp = express();

// // cors
// const cors = require("cors");
// expressApp.use(cors({ origin: "*" }));

// // server
// const http = require("http");
// const server = http.createServer(expressApp);

// // socket io
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:8888", "app://.", "app://"],
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//     credentials: true,
//   },
//   transports: ["websocket", "polling", "flashsocket"],
// });
// export const ioApp = io;

// // init server
// expressApp.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

// // listen to server
// server.listen(7777, () => {
//   console.log("listening on *:7777");
// });

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

ipcMain.on("start", startCompressing);
ipcMain.setMaxListeners(5);

// ipcMain.on("invoke-compressing", (event, args) => {
//   // console.log(event, args);
//   // ipcMain.handle("start-compressing", startCompressing);
// });

// ipcMain.on("cancel-compresing", (event, arg) => {
//   // console.log(arg); // prints "ping"

//   event.returnValue = "pong";
// });
