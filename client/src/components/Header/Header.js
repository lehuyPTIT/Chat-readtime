import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Addfriend from "../AddFriend/Addfriend";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { SocketContext } from "../../socket-context";
import { searchApi } from "../../Api";

import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreOption from "./MoreOption";
const PopoverPopupState = () => {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <MoreHorizIcon
                        style={{ color: "white", marginLeft: "auto" }}
                        {...bindTrigger(popupState)}
                    />
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: "right",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "right",
                            horizontal: "left",
                        }}
                    >
                        <MoreOption />
                    </Popover>
                </div>
            )}
        </PopupState>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        margin: "0 10px",
        "& > *": {
            margin: "10px 0",
            marginRight: "10px",
        },
    },
    itemRinght: {
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        "& > *": {
            margin: "0 10px",
        },
    },
}));
export default function Header() {
    const classes = useStyles();
    const { profile } = useContext(SocketContext);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.root}>
                    <Avatar
                        alt="Remy Sharp"
                        src={
                            profile
                                ? profile.userImage
                                : "https://picsum.photos/200/300/?blur"
                        }
                    />
                    {profile ? profile.fullname : ""}
                </div>
                <div className={classes.itemRinght}>
                    <Addfriend />
                    <PopoverPopupState />
                </div>
            </div>
        </React.Fragment>
    );
}
