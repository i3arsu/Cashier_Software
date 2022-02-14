import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";

export const Search = observer(() => {
  const itemStore = useItems();

  return (
    <>
      {/* TODO: find way to return content of div and pass into function*/}
      <div contentEditable="true" onInput={() => itemStore.searchItems("")}>
        Search
      </div>
    </>
  );
});
