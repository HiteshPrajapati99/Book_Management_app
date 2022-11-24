import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { formSchema } from "./schemas";
import axios from "axios";

export default function Registeruser() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
    c_password: "",
  };

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: formSchema,

      onSubmit: (values, actions) => {
        var url = "http://localhost:8000/register";
        axios.post(url, values).then((res) => {
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
            setTimeout(() => {
              navigate("/login");
            }, 2000);
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

          actions.resetForm();
        });
      },
    });

  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const downkey = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "-"];

  const [show, setshow] = useState(false);

  const showpassword = () => {
    setshow(!show);
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ marginTop: "1rem" }}>
          <div className="col-md-5">
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>

                <input
                  onKeyDown={(e) =>
                    downkey.includes(e.key) && e.preventDefault()
                  }
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-control"
                  required
                  id="name"
                  name="name"
                  minLength="3"
                  maxLength="25"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p className="err-p">
                    {errors.name && touched.name ? errors.name : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className="mt-3">Number</Form.Label>
                <input
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 12))
                  }
                  type="number"
                  placeholder="Enter Your Number"
                  className="form-control"
                  name="number"
                  id="number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {
                  <p className="err-p">
                    {errors.number && touched.number ? errors.number : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className="mt-3">Email </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your  Email"
                  className="form-control"
                  name="email"
                  id="email"
                  minLength="5"
                  maxLength="32"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p className="err-p">
                    {errors.email && touched.email ? errors.email : null}
                  </p>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mt-3">Password</Form.Label>
                <input
                  className="form-control"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  minLength="8"
                  maxLength="16"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p style={{ color: "red", marginBottom: "2px" }}>
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </p>
                }

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Click Here to view Password"
                    onClick={showpassword}
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> Confirm Password</Form.Label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Your Password"
                  name="c_password"
                  id="c_password"
                  minLength="8"
                  maxLength="32"
                  value={values.c_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  <p className="err-p">
                    {errors.c_password && touched.c_password
                      ? errors.c_password
                      : null}
                  </p>
                }
              </Form.Group>

              <Button
                className="mt-2"
                size="lg"
                variant="primary"
                type="submit"
              >
                Register
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

              <div className="login-here">
                <p>allredy registerd login here</p>
                <Button
                  style={{ display: "flex", float: "right" }}
                  variant="primary"
                  className="mx-3"
                  onClick={() => navigate("/login")}
                >
                  Login Page
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src="./assets/rocket.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
