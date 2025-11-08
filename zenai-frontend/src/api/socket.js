import { io } from "socket.io-client";

const socket = io("ws://127.0.0.1:8000", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 3,
  timeout: 20000,
});

export default socket;
