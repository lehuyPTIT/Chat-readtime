import React from "react";
import SingleChat from "./SingleChat";
import Data from "./data";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#54B1D2",
    overflow: "hidden",
  },
}));

export default function (props) {
  const classes = useStyles();
  const { profile } = props;
  return (
    <div className={classes.root}>
      {profile &&
        profile.friendsList &&
        profile.friendsList.map((user) => <SingleChat user={user} />)}
    </div>
  );
}
