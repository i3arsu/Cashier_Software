import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";
import { FaBeer, FaCoffee, FaIceCream, FaGlassWhiskey } from "react-icons/fa";



const ItemList = observer(() => {

    const itemStore = useItems();

    const categories = {
        "CATEGORY_ALKOHOLNA_PICA": <FaBeer />,
        "CATEGORY_TOPLI_NAPITCI": <FaCoffee />,
        "CATEGORY_HRANA": <FaIceCream />,
        "CATEGORY_BEZALKOHOLNA_PICA": <FaGlassWhiskey />,
    };

    const returnCategoryIcon = (category: string): JSX.Element => {
        return categories[category];
    };

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
                        <div className="Icon">{returnCategoryIcon(item.category)}</div>
                    </div>
                )
            )}
        </>
    );
});

export default ItemList;
