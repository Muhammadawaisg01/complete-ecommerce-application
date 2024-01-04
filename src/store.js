
import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk"
import { productReducer, ProductDetailsReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetails: ProductDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
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