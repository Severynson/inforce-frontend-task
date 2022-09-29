import { createSlice } from "@reduxjs/toolkit";

export enum SortingOptions {
  SORTED_BY_ALPHABET = "Sorted by alphabet",
  SORTED_BY_DEFAULT_ORDER = "Sorted by default order",
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      {
        title: "Peanut butter",
        image: "https://m.media-amazon.com/images/I/717ujxkOr0L._AC_UL320_.jpg",
        description:
          "Peanut butter is a food paste or spread made from ground, dry-roasted peanuts. It commonly contains additional ingredients that modify the taste or texture, such as salt, sweeteners, or emulsifiers. Peanut butter is consumed in many countries. The United States is a leading exporter of peanut butter and one of the largest consumers of peanut butter annually per capita. January 24 is National Peanut Butter Day in the United States.",
        id: "e1",
      },
      {
        title: "Almonds butter",
        image: "https://m.media-amazon.com/images/I/61k1WjODQQL._AC_UL320_.jpg",
        description:
          "Our California almonds are grown right in our own backyard in Central Valley, California and then processed in our own 100% peanut-free. We use only the finest quality ingredients, including organic and fair trade when possible.",
        id: "e2",
      },
      {
        title: "Pistachios butter",
        image: "https://m.media-amazon.com/images/I/61emGfxi5JL._AC_UL320_.jpg",
        description:
          "Our California pistachios are grown right in our own backyard in Central Valley, California and then processed in our own 100% pistachios-free. We use only the finest quality ingredients, including organic and fair trade when possible.",
        id: "e3",
      },
      {
        title: "Pecan butter",
        image: "https://m.media-amazon.com/images/I/51sKjRMvxyL._AC_UL320_.jpg",
        description:
          "Our California pecan are grown right in our own backyard in Central Valley, California and then processed in our own 100% pecan-free. We use only the finest quality ingredients, including organic and fair trade when possible.",
        id: "e4",
      },
    ],
    selectedSortingOption: SortingOptions.SORTED_BY_ALPHABET,
  },
  reducers: {
    sortData(state, actions) {
      actions.payload === SortingOptions.SORTED_BY_ALPHABET
        ? state.products.sort((a, b) => a.title.localeCompare(b.title))
        : state.products;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
