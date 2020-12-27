import React, { useEffect, useState } from "react";
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
  const [userActive, setActive] = useState();
  const [listMess, setListMess] = useState();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await getApi(`http://localhost:9999/api/profile`);
      if (res.data && res.data.data) {
        setProfile(res.data.data);
      }
    }
    fetchData();
  }, []);
  useEffect(async () => {
    async function fetchData() {
      // You can await here
      const res = await getListMessApi(
        `http://localhost:9999/api/getListMess/${userActive}`
      );
      if (res.data && res.data.data) {
        setListMess(res.data.data);
      }
    }
    fetchData();
  }, [userActive]);
  return (
    <SocketContext.Provider value={{ socket, profile, userActive, setActive }}>
      <div className="App">
        <div className="nav">
          <Header />
          <Online />
          <div className="over-scroll">
            <ChatList profile={profile} />
          </div>
        </div>
        <div className="list-message">
          <TopChat />
          <MessageList />
          <SendMessage />
        </div>
      </div>
    </SocketContext.Provider>
  );
}
