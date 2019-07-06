import {combineReducers} from 'redux';
import reminderReducer from './reminderReducer'
import errorsReducer from './errorsReducer'
import messagesReducer from './messagesReducer'

export default combineReducers({
    reminderReducer,
    errorsReducer,
    messagesReducer
});