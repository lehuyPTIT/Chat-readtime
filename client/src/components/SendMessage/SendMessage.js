import React, { useState } from "react";
import "./SendMessage.css";
import SendIcon from "@material-ui/icons/Send";

export default function SendMessage(props) {
    const { onSendMessage } = props;
    const [message, setMessage] = useState("");
    const handleOnchange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    const sendMessage = () => {
        if (!message || message === "") return;
        onSendMessage(message);
        setMessage("");
    };
    return (
        <div className="send-message">
            <input
                type="text"
                onChange={handleOnchange}
                onKeyDown={handleKeyDown}
                value={message || ""}
            />
            <button>
                <SendIcon color="primary" onClick={sendMessage} />
            </button>
        </div>
    );
}
