import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import "./App.css";

export const CartList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <div>Cart List</div>
      {itemStore.itemsInCart.map(
        (item: { uid: string; name: string; url: string }) => (
          <div className="Item-box Cart-item">{item.name}</div>
        )
      )}
    </>
  );
});
