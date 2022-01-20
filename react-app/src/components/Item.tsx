import { Button, Card } from "react-bootstrap";

const Item = (item: { uid: string; name: string; url: string }) => {
  return (
    <Card style={{ width: "12rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.url}</Card.Text>
        <Button variant="primary">ADD</Button>
      </Card.Body>
    </Card>
  );
};

export default Item;
