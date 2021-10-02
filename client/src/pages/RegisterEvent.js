import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegisterEvent() {
  const [Event, setEvent] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${id}`).then((response) => {
      setEvent(response.data);
      console.log(response.data);
    });
  }, [id]);

  if (Event.needInfo === "worklocation") {
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      workLocation: "",
    };
  } else {
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      hobbies: "",
    };
  }

  return (
    <div className="register-user-to-event">
      <Formik>
        <Form className="form-container">
          <label>First name: </label>
          <Field
            className="input"
            id="inputFirstName"
            name="firstName"
            placeholder="John"
            autoComplete="off"
          />

          <label>Last name: </label>
          <Field
            className="input"
            id="inputLastName"
            name="lastName"
            placeholder="Smith"
            autoComplete="off"
          />

          <label>Email: </label>
          <Field
            className="input"
            id="inputEmail"
            name="email"
            placeholder="john@example.com"
            autoComplete="off"
          />

          {Event.needInfo === "worklocation" && (<label>Work Location: </label>)}
          {Event.needInfo === "worklocation" && (
            <Field
              className="input"
              id="inputWorkLocation"
              name="workLocation"
              placeholder=""
              autoComplete="off"
            />
          )}

          {Event.needInfo !== "worklocation" && (<label>Hobbies: </label>)}
          {Event.needInfo !== "worklocation" && (
            <Field
              className="input"
              id="inputHobbies"
              name="hobbies"
              placeholder=""
              autoComplete="off"
            />
          )}

          <button className="join-btn" type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
