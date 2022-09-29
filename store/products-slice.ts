import { createSlice } from "@reduxjs/toolkit";

const deepCopy = (object: object) => JSON.parse(JSON.stringify(object));

export enum SortingOptions {
  TYPE_OF_SORTING = "type of sorting:",
  SORTED_BY_ALPHABET = "Sorted by alphabet",
  SORTED_BY_DEFAULT_ORDER = "Sorted by default order",
}

const initialState = {
  products: [] as any[],
  sortedProducts: [] as any[],
  selectedSortingOption: SortingOptions.SORTED_BY_ALPHABET,
  status: null as null | string,
  error: null as null | string,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData(state, actions) {
      state.products.length = 0;
      state.products = deepCopy(actions.payload);
      state.sortedProducts = deepCopy(state.products);
    },
    sortData(state, actions) {
      console.log(state);

      if (
        actions.payload ===
        (SortingOptions.SORTED_BY_ALPHABET || SortingOptions.TYPE_OF_SORTING)
      ) {
        state.sortedProducts = state.products.sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        );
        console.log("IIIFFFF worked");
      } else {
        console.log("EEEls worked, state deep copy: ", state.products);
        state.sortedProducts = deepCopy(
          JSON.parse(localStorage.getItem("productsList") as string)
        );
      }
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
