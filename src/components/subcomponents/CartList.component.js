import React, { Component } from "react";

import ItemService from "../../services/item.service";

export default class CartList extends Component {

    render() {
        return (
        <>
        <div className="Box-title">Cart</div>
        <div className="Cart-items">
            {ItemService.itemsInCart().map((item) => (
            <div className="Item-box Cart-item">
              <div>{item.name}</div>
              <div className="Cart-item-quantity">
                <div
                  className="Cart-counter Cart-counter-operation"
                  onClick={() => ItemService.deleteItemFromCart(item.id)}
                >
                  -
                </div>
                <div className="Cart-counter">
                  {
                    ItemService.items.find(
                      (stockItem) =>
                        stockItem.id === item.id
                    ).amountInCart
                  }
                </div>
                <div
                  className="Cart-counter Cart-counter-operation"
                  onClick={() => ItemService.addItemToCart(item.id)}
                >
                  +
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
    );
  }
}
