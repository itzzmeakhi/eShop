import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { 
  productListReducer,
  pdpReducer 
} from './products/reducers';
import cartReducer from './cart/reducers';
import userReducer from './user/reducers';

const middleware = [ thunk ];

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userDataFromStorage = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '';

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  user: {
    loggedInUser: userDataFromStorage
  }
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    pdp: pdpReducer,
    cart: cartReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  preloadedState: initialState
});

export default store;