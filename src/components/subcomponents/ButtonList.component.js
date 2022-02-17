import React, { Component } from "react";

import ItemService from "../../services/item.service";

export default class ButtonList extends Component {

    render() {
        return (
            <>
              <div
                className="Item-box Button"
                onClick={() => ItemService.deleteAllFromCart()}
              >
                CLEAR
              </div>
              <div
                className="Item-box Button"
                //onClick={() => ItemService.undoLastFromCart()}
              >
                UNDO
              </div>
              <div
                className="Item-box Button"
                onClick={() => ItemService.printItemsFromCart()}
              >
                PRINT
              </div>
            </>
          );
  }
}
