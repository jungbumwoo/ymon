import { applyMiddleware, createStore } from 'redux';
import rootReducer from "../reducers/index";
import thunk from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;