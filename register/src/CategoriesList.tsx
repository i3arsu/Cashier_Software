import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const CategoriesList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      {itemStore.categories.map((category: string) => (
        <div
          className={
            itemStore.filteredItem === category
              ? "Item-box Category Toggleable-button"
              : "Item-box Category"
          }
          onClick={() => itemStore.filterItems(category)}
        >
          {category}
        </div>
      ))}
    </>
  );
});
