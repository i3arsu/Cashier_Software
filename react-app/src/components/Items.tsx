import { Button, Card, Row } from "react-bootstrap";
import useItems from "../query-hooks/useItems";
import { useUsers } from "../store";
import { observer } from "mobx-react-lite";

const Items = observer(() => {
  const items = useItems();
  const userStore = useUsers();

  // gap: 1rem;
  // column-gap: 1rem;
  // these are used for creating gaps instead of "margin"

  return (
    <>
      {items.isLoading && <p>Loading items...</p>}
      {items.isError && <p>Could not fetch items...</p>}
      {items.isSuccess && (
        <Row xs={1} md={2} className="g-6">
          {items.data.map(
            (item: { uid: string; name: string; url: string }) => (
              // TODO: move item card in separate component
              <Card style={{ width: "12rem" }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.url}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      userStore.decideIfAddItemToCart(item.uid);
                    }}
                  >
                    ADD
                  </Button>
                </Card.Body>
              </Card>
            )
          )}
        </Row>
      )}
    </>
  );
});

export default Items;
