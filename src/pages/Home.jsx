import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/config";
import Card from "../components/BookCard";
import { CardGroup } from "react-bootstrap";
function Home() {
  const [bookList, setBookList] = useState([]);
  const firebase = useFirebase();
  const Navigate = useNavigate();
  useEffect(() => {
    firebase.getAllBooks().then((res) => {
      setBookList(res.docs);
    });
  }, []);
  return (
    <>
      <>
        <div className="container">
          LIST BOOKS HERE
          <CardGroup>
            {bookList.map((el, index) => {
              return <Card key={index} {...el.data()} />;
            })}
          </CardGroup>
        </div>
      </>
    </>
  );
}

export default Home;
