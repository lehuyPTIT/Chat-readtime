import React, { useRef, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { SocketContext } from "../../../socket-context";

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const { socket } = useContext(SocketContext);
  const searchType = useRef(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnchangeSearch = (e) => {
    const value = e.target.value;
    if (searchType.current) {
      clearTimeout(searchType.current);
    }
    searchType.current = setTimeout(() => {
      console.log(value);
    }, 2000);
  };

  return (
    <React.Fragment>
      <i class="fas fa-user-plus" onClick={handleClickOpen}></i>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add friend</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-full-width"
            placeholder="Search"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleOnchangeSearch}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
