import React, { Component } from "react";

import ItemService from "../../services/item.service";

export default class ItemList extends Component {

    render() {
        return (
            <>
              {/* <div>Item List</div> */}
              {!ItemService.filteringItems
                ? ItemService.searchedItems().map(
                    (item) => (
                      <div
                        className="Item-box"
                        onClick={() => ItemService.addItemToCart(item.id)}
                      >
                        {item.name}
                      </div>
                    )
                  )
                : ItemService.filteredItems().map(
                    (item) => (
                      <div
                        className="Item-box"
                        onClick={() => ItemService.addItemToCart(item.id)}
                      >
                        {item.name}
                      </div>
                    )
                  )}
            </>
          );
  }
}
