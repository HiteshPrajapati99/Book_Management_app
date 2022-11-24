import { useState, useEffect } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for pagination

// import { Stack, Pagination } from "@mui/material";

// provider

// import { useUserProvider } from "../context/userprovider";

export default function Bookspage() {
  // const { book } = useUserProvider();

  // console.log(book);

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    getdata();
  }, []);
  function getdata() {
    // default url

    const url = "http://localhost:8000/getbooks";

    // pagination url

    // const url = `http://localhost:8000/getbooks?_page=${page}`;
    const token = localStorage.getItem("x-access-token");

    axios.get(url, { headers: { "x-access-token": token } }).then((res) => {
      // console.log(res.data);
      setBooks(res.data);
    });
  }

  const handledelet = (_id) => {
    const url = `http://localhost:8000/books/${_id}`;
    const token = localStorage.getItem("x-access-token");

    axios
      .delete(url, { headers: { "x-access-token": token } })
      .then(function (res) {
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        getdata();
      });
  };

  return (
    <div className="slider-data">
      <div className="row" style={{ gap: "0.6rem" }}>
        {books.length > 0 ? (
          <div>
            <h2 className="text-center" style={{ fontWeight: "1000" }}>
              Your Books
            </h2>
            <Carousel controls={false} indicators={false} className="mb-2">
              <Carousel.Item interval={800}>
                <img
                  style={{ height: "12rem", width: "51.5rem" }}
                  className="d-block"
                  src="https://media.istockphoto.com/photos/stacks-of-books-for-teaching-knowledge-college-library-green-picture-id1335708681?b=1&k=20&m=1335708681&s=170667a&w=0&h=RHmcKrtcUdUpywaOpyk8GO_tpggQYxhqKCoJ1HezCXg="
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={800}>
                <img
                  style={{ height: "12rem", width: "51.5rem" }}
                  className="d-block"
                  src="https://www.oberlo.com/media/1612639204-image3.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={800}>
                <img
                  style={{ height: "12rem", width: "51.5rem" }}
                  className="d-block"
                  src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <Button
              className="category-btn"
              variant="success"
              size="lg"
              onClick={() => navigate("/create_books")}
            >
              Add New Book
            </Button>
          </div>
        ) : (
          ""
        )}
        {books.length > 0 ? (
          books.map((curElm, _id) => {
            return (
              <Card
                className="shadow-lg mt-3 mb-5"
                style={{ width: "18rem" }}
                key={curElm._id}
              >
                <Card.Img
                  className="card-img-top"
                  src={curElm.bookpath}
                  width="200"
                  height="200"
                />
                <Card.Body>
                  <Card.Title> Books Name : {curElm.name} </Card.Title>
                  <Card.Text> About Book : {curElm.desc} </Card.Text>
                  <Card.Text> Book quantity : {curElm.quantity} </Card.Text>
                  <Card.Text> Price : {curElm.price} </Card.Text>
                  <div className="d-flex" style={{ gap: "0.5rem" }}>
                    <Button
                      className="category-btn"
                      variant="success"
                      onClick={() => navigate(`/books_edit/${curElm._id}`)}
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
            );
          })
        ) : (
          <>
            <div
              className="text-center"
              style={{ maxWidth: "50rem", marginTop: "10rem" }}
            >
              <h1>No Books are Available</h1>
              <h2>Place Create Book First</h2>
              <div className="d-grid">
                <Button
                  className="category-btn"
                  variant="success"
                  size="lg"
                  onClick={() => navigate("/create_books")}
                >
                  Add Books
                </Button>
              </div>
            </div>
          </>
        )}

        {/* 
      <div style={{ float: "right" }}>
        <Stack spacing={1}>
          <Pagination
            count={3}
            // page={page}
            showFirstButton={true}
            color={"primary"}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Stack>
      </div> */}
      </div>
    </div>
  );
}
