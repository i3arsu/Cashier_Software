import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import "./App.css";

export const CartList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      <div className="Box-title">Cart</div>
      <div className="Cart-items">
        {itemStore.itemsInCart.map(
          (item: { uid: string; name: string; url: string }) => (
            <div className="Item-box Cart-item">
              <div>{item.name}</div>
              <div className="Cart-item-quantity">
                <div
                  className="Cart-counter Cart-counter-operation"
                  onClick={() => itemStore.deleteItemFromCart(item.uid)}
                >
                  -
                </div>
                <div className="Cart-counter">
                  {
                    itemStore.items.find(
                      (stockItem: { uid: string; name: string; url: string }) =>
                        stockItem.uid === item.uid
                    ).amountInCart
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
