import { useItems } from "./store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./ItemList.css";

export const ItemList = observer(() => {
  const itemStore = useItems();

  useEffect(() => {
    itemStore.fetchItems();
  }, [itemStore]);

  return (
    <>
      {/* <div>Item List</div> */}
      {itemStore.items.map(
        (item: { uid: string; name: string; url: string }) => (
          <div className="Item-box">{item.name}</div>
        )
      )}
    </>
  );
});
