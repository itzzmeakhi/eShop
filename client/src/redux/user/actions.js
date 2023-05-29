import axios from 'axios';

import {
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  logoutUser,
  registerUserStart,
  registerUserFail,
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsFail,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFail,
  loadAllUsersStart,
  loadAllUsersSuccess,
  loadAllUsersFail,
  removeUserStart,
  removeUserSuccess,
  removeUserFail
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

const onFetchUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch(getUserDetailsStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.get(
      '/api/users/profile',
      config
    );
    dispatch(getUserDetailsSuccess(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(getUserDetailsFail(errMsg));
  }
};

const onUpdateUserDetails = ({ email, password, firstName, lastName }) => async (dispatch, getState) => {
  try {
    dispatch(updateUserDetailsStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.put(
      '/api/users/profile',
      { email, password, firstName, lastName },
      config
    );
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    loggedInUser.email = data?.email || loggedInUser.email;
    loggedInUser.firstName = data?.firstName || loggedInUser.firstName;
    loggedInUser.lastName = data?.lastName || loggedInUser.lastName;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    dispatch(updateUserDetailsSuccess({ data, loggedInUser }));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(updateUserDetailsFail(errMsg));
  }
};

const onFetchAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(loadAllUsersStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    };
    const { data } = await axios.get('/api/users/userslist', config);
    dispatch(loadAllUsersSuccess(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(loadAllUsersFail(errMsg));
  }
};

const onRemoveUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(removeUserStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    };
    const { data } = await axios.delete(`/api/users/remove/${id}`, config);
    dispatch(removeUserSuccess(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(removeUserFail(errMsg));
  }
};

export { 
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
  onFetchUserDetails,
  onUpdateUserDetails,
  onFetchAllUsers,
  onRemoveUser 
};