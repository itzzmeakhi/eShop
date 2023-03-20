import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;

      const existingItem = state.cartItems.find(cItem => cItem.productId === item.productId);

      if (existingItem) {
        state.cartItems = state.cartItems.map(cItem => cItem.productId === item.productId ? item : cItem);
      } else {
        state.cartItems = [...state.cartItems, {...item}];
      }
    },
    removeItemFromCart(state, action) {
      state.cartItems = [...action.payload];
    },
    clearItemsFromCart(state) {
      state.cartItems = [];
    }
  }
});

export default cartSlice.reducer;

export const { 
  addItemToCart, 
  removeItemFromCart,
  clearItemsFromCart 
} = cartSlice.actions;