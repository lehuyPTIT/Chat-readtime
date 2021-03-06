import React, { useContext, useEffect, useState } from "react";
import "./Addfriend.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Badge from "@material-ui/core/Badge";
import Search from "../Constanst/Search";
import { SocketContext } from "../../socket-context";
import { searchApi, addApi } from "../../Api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "fit-content",
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    button: {
        width: 100,
        marginLeft: "auto",
    },
    avatar: {
        marginRight: 20,
    },
    paper: {
        width: "100%",
        height: 400,
        overflow: "auto",
    },
}));
export default function Addfriend() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const fullWidth = true;
    const maxWidth = "sm";
    const { profile, socket } = useContext(SocketContext);
    const [datasearch, setDataSearch] = React.useState([]);
    const [request, setRequest] = useState([]);
    const [ArrayAdd, setArr] = useState([]);

    useEffect(() => {
        function getRequest() {
            socket.emit("getRequest");
            socket.on("request", function (listRequest) {
                setRequest(listRequest);
            });
        }
        getRequest();
    }, [socket]);

    const onSearch = async (name) => {
        const res = await searchApi(
            `${process.env.REACT_APP_UNSPLASH_HOST}/api/search?name=${name}`
        );
        if (res && res.data.success) {
            setDataSearch(res.data.data);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const onAddFriend = (index) => {
        setArr([...ArrayAdd, index]);
    };
    const onSendRequestFriend = (userId) => {
        setArr([...ArrayAdd, userId]);
        socket.emit("sendRequest", userId);
    };
    const onAcceptFriend = (userId) => {
        setArr([...ArrayAdd, userId]);
        socket.emit("accept-friend", userId);
        console.log(userId, "idididid");
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="add-friends">
            <Badge
                badgeContent={request ? request.length : 0}
                color="secondary"
                onClick={handleClickOpen}
            >
                <PersonAddIcon />
            </Badge>

            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                    Add Friends
                </DialogTitle>
                <Search onSubmit={onSearch} />
                <List dense component="div" role="list">
                    {datasearch.map((value, index) => {
                        const labelId = `transfer-list-item-${value}-label`;
                        return (
                            <ListItem key={index} role="listitem" button>
                                <Avatar
                                    className={classes.avatar}
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                />
                                <ListItemText
                                    id={labelId}
                                    primary={value.fullname}
                                />
                                {value.check === 0 && (
                                    <ListItemIcon>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={
                                                ArrayAdd.indexOf(value._id) ===
                                                -1
                                                    ? false
                                                    : true
                                            }
                                            onClick={() =>
                                                onSendRequestFriend(value._id)
                                            }
                                        >
                                            Thêm bạn bè
                                        </Button>
                                    </ListItemIcon>
                                )}
                                {/* {value.check === 1 && (
                  <ListItemIcon>
                    <Button variant="contained" color="primary" disabled>
                      Đã gửi yêu cầu kết bạn
                    </Button>
                  </ListItemIcon>
                )} */}
                                {value.check === 2 && (
                                    <ListItemIcon>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={
                                                ArrayAdd.indexOf(value._id) ===
                                                -1
                                                    ? false
                                                    : true
                                            }
                                            onClick={() =>
                                                onAcceptFriend(value._id)
                                            }
                                        >
                                            {ArrayAdd.indexOf(value._id) === -1
                                                ? "Đồng ý kết bạn"
                                                : "Da chap nhan ket ban"}
                                        </Button>
                                    </ListItemIcon>
                                )}
                                {value.check === 3 && (
                                    <ListItemIcon>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled
                                            onClick={() =>
                                                onAcceptFriend(value._id)
                                            }
                                        >
                                            Da gui loi moi ket ban
                                        </Button>
                                    </ListItemIcon>
                                )}
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
                <Divider className={classes.divider} orientation="vertical" />
                <Paper className={classes.paper}>
                    <List dense component="div" role="list">
                        {request.map((value, index) => {
                            const labelId = `transfer-list-item-${value}-label`;

                            return (
                                <ListItem key={index} role="listitem" button>
                                    <Avatar
                                        className={classes.avatar}
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                    <ListItemText
                                        id={labelId}
                                        primary={value.fullname}
                                    />
                                    <ListItemIcon>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={
                                                ArrayAdd.indexOf(value._id) ===
                                                -1
                                                    ? false
                                                    : true
                                            }
                                            onClick={() =>
                                                onAcceptFriend(value._id)
                                            }
                                        >
                                            {ArrayAdd.indexOf(value._id) === -1
                                                ? "Đồng ý kết bạn"
                                                : "Đã chấp nhận kết bạn"}
                                        </Button>
                                    </ListItemIcon>
                                </ListItem>
                            );
                        })}
                        <ListItem />
                    </List>
                </Paper>
                <DialogActions className={classes.button}>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
