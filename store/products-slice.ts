import { createSlice, current } from "@reduxjs/toolkit";
import { Product } from "../components/Home";

export enum SortingOptions {
  TYPE_OF_SORTING = "type of sorting:",
  SORTED_BY_ALPHABET = "Sorted by alphabet",
  SORTED_BY_DEFAULT_ORDER = "Sorted by default order",
}

interface ProductsSliceState {
  products: Product[];
  sortedProducts: Product[];
}

const initialState: ProductsSliceState = {
  products: [],
  sortedProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData(state, actions) {
      state.products = actions.payload;

      state.sortedProducts = [...actions.payload]?.sort((a: any, b: any) =>
        a.title.localeCompare(b.title)
      );
    },
    sortData(state, actions) {
      switch (actions.payload) {
        case SortingOptions.SORTED_BY_ALPHABET ||
          SortingOptions.TYPE_OF_SORTING: {
          state.sortedProducts = [...current(state.products)]?.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        }

        default: {
          state.sortedProducts = state.products;
        }
      }
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
