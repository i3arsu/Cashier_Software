import { useItems } from "./store";
import { observer } from "mobx-react-lite";
import "./App.css";

export const CartList = observer(() => {
  const itemStore = useItems();

  return (
    <>
      {/* <div>Cart List</div> */}
      {itemStore.uniqueItemsInCart.map(
        (item: { uid: string; name: string; url: string }) => (
          <div>
            <div className="Item-box Cart-item">
              <div>{item.name}</div>
              <div className="Cart-counter">
                {/* FIXME: remove redundancy */}
                {itemStore.itemsInCart.filter(
                  (i: { uid: string; name: string; url: string }) =>
                    i.uid == item.uid
                ).length == 1
                  ? ""
                  : itemStore.itemsInCart.filter(
                      (i: { uid: string; name: string; url: string }) =>
                        i.uid == item.uid
                    ).length}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
});
