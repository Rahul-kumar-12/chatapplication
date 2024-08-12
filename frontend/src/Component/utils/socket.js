import socketIO from "socket.io-client";
import { ENDPOINT } from "../utils/constant"

export const SOCKET_EVENT = {
    Connect: "connect",
    Joined: "joined",
    Welcome: "welcome",
    UserJoined: "userjoined",
    Leave: "leave",
    SendMessage: "sendMessage",
    Message: "message"
}

let socket;

export const handleSocket = (callback) => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on(SOCKET_EVENT.Welcome, (data) => callback(data));
    socket.on(SOCKET_EVENT.UserJoined, (data) => callback(data));
    socket.on(SOCKET_EVENT.Leave, (data) => callback(data));
    socket.on(SOCKET_EVENT.SendMessage, (data) => callback(data));
    return socket;
}
