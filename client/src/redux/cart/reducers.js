import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    shippingAddress: {},
    paymentMethod: '',
    createOrderLoading: false,
    createOrderResponse: {}
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find(cItem => cItem._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map(cItem => cItem._id === item._id ? item : cItem);
      } else {
        state.cartItems = [...state.cartItems, {...item}];
      }
    },
    removeItemFromCart(state, action) {
      state.cartItems = [...action.payload];
    },
    clearItemsFromCart(state) {
      state.cartItems = [];
    },
    addShippingAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    updatePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    createOrderStart(state) {
      state.createOrderLoading = true;
    },
    createOrderSuccessOrFail(state, action) {
      state.createOrderLoading = false;
      state.createOrderResponse = action.payload;
    }
  }
});

export default cartSlice.reducer;

export const { 
  addItemToCart, 
  removeItemFromCart,
  clearItemsFromCart,
  addShippingAddress,
  updatePaymentMethod,
  createOrderStart,
  createOrderSuccessOrFail 
} = cartSlice.actions;