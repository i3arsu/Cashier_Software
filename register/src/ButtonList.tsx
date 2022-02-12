import "./App.css";
import { useItems } from "./store";

export const ButtonList = () => {
  const itemStore = useItems();
  const numbers = [2, 3];

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
      {numbers.map((number) => (
        <div
          className="Item-box Button"
          onClick={() => console.log(`clicked on ${number}`)}
        >
          Button {number}
        </div>
      ))}
    </>
  );
};
