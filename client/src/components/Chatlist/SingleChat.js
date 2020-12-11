import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { SocketContext } from "../../socket-context";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: "4px",
    },
  },
}));
export default function SingleChat(props) {
  const classes = useStyles();
  const { data } = props;
  const { setActive } = useContext(SocketContext);
  return (
    <div className={classes.root} onClick={() => setActive(data.id)}>
      <Avatar src={data.avatar} />
      <div>
        <p>{data.first_name}</p>
        <p>{data.last_mess}</p>
      </div>
      {data.isOnline && (
        <FiberManualRecordIcon
          style={{ color: green[500], fontSize: 10, marginLeft: "auto" }}
        />
      )}
    </div>
  );
}
