import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../src/container/Home/Home.js";
import Signin from "../src/container/Signin/Signin.js";
import Signup from "../src/container/Signup/Signup.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signout" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
