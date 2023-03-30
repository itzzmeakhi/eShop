import axios from 'axios';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemsFromCart
} from './reducers';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(addItemToCart({
      productId: data._id,
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
    const newCartItems = cartItems.filter(cItem => cItem.productId !== productId);
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