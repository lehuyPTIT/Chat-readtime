import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/login";
import Main from "./components/View/App";
import Singup from "./components/Auth/Register";

//De su dung duy nhat 1 socket thi phai truyen qua props, thay vi vay thi co the dung context de lay luon cai socket do dung contextAPI

function App() {
  const check = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {!check ? <Login /> : <Main />}
          </Route>
          <Route exact path="/singup" component={Singup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;