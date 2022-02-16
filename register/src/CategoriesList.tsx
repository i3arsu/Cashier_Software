import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const CategoriesList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      {itemStore.uniqueIds.map((uid: string) => (
        <div
          className={
            itemStore.filteringItems && itemStore.filteredItem === uid
              ? "Item-box Category Toggleable-button"
              : "Item-box Category"
          }
          onClick={() => itemStore.filterItems(uid)}
        >
          {uid}
        </div>
      ))}
    </>
  );
});
