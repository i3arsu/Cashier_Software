import "./App.css";
import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import TextField from "@material-ui/core/TextField";

export const Search = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <TextField
        value={itemStore.searchedTerm}
        label="Search"
        onChange={(e) => {
          itemStore.searchItems(e.target.value);
        }}
      />
    </>
  );
});
