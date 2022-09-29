import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";

const store = configureStore({
  reducer: {
    productsSlice: productsSlice.reducer,
  },
});

export default store;
