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
});

export const ItemStore = model("ItemStore", {
  items: array(ItemModel),
  itemsInCart: array(
    types.safeReference(ItemModel, { acceptsUndefined: false })
  ),
  enableRemoveItem: false,
  filteredItem: "",
  filteringItems: false,
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
    addItemToCart(itemId: string) {
      store.itemsInCart.push(itemId);
    },
    deleteItem(itemId: string) {
      store.enableRemoveItem
        ? store.itemsInCart.splice(
            store.itemsInCart.findIndex((item) => item.uid === itemId),
            1
          )
        : console.log("Delete Item not permitted");
    },
    deleteAllFromCart() {
      store.itemsInCart.clear();
    },
    undoLastFromCart() {
      store.itemsInCart.pop();
    },
    printItemsFromCart() {
      store.itemsInCart.forEach((item) => console.log(JSON.stringify(item)));
      this.deleteAllFromCart();
    },
    enableDeleteItem() {
      store.enableRemoveItem = !store.enableRemoveItem;
    },
  }))
  .views((store) => ({
    // FIXME: replace "any" with sensible alternative
    get uniqueItemsInCart() {
      const uniqueItemsInCart: any = [];
      store.itemsInCart.forEach((item) => {
        if (
          !uniqueItemsInCart.some(
            (uniqueItem: any) =>
              JSON.stringify(uniqueItem) === JSON.stringify(item)
          )
        ) {
          uniqueItemsInCart.push(item);
        }
      });
      return uniqueItemsInCart;
    },
    get uniqueIds() {
      return store.items.map((item) => item.uid);
    },
    get filteredItems() {
      return store.items.filter((item) => item.uid === store.filteredItem);
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
