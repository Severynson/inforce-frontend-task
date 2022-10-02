import { createSlice, current } from "@reduxjs/toolkit";
import { Product } from "../components/Product";

export enum SortingOptions {
  TYPE_OF_SORTING = "type of sorting:",
  SORTED_BY_ALPHABET = "Sorted by alphabet",
  SORTED_BY_DEFAULT_ORDER = "Sorted by default order",
}

interface ProductsSliceState {
  products: Product[];
  sortedProducts: Product[];
  sortingOption: SortingOptions;
}

const initialState: ProductsSliceState = {
  products: [],
  sortedProducts: [],
  sortingOption: SortingOptions.TYPE_OF_SORTING,
};

const sortProductsByAlphabet = (products: Product[]): Product[] =>
  products?.sort((a: Product, b: Product) => a.title.localeCompare(b.title));

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData(state, actions) {
      state.products = actions.payload.products;

      if (
        actions.payload.sortingOption ===
        (SortingOptions.TYPE_OF_SORTING || SortingOptions.SORTED_BY_ALPHABET)
      ) {
        state.sortedProducts = sortProductsByAlphabet([
          ...actions.payload.products,
        ]);
      } else {
        state.sortedProducts = [...actions.payload.products];
      }
    },
    sortData(state, actions) {
      state.sortingOption = actions.payload;

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
