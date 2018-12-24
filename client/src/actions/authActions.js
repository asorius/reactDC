import { SET_USER, GET_ERRORS, CLEAR_ERRORS } from './types';
import axios from 'axios';
import setAxiosHeader from '../utils/setAxiosHeader';
import jwt_decode from 'jwt-decode';

//SET CURRENT USER
export const setUser = decoded => dispatch => {
  if (!decoded.userType) {
    decoded = { ...decoded, isAuthenticated: true };
  } else {
    decoded = { ...decoded, isAuthenticated: false };
  }
  dispatch({
    type: SET_USER,
    payload: decoded
  });
};
//LOGIN
export const loginUser = data => dispatch => {
  const { history } = data;
  const loginData = {
    name: data.name,
    password: data.password
  };

  axios
    .post('/login', loginData)
    .then(res => {
      //response looks like: { token, userType: 'user' }
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAxiosHeader(token);
      const decoded = jwt_decode(token);
      //decoded should look like :{id:'weqrwer',userType:'admin'}
      history.push('/collections');
      dispatch({
        type: SET_USER,
        payload: decoded
      });
    })
    .catch(error =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};

//CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
