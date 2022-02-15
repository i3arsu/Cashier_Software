import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const Total = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <div>Total:</div>
      <div>
        {itemStore.itemsInCart.length
          ? itemStore.itemsInCart.length.toFixed(2)
          : ""}
      </div>
    </>
  );
});
