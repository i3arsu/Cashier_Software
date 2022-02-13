import "./App.css";
import { useItems } from "./store";

export const ButtonList = () => {
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
        className="Item-box Button"
        onClick={() => console.log("clicked on Button 2")}
      >
        Button 2
      </div>
      <div
        className="Item-box Button"
        onClick={() => itemStore.printItemsFromCart()}
      >
        Print
      </div>
    </>
  );
};
