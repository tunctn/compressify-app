import { createContext } from "react";
import socketio from "socket.io-client";
import { SOCKET_URL } from "../contants";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
