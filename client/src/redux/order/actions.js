import axios from 'axios';

import {
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail
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