import { LOGIN_REQUEST, LOGIN_FAIL , LOGIN_SUCCESS, CLEAR_ERRORS,
     REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
      LOAD_USER_REQUEST, LOAD_USER_FAIL,LOAD_USER_SUCCESS,
    LOGOUT_FAIL,LOGOUT_SUCCESS,
    UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_RESET,
     FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
     RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS} from "../constants/userConstan"

import axios from "axios";




export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers : { "Content-Type" : "application/json" }, withCredentials: true, credentials: 'include'};

        const { data } = await axios.post(`http://localhost:4000/api/v1/login`,{email,password}, config ) ;
        
        if (data) {
            
            localStorage.setItem('token', data.token);
        }



        dispatch({ type: LOGIN_SUCCESS, payload: data.user})
    }

catch(error){
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
}
};


export const register = (userData) => async(dispatch) => {

    try{
       dispatch({ type: REGISTER_USER_REQUEST});
    

       const config = { headers  : { "Content-Type" : "multipart/form-data"}};
       const { data } = await axios.post(`http://localhost:4000/api/v1/register`, userData , config);

       if(data){
        const date = new Date();
            date.setDate(date.getDate() + 5);

           
            document.cookie = `token=${data.token}; path=/; expires=${date.toUTCString()}; Secure; SameSite=None`;
       }

       dispatch({ type : REGISTER_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });

    }

}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        
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

        const { data } = await axios.get(`http://localhost:4000/api/v1/me`, config);
        
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};



export const logout = () => async(dispatch) => {
    try{
      
      

        await axios.get(`http://localhost:4000/api/v1/logout`, { withCredentials: true, credentials: 'include' }) ;
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_SUCCESS })
    }

catch(error){
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
}
};

export const updateProfile = (userData) => async(dispatch) => {

    try{
       dispatch({ type: UPDATE_PROFILE_REQUEST });
     

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
       const { data } = await axios.put(`http://localhost:4000/api/v1/me/update`, userData , config);
    
       dispatch({ type :UPDATE_PROFILE_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL , payload: error.response.data.message });

    }

}

export const updatePassword = (passwords) => async(dispatch) => {

    try{
       dispatch({ type: UPDATE_PASSWORD_REQUEST });
      

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
       const { data } = await axios.put(`http://localhost:4000/api/v1/password/update`, passwords , config);
       if(data){
        const date = new Date();
            date.setDate(date.getDate() + 5);

           
            document.cookie = `token=${data.token}; path=/; expires=${date.toUTCString()}; Secure; SameSite=None`;
       }
       dispatch({ type :UPDATE_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL , payload: error.response.data.message });

    }

}

export const forgotPassword = (email) => async(dispatch) => {
    try{
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers : { "Content-Type" : "application/json" }, withCredentials: true, credentials: 'include'};

        const { data } = await axios.post(`http://localhost:4000/api/v1/password/forgot`,email, config ) ;

        if(data){
            const date = new Date();
                date.setDate(date.getDate() + 5);
    
               
                document.cookie = `token=${data.token}; path=/; expires=${date.toUTCString()}; Secure; SameSite=None`;
           }

        dispatch({ type: FORGOT_PASSWORD_SUCCESS , payload: data.message})
    }

catch(error){
    dispatch({ type: FORGOT_PASSWORD_FAIL , payload: error.response.data.message });
}
};

export const resetPassword = (token,passwords) => async(dispatch) => {
    try{
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers : { "Content-Type" : "application/json" }, withCredentials: true, credentials: 'include'};
       
        const { data } = await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`,passwords , config ) ;

        if(data){
            const date = new Date();
                date.setDate(date.getDate() + 5);
    
               
                document.cookie = `token=${data.token}; path=/; expires=${date.toUTCString()}; Secure; SameSite=None`;
           }
      
        dispatch({ type: RESET_PASSWORD_SUCCESS , payload: data.success})
    }

catch(error){
    dispatch({ type: RESET_PASSWORD_FAIL , payload: error.response.data.message });
}
};





export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };



 