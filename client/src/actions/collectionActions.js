import {
  GET_COLLECTION,
  SET_USER,
  LOGOUT,
  COLLECTION_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';
import axios from 'axios';
import setAxiosHeader from '../utils/setAxiosHeader';

//Push new collection to database
export const createCollection = data => dispatch => {
  //clear any errors
  dispatch(clearErrors());
  const collectionData = {
    name: data.name,
    password: data.password,
    password_admin: data.password_admin
  };
  const { history } = data;
  axios
    .post('/create/', collectionData)
    .then(res => {
      //res data looks like {token:'asdfasdf',userType:'admin', id:'12sdf23'}
      const { token, userType, id } = res.data;
      localStorage.setItem('jwtToken', token);
      setAxiosHeader(token);
      history.push('/collections');
      dispatch({
        type: SET_USER,
        payload: { userType, id }
      });
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};
export const getCollection = () => dispatch => {
  dispatch(setCollectionLoading());
  axios
    .get('/collections/get')
    .then(res => {
      dispatch({
        type: GET_COLLECTION,
        payload: res.data
      });
    })
    .catch(error => dispatch({ type: GET_COLLECTION, payload: null }));
};
export const addToCollection = () => dispatch => {};
export const deleteCollectionItem = () => dispatch => {};
export const deleteCollectionItems = () => dispatch => {};
export const deleteCollection = () => dispatch => {};
//LOG OUT
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAxiosHeader(false);
  dispatch({ type: LOGOUT });
};

//PROFILE LOADING
export const setCollectionLoading = () => {
  return {
    type: COLLECTION_LOADING
  };
};

//CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
