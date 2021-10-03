import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import RegisterEvent from "./pages/RegisterEvent";
import ViewRegisterEvent from "./pages/ViewRegisterEvent";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./pages/Logout";
import authService from "./helpers/AuthService";
import UnsubcribeEvent from "./pages/UnsubcribeEvent";
import EditUser from "./pages/EditUser";
import UnsubscribeAll from "./pages/UnsubscribeAll";
import Statistic from "./pages/Statistic";

function App() {
  const [authState, setAuthState] = useState(false);

  new authService().init();

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      axios
        .post(`http://localhost:3001/auth/auth`, null, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setAuthState(true);
        })
        .catch((error) => {
          setAuthState(false);
        });
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div>
            .
            <Link to="/" className="Home">
              Home
            </Link>
            {!authState && (
              <Link to="/login" className="Home">
                Login
              </Link>
            )}
            {authState && (
              <div style={{ display: "inline" }}>
                Welcome, {sessionStorage.getItem("name")}
                <Link
                  style={{ marginLeft: "15px" }}
                  to="/logout"
                  className="Home"
                >
                  Logout
                </Link>
              </div>
            )}
            {authState && (
              <Link to="/statistic" className="Home">
                Statistic
              </Link>
            )}
            <Link to="/unsubscribeall" className="Home">
              Unsubcribe All Events
            </Link>
          </div>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register/:id" exact component={RegisterEvent} />
            <Route
              path="/view/:eventId"
              exact
              component={() => <ViewRegisterEvent auth={authState} />}
            />
            <Route
              path="/unsubscribe/:eventId"
              exact
              component={UnsubcribeEvent}
            />
            <Route path="/unsubscribeall/" exact component={UnsubscribeAll} />
            {!authState && <Route path="/login" exact component={Login} />}
            {authState && <Route path="/logout" exact component={Logout} />}
            {authState && <Route path="/edit/:id" exact component={EditUser} />}
            {authState && (
              <Route path="/statistic" exact component={Statistic} />
            )}
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
