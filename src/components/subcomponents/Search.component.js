import React, { Component } from "react";

import ItemService from "../../services/item.service";
import TextField from "@material-ui/core/TextField";

export default class Search extends Component {

    render() {
        return (
            <>
              <TextField
                value={ItemService.searchedTerm}
                label="Search"
                onChange={(e) => {
                    ItemService.searchItems(e.target.value);
                }}
              />
            </>
          );
  }
}
