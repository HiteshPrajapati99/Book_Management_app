import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Userprofile() {
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    var url = "http://localhost:8000/profile";
    const token = localStorage.getItem("x-access-token");
    // console.log(token);

    axios.get(url, { headers: { "x-access-token": token } }).then((res) => {
      setUserData(res.data.User);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="slider-data">
      <Card
        className="shadow row"
        style={{
          maxWidth: "30rem",
          margin: "8rem",
        }}
      >
        <Card.Body>
          <Card.Title>
            <b> Hello Mr... {userdata.name} </b>
          </Card.Title>
          <Card.Body>
            <Card.Header style={{ marginLeft: "3rem" }}>
              <Card.Text style={{ fontWeight: "600" }}>
                Here is Your Profile information.....
              </Card.Text>
              <Card.Text>Email :- {userdata.email}</Card.Text>
              <Card.Text>Number :- {userdata.number}</Card.Text>
            </Card.Header>
          </Card.Body>
          <Card.Footer>
            <Card.Text> click Here To Update Data </Card.Text>
            <div className="d-grid">
              <Button
                className="category-btn"
                variant="success"
                size="lg"
                onClick={() => navigate(`profile/update/${userdata._id}`)}
              >
                Edit
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}
