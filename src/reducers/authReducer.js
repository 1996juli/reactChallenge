import { 
    LOADING,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOG_OUT,
} from '../types';

const initialState = {
    token: localStorage.getItem('token') || null,
    authenticated: false,
    message: null,
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return { 
                ...state, 
                loading: true 
            };
        case LOGIN_SUCCESSFUL: 
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true,
                message: null,
                loading: false,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                token: null,
                authenticated: false,
                message: action.payload,
                loading: false,
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticated: false,
                message: null,
                loading: false,
            }
        default:
            return state;
    }
}