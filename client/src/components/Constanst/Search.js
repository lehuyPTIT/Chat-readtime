import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "auto",
    margin: "auto",
    borderRadius: "30px",
    height: "40px",
    padding: "0!important",
    backgroundColor: "#3F9DBE",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 2,
    width: 50,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  const typingTimeoutRef = useRef(null);
  const handleOnchane = (e) => {
    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSubmit(e.target.value);
    }, 1000);
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search a friend"
        onChange={handleOnchane}
      />
      <SearchIcon className={classes.iconButton} />
    </Paper>
  );
}
