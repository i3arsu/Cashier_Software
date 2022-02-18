import { types } from "mobx-state-tree";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://10.51.2.230:8080/api/item/";
const { model, string, optional, array, identifier, number } = types;

const fetchAllItems = () =>
    axios.get(API_URL + "all",{ headers: authHeader() }).then((response) => response.data);

export const ItemModel = model("ItemModel", {
  id: string,
  name: string,
  price: number,
  category: string,
  amountInCart: 0,
});

export const ItemStore = model("ItemStore", {
  items: array(ItemModel),
  filteredItem: "",
  searchedTerm: "",
})
    .actions((store) => ({
      // FIXME: ASAP change "any" to appropriate type
      setItems(newItems) {
        store.items = newItems;
      },
      async fetchItems() {
        const data = await fetchAllItems();
        console.log(data)
        const newItems = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category
        }));
        // TODO: tutorial says to use "store" instead of "this",
        // make sure this isn't a big deal
        this.setItems(newItems);
      },
      filterItems(itemId) {
        store.filteredItem === itemId
            ? (store.filteredItem = "")
            : (store.filteredItem = itemId);
      },
      searchItems(searchInput) {
        store.searchedTerm = searchInput;
      },
      addItemToCart(itemId) {
        store.items.filter((item) => item.id === itemId)[0].amountInCart += 1;
      },
      deleteItemFromCart(itemId) {
        store.items.filter((item) => item.id === itemId)[0].amountInCart -= 1;
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
        return store.searchedTerm === ""
            ? store.items.filter((item) => item.category.includes(store.filteredItem))
            : store.items
                .filter((item) =>
                    item.name.toUpperCase().includes(store.searchedTerm.toUpperCase())
                )
                .filter((item) => item.category.includes(store.filteredItem));
      },
      get total() {
        return this.itemsInCart
            .reduce((prev, curr) => prev + curr.amountInCart * curr.price, 0)
            .toFixed(2);
      },
    }));


// FIXME: "any" present
let _itemStore;
export const useItems = () => {
  if (!_itemStore) {
    _itemStore = ItemStore.create({
      items: [],
    });
  }

  return _itemStore;
};
