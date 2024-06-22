import {
    CREATE_ORDER_FAIL,CLEAR_ERRORS,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,MY_ORDER_FAIL,MY_ORDER_REQUEST,MY_ORDER_SUCCESS,ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,
    
} from "../constants/orderConstants"
import { LOAD_USER_FAIL } from "../constants/userConstan";
import axios from "axios";


export const createOrder = (order) => async(dispatch) => {
    try{
        dispatch({type : CREATE_ORDER_REQUEST});
        

        const token = localStorage.getItem('token');
        if (!token) {
            dispatch({ type: LOAD_USER_FAIL, payload: "Please login" });
            return;
        }
        
        const config = {
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        };
      
        const { data }  = await axios.post("https://aio-store.onrender.com/api/v1/order/new",order,config);
    
    
        dispatch({type: CREATE_ORDER_SUCCESS, payload : data.order})
    }
    catch(error){
        dispatch({type : CREATE_ORDER_FAIL,
        payload: error.response.data.message, 
    });
    }
}

export const myOrders = () => async (dispatch) => {
  try {
      dispatch({ type: MY_ORDER_REQUEST });
      
      const token = localStorage.getItem('token');
      
      const config = {
          headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          withCredentials: true,
          credentials: 'include'
      };

      const { data } = await axios.get("https://aio-store.onrender.com/api/v1/orders/me", config);

      dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
      dispatch({
          type: MY_ORDER_FAIL,
          payload: error.response.data.message,
      });
  }
};
  export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch({ type: LOAD_USER_FAIL, payload: "Please login" });
          return;
      }
      
      const config = {
          headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          withCredentials: true,
          credentials: 'include'
      };
    
      const { data } = await axios.get(`https://aio-store.onrender.com/api/v1/order/${id}`,config);
     
      
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
    dispatch({ type : CLEAR_ERRORS});
}