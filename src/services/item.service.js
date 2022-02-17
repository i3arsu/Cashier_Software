import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://10.51.2.230:8080/api/item/";


class ItemService {
  constructor() {
    this.initialized = false;
    this.items = [];
    this.filteredCategory = "";
    this.filteringItems = false;
    this.searchedTerm = "";
    this.searchingItems = false;

    this.fetchItems();
    }

  fetchAllItems() {
    return axios.get(API_URL + "all",{ headers: authHeader() }).then((response) => response.data);
  }
    
  fetchItemById(id) {
    return axios.get(API_URL + id,{ headers: authHeader() }).then((response) => response.data);
  }
    
  async fetchItems() {
    const data = await this.fetchAllItems();
    const newItems = data.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            category : item.category,
            amountInCart : 0
          })
        );
    //console.log(newItems);
    // TODO: tutorial says to use "store" instead of "this",
    // make sure this isn't a big deal
    this.items = newItems;
    this.initialized = true;
    console.log(this.getCategories());
    console.log(this.searchedItems());
    console.log(this.filteredItems());
  }

  filterItems(category) {
    this.filteredCategory = category;
    this.filteringItems = !this.filteringItems;
  }

  searchItems(searchInput) {
    this.searchedTerm = searchInput;
    searchInput === "" || searchInput === "Search"
      ? (this.searchingItems = true)
      : (this.searchingItems = false);
  }

  addItemToCart(itemId) {
    this.items.filter((item) => item.id === itemId)[0].amountInCart += 1;
  }

  deleteItemFromCart(itemId) {
    this.items.filter((item) => item.id === itemId)[0].amountInCart -= 1;
  }

  deleteAllFromCart() {
    this.items.forEach((item) => (item.amountInCart = 0));
  }
 
  printItemsFromCart() {
    this.items
      .filter((item) => item.amountInCart > 0)
      .forEach((item) => console.log(JSON.stringify(item)));
    this.deleteAllFromCart();
  }

  itemsInCart() {
    return this.items.filter((item) => item.amountInCart > 0);
  }
  uniqueIds() {
    return this.items.map((item) => item.id);
  }
  getCategories() {
    return [...new Set(this.items.map((item) => item.category))];
  }
  filteredItems() {
    return this.items.filter((item) => item.category === this.filteredCategory);
  }
  searchedItems() {
    return this.items.filter((item) =>
      item.name.toUpperCase().includes(this.searchedTerm.toUpperCase())
    );
  }
  total() {
    return this.itemsInCart()
      .reduce((prev, curr) => prev + curr.amountInCart*curr.price, 0)
      .toFixed(2);
  }


}

export default new ItemService();