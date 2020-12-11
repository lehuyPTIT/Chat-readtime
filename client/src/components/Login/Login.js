import { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  function handleOnchangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleOnchangePw(e) {
    setPw(e.target.value);
  }

  function handleSubmit(event) {
    console.log(email, pw);
    axios
      .post("http://localhost:9999/api/login", {
        email,
        pw,
      })
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

    event.preventDefault();
  }
  return (
    <div className="main">
      <div className="form-login">
        <p className="title-login"> Login Chat Realtime </p>{" "}
        <form onSubmit={handleSubmit}>
          <div className="box">
            <i className="fas fa-user"> </i>{" "}
            <input
              type="text"
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
          <div>
            <div className="checkbox">
              <input type="checkbox" box="true" />
              <label htmlFor="vehicle1"> Remember password </label>{" "}
              <a href="/#"> Forgot password </a>{" "}
            </div>
          </div>
          <button type="submit"> Login </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Login;
