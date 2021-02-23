import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./containers/Homepage/App";
import Signup from "./components/Sigup/Sigup";
import { SnackbarProvider } from "notistack";
console.log(process.env, "env client");
function App() {
    const check = localStorage.getItem("token");
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            variant="success"
            autoHideDuration={2000}
        >
            <Router>
                <Switch>
                    <Route exact path="/">
                        {!check ? <Login /> : <Homepage />}
                    </Route>
                    <Route exact path="/singup" component={Signup} />
                </Switch>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
