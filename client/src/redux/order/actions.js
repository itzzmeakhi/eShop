import axios from 'axios';

import {
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFail
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