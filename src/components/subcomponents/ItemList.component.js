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
            {itemStore.searchedItems.map(
                (item) => (
                    <div
                        className="Item-box"
                        onClick={() => itemStore.addItemToCart(item.id)}
                    >
                        <div>{item.name}</div>
                    </div>
                )
            )}
        </>
    );
});

export default ItemList;
