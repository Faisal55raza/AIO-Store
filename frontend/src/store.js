import { legacy_createStore as createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer,myOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";


let initialState = { 
    cart :{
        cartItems : localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
 },
};

const reducer = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders:myOrderReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer
});

const middleware = [thunk];

const store = createStore(
    reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)));


 export default store;


 