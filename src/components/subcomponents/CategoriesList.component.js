import React from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";
import { FaBeer, FaCoffee, FaIceCream, FaGlassWhiskey } from "react-icons/fa";

const CategoriesList = observer(()=> {


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
    return (
        <>
            {itemStore.categories.map((category: string) => (
                <div
                    className={
                        itemStore.filteredItem === category
                            ? "Item-box Category Toggleable-button"
                            : "Item-box Category"
                    }
                    onClick={() => itemStore.filterItems(category)}
                >
                    <div className="Category">{category.replace("_"," ").replace("_"," ").split("CATEGORY")}</div>
                    <div className="Category-item">{returnCategoryIcon(category)}</div>
                </div>
            ))}
        </>
    );
});

export default CategoriesList;