import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import { combineReducers } from "redux";
import { productConstants } from "../actions/constants";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer
})

export default rootReducer;