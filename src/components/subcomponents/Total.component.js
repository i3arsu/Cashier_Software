import React from "react";
import { observer } from "mobx-react-lite";
import {useItems} from "../../services/item.service";

const Total = observer(()=>{


        const itemStore = useItems();
        return (
            <>
              <div className="Box-title">Total</div>
              <div>{itemStore.total}</div>
            </>
          );
});

export default Total;