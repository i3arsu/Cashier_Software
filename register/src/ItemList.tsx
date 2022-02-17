import { useItems } from "./store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import { FaBeer, FaCoffee, FaIceCream, FaGlassWhiskey } from "react-icons/fa";

export const ItemList = observer(() => {
  const itemStore = useItems();

  const categories: { [id: string]: JSX.Element } = {
    0: <FaBeer />,
    1: <FaCoffee />,
    2: <FaIceCream />,
    3: <FaGlassWhiskey />,
  };

  const returnCategoryIcon = (id: string): JSX.Element => {
    const key = parseInt(id) % 4;
    return categories[key];
  };

  useEffect(() => {
    itemStore.fetchItems();
  }, [itemStore]);

  return (
    <>
      {/* <div>Item List</div> */}
      {itemStore.searchedItems.map(
        (item: { uid: string; name: string; url: string }) => (
          <div
            className="Item-box"
            onClick={() => itemStore.addItemToCart(item.uid)}
          >
            <div>{item.name}</div>
            <div className="Icon">{returnCategoryIcon(item.uid)}</div>
          </div>
        )
      )}
    </>
  );
});
