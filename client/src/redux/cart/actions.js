import axios from 'axios';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemsFromCart,
  addShippingAddress,
  updatePaymentMethod,
  createOrderStart,
  createOrderSuccessOrFail
} from './reducers';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(addItemToCart({
      _id: data._id,
      title: data.title,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch(err) {
    console.log(err)
  }
};

export const onRemoveItemFromCart = (productId) => (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems;
    const newCartItems = cartItems.filter(cItem => cItem._id !== productId);
    dispatch(removeItemFromCart(newCartItems));
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  } catch(err) {
    console.log(err);
  }
};

export const clearCart = () => (dispatch) => {
  try {
    dispatch(clearItemsFromCart());
    localStorage.removeItem('cartItems');
  } catch(err) {
    console.log(err);
  }
};

export const updateShippingAddress = (shippingAddress) => (dispatch) => {
  try {
    dispatch(addShippingAddress(shippingAddress));
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  } catch(err) {
    console.log(err);
  }
};

export const addPaymentMethod = (paymentMethod) => (dispatch) => {
  try {
    dispatch(updatePaymentMethod(paymentMethod));
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  } catch(err) {
    console.log(err);
  }
};

export const createAnOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch(createOrderStart());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.loggedInUser.token}`
      }
    }
    const { data } = await axios.post(
      '/api/orders',
      { ...orderData },
      config
    );
    dispatch(createOrderSuccessOrFail(data));
  } catch(err) {
    console.log(err);
  }
};