import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import collectionReducer from './collectionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  collection: collectionReducer
});
