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

const sortProductsByAlphabet = (products: Product[]): Product[] =>
  products?.sort((a: Product, b: Product) => a.title.localeCompare(b.title));

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData(state, actions) {
      state.products = actions.payload;

      state.sortedProducts = sortProductsByAlphabet([...actions.payload]);
    },
    sortData(state, actions) {
      switch (actions.payload) {
        case SortingOptions.SORTED_BY_ALPHABET ||
          SortingOptions.TYPE_OF_SORTING: {
          state.sortedProducts = sortProductsByAlphabet([
            ...current(state.products),
          ]);
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
