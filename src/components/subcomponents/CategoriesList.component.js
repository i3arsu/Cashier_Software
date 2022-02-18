import React, { Component } from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";

const CategoriesList = observer(()=> {


        const itemStore = useItems();
        console.log(itemStore.getCategories);
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
                    {category.split("CATEGORY_")}
                </div>
            ))}
        </>
    );
});

export default CategoriesList;