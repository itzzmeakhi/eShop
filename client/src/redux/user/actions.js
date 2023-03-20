import axios from 'axios';

import {
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  logoutUser,
  registerUserStart,
  registerUserFail
} from './reducers';
import { clearCart } from './../cart/actions';

const onLoginUser = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users/login', 
      { email, password }, 
      config
    );

    dispatch(loginUserSuccess(data));

    localStorage.setItem('loggedInUser', JSON.stringify(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(loginUserFail(errMsg));
  }
};

const onRegisterUser = ({ email, password, firstName, lastName }) => async (dispatch) => {
  try {
    dispatch(registerUserStart());
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      '/api/users', 
      { email, password, firstName, lastName }, 
      config
    );

    dispatch(loginUserSuccess(data));

    localStorage.setItem('loggedInUser', JSON.stringify(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(registerUserFail(errMsg));
  }
};

const onLogoutUser = () => (dispatch) => {
  try {
    localStorage.removeItem('loggedInUser');
    dispatch(logoutUser());
    dispatch(clearCart());
  } catch(err) {
    console.log(err);
  }
};

export { 
  onLoginUser,
  onLogoutUser,
  onRegisterUser 
};