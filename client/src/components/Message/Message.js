import React from "react";
import classNames from "classnames";

import "./Message.css";

const Message = ({ isMyMessage, message }) => {
  const messageClass = classNames("message-row", {
    "you-message": isMyMessage,
    "other-message": !isMyMessage,
  });

  const imageThumbnail = isMyMessage ? null : (
    <img
      src="https://robohash.org/commodiquaeratione.png?size=50x50&set=set1"
      alt="helo"
    />
  );

  return (
    <div className={messageClass}>
      <div className="message-content">
        {imageThumbnail}
        <div className="message-text">{message.text}</div>
        <div className="message-time">{message.time}</div>
      </div>
    </div>
  );
};

export default Message;
