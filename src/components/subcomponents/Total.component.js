import React, { Component } from "react";

import ItemService from "../../services/item.service";

export default class Total extends Component {

    render() {
        return (
            <>
              <div className="Box-title">Total</div>
              <div>{ItemService.total()}</div>
            </>
          );
  }
}
