import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { 
  productListReducer,
  pdpReducer 
} from './products/reducers';

const middleware = [ thunk ];

const store = configureStore({
  reducer: {
    productList: productListReducer,
    pdp: pdpReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export default store;