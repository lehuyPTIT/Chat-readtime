import React, { useEffect } from "react";
import Message from "../../components/Message/Message";
import "./MessageList.css";
import Data from "./Data";
let messageItems = null;
const MessageList = ({ conversationId, getMessagesForConversation }) => {
  let messages = Data;

  if (messages && messages.length > 0) {
    messageItems = messages.map((message, index) => {
      return (
        <Message
          key={index}
          isMyMessage={message.isMyMessage}
          message={message}
        />
      );
    });
  }

  return <div id="chat-message-list">{messageItems}</div>;
};
export default MessageList;
