import { createSlice } from '@reduxjs/toolkit';

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loading: false,
    error: null,
    order: {},
    orders: []
  },
  reducers: {
    fetchOrderDetailsStart(state) {
      state.loading = true;
    },
    fetchOrderDetailsSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    fetchOrderDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrdersStart(state) {
      state.loading = true;
    },
    fetchOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    fetchOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export default orderDetailsSlice.reducer;

export const { 
  fetchOrderDetailsStart, 
  fetchOrderDetailsSuccess, 
  fetchOrderDetailsFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail 
} = orderDetailsSlice.actions;