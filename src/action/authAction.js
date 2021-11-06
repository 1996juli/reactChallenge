import { 
    LOADING,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOG_OUT,
} from '../types';

import axios from 'axios';

export const startLogin = (values) => { 
    return async (dispatch) => {

        dispatch({
            type: LOADING,
        });

        try {
            const result = await axios.post('http://challenge-react.alkemy.org/', values);
            dispatch(login(result.data.token));

        } catch(error){
            dispatch(loginError(error.response.data.error));
            setTimeout(() => {
                dispatch({
                  type: LOG_OUT
                })
            }, 3000);                
        }
    };
};

const login = (token) => {
    return {
        type: LOGIN_SUCCESSFUL,
        payload: token,
    };
};

const loginError = (msg) => {
    return {
        type: LOGIN_ERROR,
        payload: msg,
    };
};

export const isAuthenticated = () => (dispatch) => {

    if (localStorage.getItem("token")) {
      dispatch({
        type: LOGIN_SUCCESSFUL,
      });
    } else {
      dispatch({
        type: LOG_OUT,
      });
    }
};

export const logout = () => {
    return {
        type: LOG_OUT,
    };
};



