import {combineReducers} from 'redux';
import responseFacebook from './reducer-users';

const allReducers = combineReducers({
    users: responseFacebook
});

export default allReducers;
