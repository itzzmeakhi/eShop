import axios from 'axios';

import {
  fetchProductListStart,
  fetchProductListSuccess,
  fetchProductListFail,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail
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