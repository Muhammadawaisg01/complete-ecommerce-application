
import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk"
import { productReducer, ProductDetailsReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: ProductDetailsReducer,
    user: userReducer,
    profile: profileReducer
});

let initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
    trace: true,
});

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)));

export default store;