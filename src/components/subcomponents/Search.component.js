import React, { Component } from "react";
import {useItems} from "../../services/item.service";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {

    render() {
        return (
            <>
              <TextField
                value={useItems.searchedTerm}
                label="Search"
                onChange={(e) => {
                    useItems.searchItems(e.target.value);
                }}
              />
            </>
          );
  }
}
