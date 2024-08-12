import { useState, useEffect } from "react";
import { handleSocket, SOCKET_EVENT } from "../Component/utils/socket";
import { STORAGE_KEY } from "../Component/utils/constant.js";
import { useClientID } from "../provider.js";

const loadChat = () => {
    const data = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
    return data;
}

const saveChat = (messages) => {
    return sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

const removeLoadChat = () => {
    return sessionStorage.removeItem(STORAGE_KEY);
}

const getUserName = () => {
    return sessionStorage.getItem("name") || "";
}


let socket;

export const useMessageLoader = () => {
    const [socketId, setSocketId] = useState();
    const [messages, setMessage] = useState(loadChat());
    const clientId = useClientID();

    useEffect(() => {
        socket = handleSocket((msg) => setMessage((prev) => [...prev, msg]));
        socket.on(SOCKET_EVENT.Connect, () => {
            setSocketId(socket.id);
        })
        socket.emit(SOCKET_EVENT.Joined, { user: getUserName() })
        return () => {
            socket.emit("desconnect");
            socket.off();

        }
    }, [])

    useEffect(() => {
        saveChat(messages);
    }, [messages])


    const sendMessage = (message) => {
        socket.emit(SOCKET_EVENT.Message, { message, id: socketId, clientId })
    }

    return [socketId, messages, sendMessage]
}