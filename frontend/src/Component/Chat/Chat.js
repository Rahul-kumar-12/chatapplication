// import React, { useEffect, useState } from "react";
import "./chat.css";
// import { user } from "../Join/Join.js";
// import socketIO from "socket.io-client";
import Message from "../../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useMessageLoader } from "../../hooks/useMessageLoader";
import { useClientID } from "../../provider";
// import { handleSocket, SOCKET_EVENT } from "../utils/socket";
// let socket;
// const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  // const [id, setId] = useState("");
  // const [comon, setComon] = useState([]);
  // const user = localStorage.getItem("name");
  const [id, message, sendMessage] = useMessageLoader();
  const clientId = useClientID();

  console.log("message...", message)
  // const message = []
  // const sendMessage = () => { }
  // const id = 1;

  const send = (e) => {
    const message = document.getElementById("chatInput").value;
    sendMessage(message);
    document.getElementById("chatInput").value = "";
  };

  // useEffect(() => {

  //   const handleBeforeUnload = () => {
  //     localStorage.setItem('userMessage', comon);
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };

  // }, [comon])



  // useEffect(() => {
  // socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  // socket.on("connect", () => {
  //   setId(socket.id);
  // });

  // socket.emit("joined", { user });

  // socket.on("welcome", (data) => {
  //   setComon([...comon, data]);
  // });
  // socket.on("userjoined", (data) => {
  //   setComon([...comon, data]);

  // });

  // socket.on("leave", (data) => {
  //   setComon([...comon, data]);

  // });

  //   socket = handleSocket((data) => console.log("Hello,..", data));
  //   setId(socket.id);
  //   socket.emit(SOCKET_EVENT.Joined, { user });

  //   return () => {
  //     socket.emit("desconnect");
  //     socket.off();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("sendMessage", (data) => {
  //     setComon([...comon, data]);

  //   });
  //   return () => {
  //     socket.off();
  //   }
  // }, [comon]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <img src="./Images/Robot.png" alt="" />
          <span style={{ color: "white", fontWeight: "600" }}>Chat Application</span>
          <a href="/" className="join-new"><button className="add-btn" style={{ width: "max-content" }}>
            Add user
          </button> </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {
            message?.map((item, i) => <Message key={i} message={item.message} user={item.id === id ? '' : item.user} classs={item.clientId === clientId ? ' right' : 'left'}
              classes={item?.clientId === clientId ? 'message-sect' : "message-sectt"}
            />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            // onKeyDown={(e) => send(e)} 
            type="text" id="chatInput" placeholder="typing here" />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
