import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";

export default function UnsubscribeAll() {
 
  const initialValues = {
    userId: "",
  };

  let history = useHistory();

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("You must input the User id!"),
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3001/events/unsubscribeall/`, data)
      .then((response) => {
        history.push("/");
      })
      .catch((response) => {
        console.log("Error");
      });
  };

  return (
    <div className="register-user-to-event">
      <h1>Enter your id to unsubcribe from all Events</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-container">
          <label>User id: </label>
          <Field
            className="input"
            id="inputUserId"
            name="userId"
            placeholder=""
            autoComplete="off"
          />
          <ErrorMessage name="userId" component="span" />

          <button className="join-btn" type="submit">
            Unsubcribe
          </button>
        </Form>
      </Formik>
    </div>
  );
}
