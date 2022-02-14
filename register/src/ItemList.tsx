import { useItems } from "./store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";

export const ItemList = observer(() => {
  const itemStore = useItems();

  useEffect(() => {
    itemStore.fetchItems();
  }, [itemStore]);

  return (
    <>
      {/* <div>Item List</div> */}
      {!itemStore.filteringItems
        ? itemStore.items.map(
            (item: { uid: string; name: string; url: string }) => (
              <div
                className="Item-box"
                onClick={() => itemStore.addItemToCart(item.uid)}
              >
                {item.name}
              </div>
            )
          )
        : itemStore.filteredItems.map(
            (item: { uid: string; name: string; url: string }) => (
              <div
                className="Item-box"
                onClick={() => itemStore.addItemToCart(item.uid)}
              >
                {item.name}
              </div>
            )
          )}
    </>
  );
});
