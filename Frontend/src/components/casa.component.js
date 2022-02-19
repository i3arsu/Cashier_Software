import React, { Component } from "react";

import CartList from "./subcomponents/CartList.component";
import ButtonList from "./subcomponents/ButtonList.component";
import Total from "./subcomponents/Total.component";
import CategoriesList from "./subcomponents/CategoriesList.component";
import Search from "./subcomponents/Search.component";
import ItemList from "./subcomponents/ItemList.component";


export default class Casa extends Component {

  render() {
    return (
      <div className="Kasa">
          <div className="Half-section Cart-section">
              <div className="Box Cart-box">
                <CartList />
              </div>
              <div className="Box Buttons-box">
                <ButtonList />
              </div>
              <div className="Box Total-box">
                <Total />
              </div>
              <div className="Box Box-title">Quick Stats</div>
            </div>
            <div className="Half-section Item-section">
              <div className="Box Category-box">
                <CategoriesList />
              </div>
              <div className="Box Total-box">
                <Search />
              </div>
              <div className="Box Items-box">
                <ItemList />
              </div>
            </div>
      </div>
    );
  }
}
