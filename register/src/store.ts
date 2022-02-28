import { types } from "mobx-state-tree";
import axios from "axios";

const URL = "api/products";
const { model, string, optional, array, identifier, number } = types;

const fetchAllItems = () => axios.get(URL).then((response) => response.data);

export const ItemModel = model("ItemModel", {
  uid: identifier,
  name: string,
  category: optional(string, "unknown details"),
  price: number,
  amountInCart: 0,
});

export const ItemStore = model("ItemStore", {
  items: array(ItemModel),
  filteredCategory: "",
  searchedTerm: "",
})
  .actions((store) => ({
    // FIXME: ASAP change "any" to appropriate type
    setItems(newItems: any) {
      store.items = newItems;
    },
    async fetchItems() {
      const data = await fetchAllItems();
      const newItems = data.map(
        (item: {
          id: string;
          category: string;
          name: string;
          price: number;
        }) => ({
          uid: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
        })
      );
      // TODO: tutorial says to use "store" instead of "this",
      // make sure this isn't a big deal
      this.setItems(newItems);
    },
    filterItems(category: string) {
      store.filteredCategory === category
        ? (store.filteredCategory = "")
        : (store.filteredCategory = category);
    },
    searchItems(searchInput: string) {
      store.searchedTerm = searchInput;
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
    get categories() {
      return Array.from(new Set(store.items.map((item) => item.category)));
    },
    get searchedItems() {
      return store.items
        .filter((item) => item.category.includes(store.filteredCategory))
        .filter((item) =>
          item.name.toUpperCase().includes(store.searchedTerm.toUpperCase())
        )
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    },
    get total() {
      return this.itemsInCart
        .reduce((prev, curr) => prev + curr.amountInCart * curr.price, 0)
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
