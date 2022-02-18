import React from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";

const ButtonList = observer(()=>{


    const itemStore = useItems();

        return (
            <>
              <div
                className="Item-box Button"
                onClick={() => itemStore.deleteAllFromCart()}
              >
                CLEAR
              </div>
              <div
                className="Item-box Button"
                //onClick={() => useItems.undoLastFromCart()}
              >
                UNDO
              </div>
              <div
                className="Item-box Button"
                onClick={() => itemStore.printItemsFromCart()}
              >
                PRINT
              </div>
            </>
          );
});

export default ButtonList;
