import { useItems } from "./store";
import { useEffect } from "react";
// import { observer } from "mobx-react-lite";

export const ItemList = () => {
  const itemStore = useItems();

  useEffect(() => {
    itemStore.fetchItems();
  }, [itemStore]);

  return (
    <>
      <div>Item List</div>
      {itemStore.items.map(
        (item: { uid: string; name: string; url: string }) => (
          <div>
            Item: {item.name}, Url: {item.url}
          </div>
        )
      )}
    </>
  );
};
