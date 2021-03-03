import React from "react";
import ProductListPage from "./container/ProductListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Homepage from "./container/Homepage/Homepage.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
