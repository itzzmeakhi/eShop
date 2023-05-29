import { createSlice } from '@reduxjs/toolkit';

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    error: null,
    products: [],
    productDeleteAndReload: false,
  },
  reducers: {
    fetchProductListStart(state) {
      state.loading = true;
    },
    fetchProductListSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
      state.productDeleteAndReload = false;
    },
    fetchProductListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeProductStart(state) {
      state.loading = true;
    },
    removeProductSuccess(state) {
      state.loading = false;
      state.productDeleteAndReload = true;
    },
    removeProductFail(state, action) {
      state.error = action.payload;
    }
  }
});

const pdpSlice = createSlice({
  name: 'pdp',
  initialState: {
    product: {},
    loading: false,
    error: null
  },
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
    },
    fetchProductSuccess(state, action) {
      state.loading = false;
      state.product = { ...action.payload };
    },
    fetchProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  reducer: productListReducer 
} = productListSlice;

export const {
  reducer: pdpReducer
} = pdpSlice;

export const { 
  fetchProductListStart, 
  fetchProductListSuccess, 
  fetchProductListFail,
  removeProductStart,
  removeProductSuccess,
  removeProductFail
} = productListSlice.actions;

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail
} = pdpSlice.actions;