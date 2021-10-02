import './App.css';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegisterEvent from './pages/RegisterEvent';

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register/:id" exact component={RegisterEvent} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
