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
          <Link to="/" className="Home">
            Home
          </Link>
          {!authState && (
            <Link to="/login" className="Home">
              Login
            </Link>
          )}

          {authState && (
            <div>
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register/:id" exact component={RegisterEvent} />
            <Route path="/view/:eventId" exact component={ViewRegisterEvent} />
            {!authState && <Route path="/login" exact component={Login} />}
            {authState && <Route path="/logout" exact component={Logout} />}
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
