import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getAllCategory, isUserLoggedIn } from "./actions";
import { getInitialData } from "./actions/initialData.action";
import PrivateRoute from "./components/HOC/privateRoute";
import Home from "../src/container/Home/Home.js";
import Orders from "./container/Orders/Orders.js"
import Products from "./container/Products/Products.js";
import Signin from "../src/container/Signin/Signin.js";
import Signup from "../src/container/Signup/Signup.js";
import Category from "./container/Category/Category.js";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [])
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/category" component={Category}/>
        <Route path="/products" component={Products}/>
        <Route path="/orders" component={Orders}/>

        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </div>
  );
}

export default App;


