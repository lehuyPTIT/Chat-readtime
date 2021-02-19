import React from "react";
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
import { makeStyles } from "@material-ui/core/styles";
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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("female");
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
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
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
                                <Grid
                                    item
                                    xs={4}
                                    className={classes.ItemCenter}
                                >
                                    Avatar
                                </Grid>
                                <Grid item xs={8}>
                                    <Avatar className={classes.avatar}>
                                        W
                                    </Avatar>
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
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
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
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
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container wrad="nowrap" xs={6}>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
                                <Grid
                                    item
                                    xs={2}
                                    className={classes.ItemCenter}
                                >
                                    Birthday
                                </Grid>
                                <Grid item xs={10}>
                                    <DatePicker />
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" xs={12} spacing={2}>
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
                                        value={value}
                                        onChange={handleChange}
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
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
