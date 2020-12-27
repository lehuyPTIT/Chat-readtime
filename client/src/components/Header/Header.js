import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Addfriend from "../AddFriend/Addfriend";
import Search from "../Constanst/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { SocketContext } from "../../socket-context";
import { searchApi } from "../../Api";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      margin: "10px 0",
    },
  },
}));
export default function Header() {
  const classes = useStyles();
  const { profile } = useContext(SocketContext);
  const [datasearch, setDataSearch] = React.useState([]);
  const onSearch = (name) => {
    const res = searchApi(`http://localhost:9999/api/search?name=${name}`);
    if (res && res.success) {
      setDataSearch(res.data);
    }
  };
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
        <Addfriend />
        <MoreHorizIcon style={{ color: "white", marginLeft: "auto" }} />
      </div>
      <Search onSubmit={onSearch} />
    </React.Fragment>
  );
}
