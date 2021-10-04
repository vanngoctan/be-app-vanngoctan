import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

export default function EditUser() {
  const [User, setUser] = useState([]);

  let { id } = useParams();

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://api.3rebooks.com/user/get/${id}`, null, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      }
    }).then((response) => {
      setUser(response.data);
    });
  }, [id]);



  const initialValues = {
    userId: id,
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    workLocation: User.workLocation === "" ? "" : User.workLocation,
    hobbies: User.hobbies === "" ? "" : User.hobbies,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("You must input the first name!"),
    lastName: Yup.string().required("You must input the last name!"),
    email: Yup.string()
      .email("Invalid email!")
      .required("You must input the email!"),
    workLocation: Yup.string(),
    hobbies: Yup.string(),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`http://api.3rebooks.com/user/edit`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        history.push("/");
      })
      .catch((response) => {});
  };

  return (
    <div className="register-user-to-event">
      <h1>Edit User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="form-container">
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

          <label>Work Location: </label>

          <Field
            className="input"
            id="inputWorkLocation"
            name="workLocation"
            placeholder="Ho Chi Minh City"
            autoComplete="off"
          />

          <ErrorMessage name="workLocation" component="span" />

          <label>Hobbies: </label>

          <Field
            className="input"
            id="inputHobbies"
            name="hobbies"
            placeholder="Read books, Games"
            autoComplete="off"
          />
          <ErrorMessage name="hobbies" component="span" />

          <button className="join-btn" type="submit">
            Edit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
