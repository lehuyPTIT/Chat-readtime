import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header";
import Online from "../../components/Online/Index";
import ChatList from "../../components/Chatlist";
import { useSocket } from "../../use-socket";
import { SocketContext } from "../../socket-context";
import TopChat from "../../components/TopChat";
import MessageList from "../Message/MessageList";
import SendMessage from "../../components/SendMessage/SendMessage";
import { getApi, getListMessApi } from "../../Api";

export default function App() {
  const socket = useSocket();
  const [profile, setProfile] = useState();
  const [friends, setFriends] = useState([]);
  const [userActive, setActive] = useState();
  const [listMess, setListMess] = useState();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await getApi(`http://localhost:9999/api/profile`);
      if (res.data && res.data.data) {
        setProfile(res.data.data);
        setFriends(res.data.data.friendsList);
        setActive(res.data.data.friendsList[0]._id);
      }
    }
    socket.on("friends", (friends) => {
      fetchData();
    });
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await getListMessApi(
        `http://localhost:9999/api/getListMess/${userActive}`
      );
      if (res.data && res.data.data) {
        setListMess(res.data.data);
      }
    }
    if (userActive) fetchData();
  }, [userActive]);

  useEffect(() => {
    socket.on("new-message", (message) => {
      setListMess((listMess) => [message, ...listMess]);
    });
  }, []);
  const onSendMessage = (message) => {
    const newMessage = {
      receiver: userActive,
      message: message,
      socket: socket.id,
      sender: profile._id,
      createdAt: new Date(),
    };
    socket.emit("new-message", newMessage);
    setListMess((listMess) => [newMessage, ...listMess]);
  };
  console.log("render");
  return (
    <SocketContext.Provider value={{ socket, profile, userActive, setActive }}>
      <div className="App">
        <div className="nav">
          <Header />
          <Online />
          <div className="over-scroll">
            <ChatList profile={profile} friends={friends} />
          </div>
        </div>
        <div className="list-message">
          <TopChat />
          <MessageList listMess={listMess} userActive={userActive} />
          <SendMessage onSendMessage={onSendMessage} />
        </div>
      </div>
    </SocketContext.Provider>
  );
}
