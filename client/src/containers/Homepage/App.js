import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Online from "../../components/Online/Index";
import ChatList from "../../components/Chatlist";
import { useSocket } from "../../use-socket";
import { SocketContext } from "../../socket-context";
import TopChat from "../../components/TopChat";
import MessageList from "../Message/MessageList";
import { getApi } from "../../Api";

export default function App() {
  // const socket = useSocket();
  const socket = "";
  const [profile, setProfile] = useState();
  const [userActive, setActive] = useState();

  useEffect(async () => {
    const res = await getApi("http://localhost:9999/api/profile");
    if (res.data && res.data.data) {
      setProfile(res.data.data);
    }
    socket.on("list-user", (data) => {
      console.log(data);
    });
    socket.on("server-message", (data) => {
      console.log(data);
    });
  }, []);
  const sendMessage = () => {
    socket.emit("message-client", { message: "socket in App component" });
  };
  console.log(userActive, "userActive");
  return (
    <SocketContext.Provider value={{ socket, profile, setActive }}>
      <div className="App">
        <div className="nav">
          <Header />
          <Online className="m-30" />
          <div className="over-scroll">
            <ChatList />
          </div>
        </div>
        <div className="list-message">
          <TopChat />
          <MessageList />
        </div>
      </div>
    </SocketContext.Provider>
  );
}
