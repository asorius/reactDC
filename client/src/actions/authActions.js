import { SET_USER, GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAxiosHeader from '../utils/setAxiosHeader';
export const createCollection = (data, history) => dispatch => {
  dispatch(clearErrors());
  const newData = {
    name: data.name,
    password: data.password,
    password_admin: data.password_admin
  };
  axios
    .post('/create/', newData)
    .then(res => {
      // Save to localStorage
      const { token, userType } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      setAxiosHeader(token);
      history.push('/collections');
      dispatch({
        type: SET_USER,
        payload: userType
      });
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};
//SET CURRENT USER
export const setCurrentUser = decoded => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

//CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
