import axios from 'axios';

import {
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
  fetchAllOrdersStart,
  fetchAllOrdersSuccess,
  fetchAllOrdersFail
} from './reducers';

export const fetchOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(fetchOrderDetailsStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch(fetchOrderDetailsSuccess(data));
  } catch (err) {
    const msg = err.message;
    dispatch(fetchOrderDetailsFail(msg));
  }
};

export const fetchAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(fetchOrdersStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.get(`/api/orders`, config);
    dispatch(fetchOrdersSuccess(data));
  } catch (err) {
    const msg = err.message;
    dispatch(fetchOrdersFail(msg));
  }
};

export const fetchAllOrdersByAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllOrdersStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.get(`/api/orders/admin`, config);
    dispatch(fetchAllOrdersSuccess(data));
  } catch (err) {
    const msg = err.message;
    dispatch(fetchAllOrdersFail(msg));
  }
};