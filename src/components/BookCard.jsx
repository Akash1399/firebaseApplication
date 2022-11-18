import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useFirebase } from "../firebase/config";
function BookCard(props) {
  const [url, setUrl] = useState("");
  const firebase = useFirebase();
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((res) => {
      console.log(res);
      setUrl(res);
    });
  }, []);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            this Book has a Title {props?.name} and this Book is Sold by{" "}
            {props?.username} at a price of {props?.price}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
