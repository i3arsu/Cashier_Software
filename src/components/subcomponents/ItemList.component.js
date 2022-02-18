import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";



const ItemList = observer(() => {

    const itemStore = useItems();

    useEffect(() => {
        itemStore.fetchItems();
    }, [itemStore]);

    //console.log(itemStore)
        return (
            <>
                {/* <div>Item List</div> */}
                {!itemStore.filteringItems
                    ? itemStore.searchedItems.map(
                        (item) => (
                            <div
                                className="Item-box"
                                onClick={() => itemStore.addItemToCart(item.id)}
                            >
                                {item.name}
                            </div>
                        )
                    )
                    : itemStore.filteredItems.map(
                        (item) => (
                            <div
                                className="Item-box"
                                onClick={() => itemStore.addItemToCart(item.id)}
                            >
                                {item.name}
                            </div>
                        )
                    )}
            </>
        );
} );

export default ItemList;
