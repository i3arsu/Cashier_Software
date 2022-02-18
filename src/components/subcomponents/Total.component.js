import React, { Component } from "react";

import {useItems} from "../../services/item.service";

export default class Total extends Component {

    render() {
        const itemStore = useItems();
        return (
            <>
              <div className="Box-title">Total</div>
              <div>{itemStore.total}</div>
            </>
          );
  }
}
