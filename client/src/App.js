import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import RegisterEvent from "./pages/RegisterEvent";
import ViewRegisterEvent from "./pages/ViewRegisterEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/" className="Home">
          Home
        </Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register/:id" exact component={RegisterEvent} />
          <Route path="/view/:eventId" exact component={ViewRegisterEvent}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
