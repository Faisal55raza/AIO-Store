import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstant";
import axios from "axios";



export const addItemToCart = (id,quantity) => async(dispatch,getState) => {
    
    const { data } = await axios.get(`https://aio-store.onrender.com/api/v1/admin/product/${id}`, { withCredentials: true, credentials: 'include' });
    dispatch({
        type : ADD_TO_CART,
        payload : {
            product : data.product._id,
            name: data.product.name,
            price: data.product.price,
            image:data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        }
    })

    localStorage.setItem("cartIems", JSON.stringify(getState().cart.cartItems))
}

export const removeItemsFromCart = (id) => async(dispatch,getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,

     } )

     localStorage.setItem("cartIems", JSON.stringify(getState().cart.cartItems));
    
}
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload:data,
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data));
}