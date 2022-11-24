import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Userlist() {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);

  // console.log(curElm);

  useEffect(() => {
    getdata();
  }, []);

  function getdata() {
    const token = localStorage.getItem("x-access-token");
    const url = "http://localhost:8000/users";

    axios.get(url, { headers: { "x-access-token": token } }).then((res) => {
      setUserData(res.data);
    });
  }

  function handledelet(_id) {
    const url = `http://localhost:8000/user/${_id}`;
    const token = localStorage.getItem("x-access-token");
    axios
      .delete(url, { headers: { "x-access-token": token } })
      .then(function (res) {
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        getdata();
      });
  }

  return (
    <div className="slider-data">
      <div
        className="row"
        style={{ marginLeft: "1rem", gap: "1rem", marginTop: "5rem" }}
      >
        {userdata.length > 0 ? <h1> User Details :) </h1> : ""}
        {userdata.length > 0 ? (
          userdata.map((curElm, _id) => {
            return (
              <>
                <Card key={_id} style={{ width: "25rem" }}>
                  <Card.Body>
                    <Card.Title> First Name : {curElm.firstname} </Card.Title>
                    <Card.Title> Last Name : {curElm.lastname} </Card.Title>
                    <Card.Text>Gender : {curElm.gender}</Card.Text>
                    <Card.Text> Age : {curElm.age} </Card.Text>
                    <Card.Text> Address : {curElm.address} </Card.Text>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Button
                        className="category-btn"
                        variant="success"
                        onClick={() => navigate(`/user_edit/${curElm._id}`)}
                      >
                        Edit
                      </Button>
                      <div>
                        <Button
                          className="category-btn"
                          variant="success"
                          onClick={() => handledelet(curElm._id)}
                        >
                          Delete
                        </Button>
                        <ToastContainer
                          position="top-right"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })
        ) : (
          <>
            <div className="text-center" style={{ maxWidth: "50rem" }}>
              <h1 style={{ marginTop: "10rem" }}>No User Data Is Available</h1>
              <h2>Place Create User First</h2>
              <div className="d-grid">
                <Button
                  className="category-btn"
                  variant="success"
                  onClick={() => navigate("/add_user")}
                >
                  Add New User
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
