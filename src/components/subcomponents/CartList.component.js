import React, { Component } from "react";
import { observer } from "mobx-react-lite";

import {useItems} from "../../services/item.service";

const CartList = observer(()=>{

        const itemStore = useItems();

        return (
            <>
                <div className="Box-title">Cart</div>
                <div className="Cart-items">
                    {itemStore.itemsInCart.map((item) => (
                            <div className="Item-box Cart-item">
                                <div>{item.name}</div>
                                <div className="Cart-item-quantity">
                                    <div
                                        className="Cart-counter Cart-counter-operation"
                                        onClick={() => itemStore.deleteItemFromCart(item.id)}
                                    >
                                        -
                                    </div>
                                    <div className="Cart-counter">
                                        {
                                            itemStore.items.find(
                                                (stockItem) =>
                                                    stockItem.id === item.id
                                            ).amountInCart
                                        }
                                    </div>
                                    <div
                                        className="Cart-counter Cart-counter-operation"
                                        onClick={() => itemStore.addItemToCart(item.id)}
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
});

export default CartList;
