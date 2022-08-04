import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/SignIn.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().min(4),
    password: yup.string().min(4),
  });

  async function postSignInInfo(inputData) {
    try{
    const response = await axios({
      method: "post",
      url: "http://localhost:8090/api/v1.0/tweets/login",
      data: {
        username: inputData.username,
        password: inputData.password,
      },
    });
    if (response.data !== null && response.status !== 200) {
      showWarningToast(response.data.message);
    }
    if(response.data.user===null){
      showWarningToast(response.data.loginStatus); 
    }
    if (response.data !== null && response.status === 200) {
      setResData(response.data);
      console.log('----------signinsucesss',response.data);
      localStorage.setItem("userName", response.data.user.username);
     // localStorage.setItem("valid", response.data.valid);
      //localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName",response.data.user.firstName);
      localStorage.setItem("lastName",response.data.user.lastName);
      navigate("/home");
    }
  }
    
    catch(error){
      console.log('singin error --',error)
      if(error.response.status===500){
        showWarningToast("Login Service Down");
      }
      else if(error.response.status===403){
        showWarningToast(error.response.data.token);
      }
      else
        showWarningToast(error.response.data.message); 
    }
  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }

  return (
    <Container fluid className={styles.container}>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, {setSubmitting}) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer}
          >
            <Row className="mb-5 text-center">
              <h1 className="text-success">Sign In</h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={touched.username && errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Sign In <RiLoginBoxLine />
            </Button>
            <br/>
            <Link to="/forgotPassword" className="btn btn-primary">Forgot Password</Link>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignIn;
