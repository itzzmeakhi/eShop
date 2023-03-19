import axios from 'axios';

import {
  addItemToCart
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