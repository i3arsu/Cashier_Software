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
        CLEAR
      </div>
      <div
        className="Item-box Button"
        onClick={() => itemStore.undoLastFromCart()}
      >
        UNDO
      </div>
      <div
        className="Item-box Button"
        onClick={() => itemStore.printItemsFromCart()}
      >
        PRINT
      </div>
    </>
  );
});
