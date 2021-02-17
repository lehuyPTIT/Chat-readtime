import React, { useEffect } from "react";
import Message from "../../components/Message/Message";
import "./MessageList.css";
let messageItems = null;
const MessageList = ({ listMess, userActive }) => {
  let messages = listMess;

  if (messages && messages.length > 0) {
    messageItems = messages.map((message, index) => {
      return (
        <Message
          key={index}
          isMyMessage={message.sender === userActive ? false : true}
          message={message}
        />
      );
    });
  }

  return <div id="chat-message-list">{messageItems}</div>;
};
export default MessageList;
