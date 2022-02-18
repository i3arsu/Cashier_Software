import React, { Component } from "react";

import {useItems} from "../../services/item.service";

export default class ButtonList extends Component {

    render() {
        return (
            <>
              <div
                className="Item-box Button"
                onClick={() => useItems.deleteAllFromCart()}
              >
                CLEAR
              </div>
              <div
                className="Item-box Button"
                //onClick={() => useItems.undoLastFromCart()}
              >
                UNDO
              </div>
              <div
                className="Item-box Button"
                onClick={() => useItems.printItemsFromCart()}
              >
                PRINT
              </div>
            </>
          );
  }
}
