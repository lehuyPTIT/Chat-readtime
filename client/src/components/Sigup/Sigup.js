import { useState } from "react";
import "./Sigup.css";
import axios from "axios";
import { useSnackbar } from "notistack";

const Sigup = () => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [fullname, setFullname] = useState("");
    const [comfirmPass, setComfirmPass] = useState("");
    const [err, setErr] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function handleOnchangeFullname(e) {
        setFullname(e.target.value);
    }
    function handleOnchangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleOnchangePw(e) {
        setPw(e.target.value);
    }
    function handleOnchangecfPw(e) {
        setComfirmPass(e.target.value);
    }

    function handleSubmit(event) {
        if (pw !== comfirmPass) {
            setErr("Password don't correct!!!");
        }
        axios
            .post(`${process.env.REACT_APP_UNSPLASH_HOST}/sigup`, {
                email,
                pw,
                fullname,
            })
            .then(function (response) {
                console.log(response);
                enqueueSnackbar("Singup success!");
            })
            .catch(function (error) {
                enqueueSnackbar("Singup Failed!", { variant: "error" });
            });

        event.preventDefault();
    }
    return (
        <div className="main">
            <div className="button-singin">
                <a href="/">
                    <button>Sign in</button>
                </a>
            </div>
            <div className="form-login">
                <p className="title-login"> Register Chat</p>{" "}
                <form onSubmit={handleSubmit}>
                    <div className="box">
                        <i className="fas fa-user"> </i>
                        <input
                            type="text"
                            placeholder="FullName"
                            onChange={handleOnchangeFullname}
                            autoComplete="false"
                        />
                    </div>
                    <div className="box">
                        <i className="fas fa-user"> </i>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleOnchangeEmail}
                            autoComplete="false"
                        />
                    </div>
                    <div className="box">
                        <i className="fas fa-unlock-alt"> </i>{" "}
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handleOnchangePw}
                            autoComplete="false"
                        />
                    </div>
                    <div className="box">
                        <i className="fas fa-unlock-alt"> </i>{" "}
                        <input
                            type="password"
                            placeholder="Comfirm password"
                            onChange={handleOnchangecfPw}
                            autoComplete="false"
                        />
                    </div>
                    <div>{err}</div>
                    <button type="submit"> Register </button>{" "}
                </form>
            </div>
        </div>
    );
};

export default Sigup;
