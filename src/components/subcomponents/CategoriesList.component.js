import React, { Component } from "react";

import ItemService from "../../services/item.service";

export default class CategoriesList extends Component {


    render() {
        console.log(ItemService.getCategories());
        return (
            <>
              {ItemService.getCategories().map((category) => (
                <div
                  className={
                    ItemService.filteringItems && ItemService.filteredCategory === category
                      ? "Item-box Category Toggleable-button"
                      : "Item-box Category"
                  }
                  onClick={() => ItemService.filterItems(category)}
                >
                  {category}
                </div>
              ))}
            </>
          );
  }
}
