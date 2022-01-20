import React, { useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import Items from "../components/Items";
import { useUsers } from "../store";
import { observer } from "mobx-react-lite";

const RegisterPage = observer(() => {
  const userStore = useUsers();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          flex: 4,
          height: "92vh",
          backgroundColor: "#FF5733",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 4,
            overflowY: "scroll",
          }}
        >
          {userStore.itemsInCart.map(
            (item: {
              uid: string;
              name: string;
              url: string;
              orders: number;
            }) => (
              <div>
                <Card body>
                  {item.name} <div>{item.orders > 1 ? item.orders : ""}</div>
                </Card>
              </div>
            )
          )}
        </div>
        <div style={{ flex: 0.5, backgroundColor: "#ef91cd" }}>
          {userStore.idsOfItemsInCart}
        </div>
        <div style={{ flex: 0.5, backgroundColor: "#83ed9f" }}>
          {userStore.lukeSkywalkers.map(
            (luke: {
              uid: string;
              name: string;
              url: string;
              orders: number;
            }) => (
              <Card body>{luke.name}</Card>
            )
          )}
        </div>
        <div style={{ flex: 3, backgroundColor: "darkorange" }}>Buttons</div>
        <div style={{ flex: 2, backgroundColor: "red" }}>Payment</div>
      </div>
      <div
        style={{
          flex: 0.2,
          height: "92vh",
          backgroundColor: "#9970f4",
        }}
      ></div>
      <div
        style={{
          flex: 6,
          height: "92vh",
          backgroundColor: "#33DBFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "pink" }}>Searchbar</div>
        <div
          style={{
            flex: 9,
            overflowY: "scroll",
          }}
        >
          <Items />
        </div>
      </div>
    </div>
  );
});

export default RegisterPage;
