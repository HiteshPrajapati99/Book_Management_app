import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { loginschema } from "./schemas";
import axios from "axios";

const Loginuser = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginschema,
      onSubmit: (values) => {
        const url = "http://localhost:8000/login";

        axios.post(url, values).then((res) => {
          if (res.data.success) {
            // token set for go to protected page

            localStorage.setItem("x-access-token", res.data.token);

            // tost notificationss....
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 1700,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/books");
            }, 1700);
          } else {
            // tost notificationss....

            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      },
    });

  const [show, setshow] = useState(false);

  const showpassword = () => {
    setshow(!show);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row" style={{ marginTop: "10rem" }}>
          <div className="col-md-5">
            <h2 className="text-center">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mt-3">Email </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your  Email"
                  className="form-control"
                  name="email"
                  id="email"
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
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {
                  <p
                    style={{
                      color: "red",
                      marginBottom: "1px",
                      marginTop: "1px",
                    }}
                  >
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </p>
                }

                <Form.Group className="mt-1" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Click Here to view Password"
                    onClick={showpassword}
                  />
                </Form.Group>
              </Form.Group>
              <div className="notify">
                <Button
                  className="mt-4"
                  size="lg"
                  variant="primary"
                  type="submit"
                >
                  Submit
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
            <div className="register" style={{ float: "right" }}>
              <span>
                <p> Don't have an account? </p>
                <NavLink
                  style={{ color: "rebeccapurple" }}
                  onClick={() => navigate("/register")}
                  role={Button}
                >
                  Register Here
                </NavLink>
              </span>
            </div>
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid w-100" src="./assets/rocket.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginuser;
