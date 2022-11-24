import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// tost import

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  price: "",
  desc: "",
  quantity: "",
};

export default function Createbook() {
  const navigate = useNavigate();

  const [previewimg, setPreviewimg] = useState("");

  const [img, setimg] = useState("");

  // token and url axios
  const url = "http://localhost:8000/addbook";
  const token = localStorage.getItem("x-access-token");

  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      // console.log(values);

      // send  data to api img and form data using apppend

      var filedata = new FormData();

      filedata.append("book", img);
      filedata.append("name", values.name);
      filedata.append("price", values.price);
      filedata.append("desc", values.desc);
      filedata.append("quantity", values.quantity);

      axios
        .post(url, filedata, { headers: { "x-access-token": token } })
        .then((res) => {
          if (res.data.success) {
            // tost notificationss....
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            actions.resetForm();
            setTimeout(() => {
              navigate("/books");
            }, 1000);
          } else {
            // tost notificationss....

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
        });
    },
  });

  const downkey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "-"];

  return (
    <div className="slider-data">
      <Container
        className="row"
        style={{
          backgroundColor: "ButtonShadow",
          padding: "1rem 10rem",
        }}
      >
        <h2 className="mb-4">Add Book Here</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label> Book Name </Form.Label>
            <Form.Control
              className="form-control"
              onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
              type="text"
              name="name"
              maxLength="15"
              placeholder="Enter Product Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Description </Form.Label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Add Book Description"
              cols="30"
              rows="3"
              maxLength="150"
              className="form-control"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Book Price </Form.Label>
            <Form.Control
              className="form-control"
              type="number"
              name="price"
              placeholder="Enter Product Price"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 8))}
              value={values.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label> Book Quantity </Form.Label>
            <Form.Control
              className="form-control"
              type="number"
              name="quantity"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
              placeholder="Enter Product Price"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mt-2">
              <Form.Label>Book Image</Form.Label>
              <input
                name="mobileimg"
                accept="image/*"
                type="file"
                className="form-control"
                onBlur={handleBlur}
                onChange={(e) => {
                  let reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setimg(e.target.files[0]);
                      setPreviewimg(reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }}
              />
            </Form.Group>
            {previewimg ? (
              <img
                className="mt-3"
                src={previewimg}
                width="150rem"
                height="250rem"
                alt="Book-Image"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="mt-3 category-btn"
              variant="success"
            >
              Add Book
            </Button>
            <ToastContainer
              theme="colored"
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Form>
      </Container>
    </div>
  );
}
