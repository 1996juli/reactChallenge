import { combineReducers } from 'redux';
import authReducer from './authReducer';
import heroReducer from './heroReducer';

export default combineReducers({
    auth: authReducer,
    hero: heroReducer,
});