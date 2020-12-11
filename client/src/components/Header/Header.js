import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Addfriend from "../AddFriend/Addfriend";
import Search from "../Constanst/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: "10px 0",
    },
  },
}));
export default function Header() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.root}>
          <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300/?blur" />
          Le huy
        </div>
        <MoreHorizIcon style={{ color: "white", marginLeft: "auto" }} />
      </div>
      <Search />
    </React.Fragment>
  );
}
