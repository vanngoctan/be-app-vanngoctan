import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";

import { useHistory } from "react-router-dom";

export default function Login() {

  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  let history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email!")
      .required("You must input the email!"),
    password: Yup.string().required("You must input the password!"),
  });

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3001/auth/login`, data)
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("accessToken", response.data.token);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("name", response.data.name);
        setAuthState(true);
        history.push("/");
      })
      .catch((response) => {
        console.log("Error");
      });
  };

  return (
    <div className="register-user-to-event">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-container">
          <label>Email: </label>
          <Field
            className="input"
            id="inputEmail"
            name="email"
            placeholder="john@example.com"
            autoComplete="off"
          />
          <ErrorMessage name="email" component="span" />

          <label>Password: </label>
          <Field
            className="input"
            id="inputPassword"
            name="password"
            autoComplete="off"
            type="password"
          />
          <ErrorMessage name="password" component="span" />

          <button className="join-btn" type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
