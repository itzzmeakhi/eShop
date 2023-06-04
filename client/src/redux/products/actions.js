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
  removeProductFail,
  updateProductStart,
  updateProductSuccess,
  updateProductFail,
  createProductStart,
  createProductSuccess,
  createProductFail
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

export const updateProductById = (product) => async (dispatch, getState) => {
  try {
    dispatch(updateProductStart());
    const {
      id,
      title,
      description,
      countInStock,
      price,
      image,
      brand,
      category
    } = product;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    };
    const { data } = await axios.put(
      `/api/products/${id}`, 
      { title, description, category, brand, countInStock, image, price },
      config
    );
    dispatch(updateProductSuccess(data));
  } catch(err) {
    const msg = err.message;
    dispatch(updateProductFail(msg));
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    const { title, description, brand, category, price, countInStock, image } = product;
    dispatch(createProductStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.post(
      '/api/products', 
      { title, description, brand, category, price, countInStock, image }, 
      config
    );

    dispatch(createProductSuccess(data));
  } catch(err) {
    const errMsg = err?.response?.data?.message ? err?.response?.data?.message : err?.message ? err?.message : 'An Unexpected error occurred. Please try again';
    dispatch(createProductFail(errMsg));
  }
};