import React, { useEffect, useState } from "react";
import Avatar from "../User/Avatar";
import { useSocket } from "../../use-socket";
import { SocketContext } from "../../socket-context";

import { getApi } from "../../Api";

export default function App() {
  const socket = useSocket();

  const [profile, setProfile] = useState();
  useEffect(async () => {
    console.log(socket.id, "client");
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
  return (
    <SocketContext.Provider value={{ socket, profile }}>
      <div className="App">
        <div className="nav">
          <Avatar />
        </div>
        <div className="list-mes">
          <div></div>
          <div>
            <input type="text" />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
        <div className="list-friends">list</div>
      </div>
    </SocketContext.Provider>
  );
}
