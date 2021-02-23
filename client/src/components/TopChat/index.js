import React from "react";

import Avatar from "@material-ui/core/Avatar";
import VideocamIcon from "@material-ui/icons/Videocam";
import CallIcon from "@material-ui/icons/Call";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        height: "8%",
        backgroundColor: "white",
        width: "100%",
        color: "black",
        "& > *": {
            margin: "20px 10px",
        },
    },
    call: {
        margin: "0 ",
        "& > *": {
            margin: "0 10px",
            borderRadius: "50%",
            height: "20px",
            padding: "5px",
            backgroundColor: "#54B1D2",
            color: "white",
        },
    },
}));
export default function TopChat(props) {
    const classes = useStyles();
    const { profileUserActive } = props;
    return (
        <div className={classes.root}>
            <Avatar
                src={profileUserActive ? profileUserActive.userImage : ""}
            />
            <div>{profileUserActive ? profileUserActive.fullname : ""}</div>
            <div className={classes.call} style={{ marginLeft: "auto" }}>
                <VideocamIcon />
                <CallIcon />
                <MoreHorizIcon />
            </div>
        </div>
    );
}
