import axios from 'axios';

import {
  fetchProductListStart,
  fetchProductListSuccess,
  fetchProductListFail,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail,
  removeProductStart,
  removeProductSuccess,
  removeProductFail
} from './reducers';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductListStart());
    const { data } = await axios.get('/api/products');
    dispatch(fetchProductListSuccess(data));
  } catch (err) {
    const msg = err.message;
    dispatch(fetchProductListFail(msg));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch(fetchProductStart());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(fetchProductSuccess(data));
  } catch (err) {
    const msg = err.message;
    dispatch(fetchProductFail(msg));
  }
};

export const removeProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(removeProductStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    };
    const { data } = await axios.delete(`/api/products/${id}`, config);
    dispatch(removeProductSuccess(data));
  } catch(err) {
    const msg = err.message;
    dispatch(removeProductFail(msg));
  }
};