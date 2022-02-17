import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import FilledInput from "@material-ui/core/FilledInput";

export const Search = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <FilledInput
        value={itemStore.searchedTerm}
        style={{ backgroundColor: "white", fontSize: "100%" }}
        placeholder="Search"
        inputProps={{ disableUnderline: true }}
        onChange={(e) => {
          itemStore.searchItems(e.target.value);
        }}
      />
    </>
  );
});
