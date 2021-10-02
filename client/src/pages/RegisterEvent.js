import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterEvent() {
  const [Event, setEvent] = useState([]);
  const [Error, setError] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${id}`).then((response) => {
      setEvent(response.data);
    });
  }, [id]);

  let iv;
  let vs;
  if (Event.needInfo === "worklocation") {
    iv = {
      firstName: "",
      lastName: "",
      email: "",
      workLocation: "",
    };

    vs = Yup.object().shape({
      firstName: Yup.string().required("You must input the first name!"),
      lastName: Yup.string().required("You must input the last name!"),
      email: Yup.string()
        .email("Invalid email!")
        .required("You must input the email!"),
      workLocation: Yup.string().required("You must input the work location!"),
    });
  } else {
    iv = {
      firstName: "",
      lastName: "",
      email: "",
      hobbies: "",
    };

    vs = Yup.object().shape({
      firstName: Yup.string().required("You must input the first name!"),
      lastName: Yup.string().required("You must input the last name!"),
      email: Yup.string()
        .email("Invalid email!")
        .required("You must input the email!"),
      hobbies: Yup.string().required("You must input the hobbies!"),
    });
  }

  const initialValues = iv;
  const validationSchema = vs;

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3001/register/${id}`, data)
      .then((response) => {})
      .catch((response) => {
        setError(response.data);
        console.log(response.data);
      });
  };

  return (
    <div className="register-user-to-event">
      <h1>Register for {Event.name}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-container">
          {Error.error !== undefined && (
            <span>This Email has been registered for this event</span>
          )}
          <label>First name: </label>
          <Field
            className="input"
            id="inputFirstName"
            name="firstName"
            placeholder="John"
            autoComplete="off"
          />
          <ErrorMessage name="firstName" component="span" />

          <label>Last name: </label>
          <Field
            className="input"
            id="inputLastName"
            name="lastName"
            placeholder="Smith"
            autoComplete="off"
          />
          <ErrorMessage name="lastName" component="span" />

          <label>Email: </label>
          <Field
            className="input"
            id="inputEmail"
            name="email"
            placeholder="john@example.com"
            autoComplete="off"
          />
          <ErrorMessage name="email" component="span" />

          <label
            style={{
              display:
                Event.needInfo === "worklocation" ? "inline-block" : "none",
            }}
          >
            Work Location:{" "}
          </label>

          <Field
            className="input"
            id="inputWorkLocation"
            name="workLocation"
            placeholder="Ho Chi Minh City"
            autoComplete="off"
            style={{
              display:
                Event.needInfo === "worklocation" ? "inline-block" : "none",
            }}
          />

          {Event.needInfo === "worklocation" && (
            <ErrorMessage name="workLocation" component="span" />
          )}

          <label
            style={{
              display:
                Event.needInfo !== "worklocation" ? "inline-block" : "none",
            }}
          >
            Hobbies:{" "}
          </label>

          <Field
            className="input"
            id="inputHobbies"
            name="hobbies"
            placeholder="Read books, Games"
            autoComplete="off"
            style={{
              display:
                Event.needInfo !== "worklocation" ? "inline-block" : "none",
            }}
          />
          {Event.needInfo !== "worklocation" && (
            <ErrorMessage name="hobbies" component="span" />
          )}

          <button className="join-btn" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
