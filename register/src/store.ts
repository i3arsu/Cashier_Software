import { types } from "mobx-state-tree";
import axios from "axios";

const URL = "https://www.swapi.tech/api/people";
const { model, string, optional, array, identifier } = types;

const fetchAllItems = () =>
  axios.get(URL).then((response) => response.data.results);

export const ItemModel = model("ItemModel", {
  uid: identifier,
  name: string,
  url: optional(string, "unknown details"),
  amountInCart: 0,
});

export const ItemStore = model("ItemStore", {
  items: array(ItemModel),
  filteredItem: "",
  filteringItems: false,
  searchedTerm: "",
  searchingItems: false,
})
  .actions((store) => ({
    // FIXME: ASAP change "any" to appropriate type
    setItems(newItems: any) {
      store.items = newItems;
    },
    async fetchItems() {
      const data = await fetchAllItems();
      const newItems = data.map(
        (item: { uid: string; name: string; url: string }) => ({
          uid: item.uid,
          name: item.name,
          url: item.url,
        })
      );
      // TODO: tutorial says to use "store" instead of "this",
      // make sure this isn't a big deal
      this.setItems(newItems);
    },
    filterItems(itemId: string) {
      store.filteredItem = itemId;
      store.filteringItems = !store.filteringItems;
    },
    searchItems(searchInput: string) {
      store.searchedTerm = searchInput;
      searchInput === "" || searchInput === "Search"
        ? (store.searchingItems = true)
        : (store.searchingItems = false);
    },
    addItemToCart(itemId: string) {
      store.items.filter((item) => item.uid === itemId)[0].amountInCart += 1;
    },
    deleteItemFromCart(itemId: string) {
      store.items.filter((item) => item.uid === itemId)[0].amountInCart -= 1;
    },
    deleteAllFromCart() {
      store.items.forEach((item) => (item.amountInCart = 0));
    },
    undoLastFromCart() {
      // TODO: implement Command Design Pattern
    },
    printItemsFromCart() {
      store.items
        .filter((item) => item.amountInCart > 0)
        .forEach((item) => console.log(JSON.stringify(item)));
      this.deleteAllFromCart();
    },
  }))
  .views((store) => ({
    get itemsInCart() {
      return store.items.filter((item) => item.amountInCart > 0);
    },
    get uniqueIds() {
      return store.items.map((item) => item.uid);
    },
    get filteredItems() {
      return store.items.filter((item) => item.uid === store.filteredItem);
    },
    get searchedItems() {
      return store.items.filter((item) =>
        item.name.toUpperCase().includes(store.searchedTerm.toUpperCase())
      );
    },
    get total() {
      return this.itemsInCart
        .reduce((prev: any, curr: any) => prev + curr.amountInCart, 0)
        .toFixed(2);
    },
  }));

// FIXME: "any" present
let _itemStore: any;
export const useItems = () => {
  if (!_itemStore) {
    _itemStore = ItemStore.create({
      items: [],
    });
  }

  return _itemStore;
};
