import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { SocketContext } from "../../socket-context";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import "./ChatList.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "20px 10px",
    "&:hover": {
      backgroundColor: "#2F9AC0",
    },
  },
  lastMessage: {
    width: "50px",
    overflow: "hidden",
    display: "inline",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  active: {
    backgroundColor: "#2F9AC0",
  },
}));
export default function SingleChat(props) {
  const classes = useStyles();
  const { user } = props;
  const { userActive, setActive, setListMess } = useContext(SocketContext);
  const active = userActive === user._id ? "active" : "";
  return (
    <div
      className={`${classes.root} ${active}`}
      onClick={() => {
        setActive(user._id);
      }}
    >
      <Avatar src={user.userImage} />
      <div className="text-name">
        <div>{user.fullname}</div>
        <div className="conversation-message">
          Đây là tin nhắn cuối cung nhè!
        </div>
      </div>
      {user.isOnline && (
        <FiberManualRecordIcon
          style={{ color: green[500], fontSize: 10, marginLeft: "auto" }}
        />
      )}
    </div>
  );
}
