import React from "react";
import SingleChat from "./SingleChat";
import Data from "./data";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#54B1D2",
    "& > *": {
      margin: "1px 0",
    },
  },
}));

export default function index() {
  return <div>{Data && Data.map((item) => <SingleChat data={item} />)}</div>;
}
