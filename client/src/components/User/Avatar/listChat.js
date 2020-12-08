import React, { useContext } from "react";
import { SocketContext } from "../../../socket-context";
import Avatar from "@material-ui/core/Avatar";
export default function ListChat() {
  const { profile } = useContext(SocketContext);
  return (
    <div className="box-chat">
      {profile &&
        profile.friendsList.map((friend) => {
          return (
            <div className="list-chat">
              {/* <div className="image-friend">
                <img src={friend.avatar} alt="" />
              </div> */}
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div className="chat-left">
                <div className="name-friend">{friend.name}</div>
                <div>{friend.messageLast}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
