import React from "react";
import {useItems} from "../../services/item.service";
import FilledInput from "@material-ui/core/FilledInput";
import { observer } from "mobx-react-lite";

const Search = observer(()=>{
    const itemStore = useItems();
    return (
        <>
            <FilledInput
                value={itemStore.searchedTerm}
                style={{
                    flex:"1",
                    backgroundColor: "white",
                    fontSize: "50%",
                    fontWeight: "bold",
                }}
                placeholder="Search"
                fullWidth
                // inputProps={{ disableUnderline: true }}
                onChange={(e) => {
                    itemStore.searchItems(e.target.value);
                }}
            />
        </>
    );
});

export default Search;
