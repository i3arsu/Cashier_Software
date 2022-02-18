import React, { Component } from "react";
import {useItems} from "../../services/item.service";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import { observer } from "mobx-react-lite";

const Search = observer(()=>{
    const itemStore = useItems();
    return (
        <>
            <FilledInput
                value={itemStore.searchedTerm}
                style={{
                    backgroundColor: "white",
                    fontSize: "100%",
                    marginBottom: "2%",
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
