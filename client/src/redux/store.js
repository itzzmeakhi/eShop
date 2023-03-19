import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { 
  productListReducer,
  pdpReducer 
} from './products/reducers';
import cartReducer from './cart/reducers';

const middleware = [ thunk ];

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
  cart: {
      cartItems: cartItemsFromStorage
  }
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    pdp: pdpReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  preloadedState: initialState
});

export default store;