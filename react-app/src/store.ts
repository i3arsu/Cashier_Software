import axios from "axios";
import { types } from "mobx-state-tree";
import Users from "./components/Users";

// TODO: fix "any" TS problem

const SWAPI_URL = "https://www.swapi.tech/api/people";
const { model, string, optional, array, maybe, identifier } = types;

// const fetchUsers = () =>
//   axios.get(SWAPI_URL).then((response) => response.data.results);

export const fetchRosters = async () => {
  const response = await fetch(SWAPI_URL);
  return response.json();
};

export const fetchUser = async (uid: string) => {
  const URL = SWAPI_URL + "/" + uid;
  const response = await fetch(URL).then((result) => result.json());
  return response;
};

export const UserModel = model("UserModel", {
  uid: identifier,
  name: string,
  url: optional(string, "unknown details"),
  orders: 0,
});

export const UserPropertiesModel = model("UserPropertiesModel", {
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  created: string,
  edited: string,
  name: string,
  homeworld: string,
  url: string,
});

export const UserStore = model("UserStore", {
  users: array(UserModel),
  currentUser: maybe(UserPropertiesModel),
  itemsInCart: array(
    types.safeReference(UserModel, { acceptsUndefined: false })
  ),
  idsOfItemsInCart: array(string),
  selectedItem: types.safeReference(UserModel),
})
  .actions((store) => ({
    // FIXME: "any" present
    setUsers(newUsers: any) {
      store.users = newUsers;
    },
    async fetchUsers() {
      const data = await fetchRosters();
      const newUsers = data.results.map(
        (user: { uid: string; name: string; url: string }) => ({
          uid: user.uid,
          name: user.name,
          url: user.url,
        })
      );
      // TODO: tutorial says to use "store" instead of "this",
      // make sure this isn't a big deal
      this.setUsers(newUsers);
    },
    // FIXME: "any" present
    async setCurrentUser(newCurrentUser: any) {
      store.currentUser = newCurrentUser;
    },
    async fetchUser(newUserUid: string) {
      const data = await fetchUser(newUserUid);
      const newCurrentUser = data.result.properties;
      this.setCurrentUser(newCurrentUser);
    },
    getCurrentUser() {
      return store.currentUser;
    },
    addItemToCart(itemId: string) {
      store.itemsInCart.push(itemId);
    },
    decideIfAddItemToCart(itemId: string) {
      if (!store.idsOfItemsInCart.includes(itemId)) this.addItemToCart(itemId);
      store.idsOfItemsInCart.push(itemId);
      const currentItem = store.users.find((user) => user.uid === itemId);
      if (currentItem) currentItem.orders++;
    },
  }))
  .views((store) => ({
    get lukeSkywalkers() {
      return store.users.filter((user) => user.name === "Darth Vader");
    },
  }));

// FIXME: "any" present
let _userStore: any;
export const useUsers = () => {
  if (!_userStore) {
    _userStore = UserStore.create({
      users: [],
      currentUser: undefined,
    });
  }

  return _userStore;
};
