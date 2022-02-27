import { useItems } from "./store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import { FaBeer, FaCoffee, FaIceCream, FaGlassWhiskey } from "react-icons/fa";

export const ItemList = observer(() => {
  const itemStore = useItems();

  const categories: { [category: string]: JSX.Element } = {
    "Alkoholna pića": <FaBeer />,
    "Topli napitci": <FaCoffee />,
    "Hrana za van": <FaIceCream />,
    "Bezalkoholna pića": <FaGlassWhiskey />,
  };

  const returnCategoryIcon = (category: string): JSX.Element => {
    const key = category;
    return categories[key];
  };

  useEffect(() => {
    itemStore.fetchItems();
  }, [itemStore]);

  return (
    <>
      {/* <div>Item List</div> */}
      {itemStore.searchedItems.map(
        (item: { uid: string; name: string; category: string }) => (
          <div
            className="Item-box"
            onClick={() => itemStore.addItemToCart(item.uid)}
          >
            <div>{item.name}</div>
            <div className="Icon">{returnCategoryIcon(item.category)}</div>
          </div>
        )
      )}
    </>
  );
});
