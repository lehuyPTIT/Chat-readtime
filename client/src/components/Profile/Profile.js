import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "../Constanst/DatePicker";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Badge from "@material-ui/core/Badge";
import Loading from "../Constanst/Loading";
import { SocketContext } from "../../socket-context";
import { updateProfile } from "../../Api";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

import { getProfileApi } from "../../Api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: 800,
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    ItemCenter: {
        display: "flex",
        alignItems: "center",
    },
    sex: {
        display: "flex",
        flexDirection: "row",
    },
}));
export default function Profile() {
    const { profile, fetchData } = useContext(SocketContext);
    const [open, setOpen] = useState(false);
    const [sex, setSex] = useState("female");
    const [imageUpload, setImageUpload] = useState(null);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [birthDay, setBirthDay] = useState();
    const [info, setInfo] = useState("");
    const classes = useStyles();
    const [file, setFile] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const res = await getProfileApi(
                `${process.env.REACT_APP_UNSPLASH_HOST}/api/profile`
            );
            if (res.data && res.data.data) {
                const {
                    fullname,
                    email,
                    sex,
                    address,
                    phoneNumber,
                    birthDay,
                } = res.data.data;
                setAddress(address);
                setPhoneNumber(phoneNumber);
                setBirthDay(birthDay);
                setEmail(email);
                setSex(sex);
                setFullname(fullname);

                setInfo(res.data.data);
            }
        }
        fetchData();
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOnchangeImage = (event) => {
        var file = event.target.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setImageUpload(reader.result);
        };
    };
    const handleOnSave = async () => {
        const user = {
            fullname,
            email,
            sex,
            address,
            phoneNumber,
            birthDay,
            imageUpload,
        };
        const res = await updateProfile(
            `${process.env.REACT_APP_UNSPLASH_HOST}/api/updateProfile`,
            user
        );
        if (res && res.data.success) {
            enqueueSnackbar("Update profile success!");
            fetchData();
        } else
            enqueueSnackbar("Update that bai!", {
                variant: "error",
            });
    };
    return (
        <React.Fragment>
            <div>
                <ListItem button onClick={handleClickOpen}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Profile User"}
                    </DialogTitle>
                    <DialogContent dividers className={classes.content}>
                        <Grid container wrad="nowrap" xs={12} spacing={2}>
                            <Grid container wrad="nowrap" xs={6}>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={4}
                                        className={classes.ItemCenter}
                                    >
                                        Avatar
                                    </Grid>
                                    <Grid item xs={4}>
                                        <input
                                            accept="image/*"
                                            id="icon-button-photo"
                                            style={{
                                                display: "none",
                                            }}
                                            onChange={handleOnchangeImage}
                                            type="file"
                                        />
                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }}
                                            badgeContent={
                                                <label htmlFor="icon-button-photo">
                                                    <AddAPhotoIcon
                                                        htmlFor="icon-button-photo"
                                                        style={{
                                                            zIndex: 1,
                                                            opacity: 0.4,
                                                        }}
                                                    />
                                                </label>
                                            }
                                        >
                                            <Avatar
                                                alt="Travis Howard"
                                                src={
                                                    imageUpload
                                                        ? imageUpload
                                                        : info.userImage
                                                }
                                                className={classes.avatar}
                                            />
                                        </Badge>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Fullname
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-full-width"
                                            className={classes.textField}
                                            margin="dense"
                                            defaultValue={info.fullname}
                                            variant="outlined"
                                            onChange={(e) =>
                                                setFullname(e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Email
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-full-width"
                                            className={classes.textField}
                                            margin="dense"
                                            variant="outlined"
                                            defaultValue={info.email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Phone Number
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-full-width"
                                            type="number"
                                            className={classes.textField}
                                            margin="dense"
                                            variant="outlined"
                                            defaultValue={info.phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container wrad="nowrap" xs={6}>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Address
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-full-width"
                                            className={classes.textField}
                                            margin="dense"
                                            variant="outlined"
                                            defaultValue={info.address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Birthday
                                    </Grid>
                                    <Grid item xs={10}>
                                        <DatePicker
                                            setBirthDay={setBirthDay}
                                            defaultValue={info.birthday}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                        className={classes.ItemCenter}
                                    >
                                        Sex
                                    </Grid>
                                    <Grid item xs={10}>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender1"
                                            defaultValue={info.sex}
                                            value={sex}
                                            onChange={(e) =>
                                                setSex(e.target.value)
                                            }
                                            className={classes.sex}
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    wrap="nowrap"
                                    xs={12}
                                    spacing={2}
                                    className={classes.avatar}
                                ></Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleOnSave}
                            color="primary"
                            autoFocus
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    );
}
