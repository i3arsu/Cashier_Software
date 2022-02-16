import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import "./App.css";

export const CartList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <div className="Box-title">Cart</div>
      <div className="Cart-items">
        {itemStore.uniqueItemsInCart.map(
          (item: { uid: string; name: string; url: string }) => (
            <div className="Item-box Cart-item">
              <div>{item.name}</div>
              <div className="Cart-item-quantity">
                <div
                  className="Cart-counter Cart-counter-operation"
                  onClick={() => itemStore.deleteItem(item.uid)}
                >
                  -
                </div>
                <div className="Cart-counter">
                  {
                    itemStore.itemsInCart.filter(
                      (i: { uid: string; name: string; url: string }) =>
                        i.uid === item.uid
                    ).length
                  }
                </div>
                <div
                  className="Cart-counter Cart-counter-operation"
                  onClick={() => itemStore.addItemToCart(item.uid)}
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
