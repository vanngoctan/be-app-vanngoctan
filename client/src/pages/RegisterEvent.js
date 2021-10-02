import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegisterEvent() {
  return (
    <div className="register-user-to-event">
      <Formik>
        <Form className="form-container">
          <label>First name: </label>
          <Field className="input" id="inputFirstName" name="firstName" placeholder="John" autocomplete="off"/>

          <label>Last name: </label>
          <Field className="input" id="inputLastName" name="lastName" placeholder="Smith" autocomplete="off"/>

          <label>Email: </label>
          <Field className="input" id="inputEmail" name="email" placeholder="john@example.com" autocomplete="off"/>

          <label>Work Location: </label>
          <Field className="input" id="inputWorkLocation" name="workLocation" placeholder="" autocomplete="off"/>

          <label>Hobbies: </label>
          <Field className="input" id="inputHobbies" name="hobbies" placeholder="" autocomplete="off"/>

          <button className="join-btn" type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
