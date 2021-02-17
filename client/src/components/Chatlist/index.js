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
  const { profile, friends } = props;
  return (
    <div className={classes.root}>
      {friends &&
        friends.map((user, index) => <SingleChat user={user} key={index} />)}
    </div>
  );
}
