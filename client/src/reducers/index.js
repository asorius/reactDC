import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';
import collectionReducer from './collectionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  collection: collectionReducer,
  messages: messageReducer
});
