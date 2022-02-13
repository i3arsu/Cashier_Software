import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const ButtonList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <div
        className="Item-box Button"
        onClick={() => itemStore.deleteAllFromCart()}
      >
        Clear
      </div>
      <div
        className="Item-box Button"
        onClick={() => itemStore.undoLastFromCart()}
      >
        Undo
      </div>
      <div
        className={
          itemStore.enableRemoveItem
            ? "Item-box Button Remove-button"
            : "Item-box Button"
        }
        onClick={() => itemStore.enableDeleteItem()}
      >
        Remove
      </div>

      <div
        className="Item-box Button"
        onClick={() => itemStore.printItemsFromCart()}
      >
        Print
      </div>
    </>
  );
});
