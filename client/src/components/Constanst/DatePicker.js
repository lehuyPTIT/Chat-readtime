import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePickers(props) {
    const classes = useStyles();
    const { setBirthDay } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                type="date"
                defaultValue={props.defaultValue || "01/01/2021"}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setBirthDay(e.target.value)}
            />
        </form>
    );
}
