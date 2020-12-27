import React from "react";
import "./SendMessage.css";
import SendIcon from "@material-ui/icons/Send";

export default function SendMessage() {
  return (
    <div className="send-message">
      <input type="text" />
      <button type="button">
        <SendIcon color="primary" />
      </button>
    </div>
  );
}
