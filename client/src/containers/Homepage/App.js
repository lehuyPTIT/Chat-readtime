import React, { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header";
import Online from "../../components/Online/Index";
import ChatList from "../../components/Chatlist";
import { useSocket } from "../../use-socket";
import { SocketContext } from "../../socket-context";
import TopChat from "../../components/TopChat";
import MessageList from "../Message/MessageList";
import SendMessage from "../../components/SendMessage/SendMessage";
import { getProfileApi, getListMessApi } from "../../Api";
import Search from "../../components/Constanst/Search";
import { SnackbarProvider } from "notistack";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
    const socket = useSocket();
    const [profile, setProfile] = useState();
    const [friends, setFriends] = useState([]);
    const [userActive, setActive] = useState();
    const [listMess, setListMess] = useState();
    const [profileUserActive, setProfileUserActive] = useState(null);
    const [loading, setLoading] = useState(false);
    const [datasearch, setDataSearch] = React.useState([]);
    async function fetchData() {
        // You can await here
        const res = await getProfileApi("/api/profile");
        if (res.data && res.data.data) {
            setProfile(res.data.data);
            setFriends(res.data.data.friendsList);
            setDataSearch(res.data.data.friendsList);
            if (res.data.data.friendsList[0])
                setActive(res.data.data.friendsList[0]._id);
        }
    }
    useEffect(() => {
        socket.on("friends", (friends) => {
            fetchData();
        });
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await getListMessApi(`/api/getListMess/${userActive}`);
            console.log("AAAAAA");
            setLoading(false);
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
    const onSearch = (name) => {
        const searchFriends = friends.filter((user) => {
            return user.fullname.indexOf(name) !== -1;
        });
        console.log(searchFriends, "ffff");
        setDataSearch(searchFriends);
    };
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            variant="success"
            autoHideDuration={2000}
        >
            <SocketContext.Provider
                value={{
                    socket,
                    profile,
                    userActive,
                    setActive,
                    fetchData,
                    setProfileUserActive,
                }}
            >
                <div className="App">
                    <div className="nav">
                        <Header />
                        <div style={{ margin: "0 10px" }}>
                            <Search onSubmit={onSearch} />
                        </div>
                        <Online />
                        <div className="over-scroll">
                            <ChatList profile={profile} friends={datasearch} />
                        </div>
                    </div>
                    <div className="list-message">
                        <TopChat profileUserActive={profileUserActive} />
                        <div style={{ height: "85%", width: "100%" }}>
                            {loading ? (
                                <CircularProgress
                                    style={{
                                        position: "fixed",
                                        top: "50%",
                                        left: "60%",
                                    }}
                                />
                            ) : (
                                <MessageList
                                    listMess={listMess}
                                    userActive={userActive}
                                />
                            )}
                        </div>
                        <SendMessage onSendMessage={onSendMessage} />
                    </div>
                </div>
            </SocketContext.Provider>
        </SnackbarProvider>
    );
}
