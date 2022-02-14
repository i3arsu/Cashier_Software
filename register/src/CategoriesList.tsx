import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const CategoriesList = observer(() => {
  const itemStore = useItems();
  const categories = [
    "Food",
    "Beverage",
    "Alcohol",
    "Snacks",
    "Home",
    "Kitchen",
  ];

  return (
    <>
      {categories.map((category) => (
        <div className="Item-box Button">{category}</div>
      ))}
    </>
  );
});
