import axios from "axios";

import { ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,
         PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,
         NEW_REVIEW_REQUEST,NEW_REVIEW_FAIL,NEW_REVIEW_RESET,NEW_REVIEW_SUCCESS,CLEAR_ERRORS, 
         ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
         NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,
         DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS} from "../constants/productConstants";
         
import { LOAD_USER_FAIL } from "../constants/userConstan";

export const getProduct = (keyword="",currentPage = 1,price = [0,100000],category,ratings=0) => async (dispatch) => {
  if(!keyword){
    keyword="";
  }
    try {
          dispatch({
            type : ALL_PRODUCT_REQUEST
          });
          
          let link = `https://aio-backend.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

          if(category){
            link = `https://aio-backend.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

          }
         

          const {data} = await axios.get(link);
          
          dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data,
          });
    }
    catch (error){
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message,
        });
    }
}

export const getAdminProducts = ( ) => async (dispatch) => {
  try {
        dispatch({
          type : ADMIN_PRODUCT_REQUEST
        });

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

        const {data} = await axios.get(`https://aio-backend.vercel.app/api/v1/admin/products`, config);
      
        dispatch({
          type : ADMIN_PRODUCT_SUCCESS,
          payload : data.products,
        });
  }
  catch (error){
      dispatch({
          type : ADMIN_PRODUCT_FAIL,
          payload : error.response.data.message,
      });
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
        dispatch({
          type : PRODUCT_DETAILS_REQUEST
        });

        const {data} = await axios.get(`https://aio-backend.vercel.app/api/v1/admin/product/${id}`);

        dispatch({
          type : PRODUCT_DETAILS_SUCCESS,
          payload : data.product,
        });
  }
  catch (error){
      dispatch({
          type : PRODUCT_DETAILS_FAIL,
          payload : error.response.data.message,
      });
  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
        dispatch({
          type : NEW_PRODUCT_REQUEST
        });
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
        const {data} = await axios.post(`https://aio-backend.vercel.app/api/v1/admin/product/new`,productData,config);
        console.log(data)
        dispatch({
          type : NEW_PRODUCT_SUCCESS,
          payload : data,
        });
  }
  catch (error){
      dispatch({
          type : NEW_PRODUCT_FAIL,
          payload : error.response.data.message,
      });
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

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

    const { data } = await axios.delete(`https://aio-backend.vercel.app/api/v1/admin/product/${id}`,config);
    
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
        dispatch({
          type : NEW_REVIEW_REQUEST
        });
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
        const {data} = await axios.put(`https://aio-backend.vercel.app/api/v1/review`,reviewData,config);

        dispatch({
          type : NEW_REVIEW_SUCCESS,
          payload : data.success,
        });
  }
  catch (error){
      dispatch({
          type : NEW_REVIEW_FAIL,
          payload : error.response.data.message,
      });
  }
}

export const clearrErrors = () => async (dispatch) => {
    dispatch({ type : CLEAR_ERRORS});
}