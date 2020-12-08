import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [fullname, setFullname] = useState("");
  const [comfirmPass, setComfirmPass] = useState("");
  const [err, setErr] = useState("");

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
    if (pw != comfirmPass) {
      setErr("Password don't correct!!!");
    }
    axios
      .post("http://localhost:9999/sigup", {
        email,
        pw,
        fullname,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }
  return (
    <div className="main">
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

export default Register;
