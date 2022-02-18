import React from "react";
import { observer } from "mobx-react-lite";
import {useItems, returnCategoryIcon} from "../../services/item.service";

const CategoriesList = observer(()=> {


        const itemStore = useItems();

    return (
        <>
            {itemStore.categories.map((category) => (
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