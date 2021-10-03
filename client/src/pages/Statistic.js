import React from "react";
import axios from "axios";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Statistic() {
  const [Events, setEvents] = useState([]);
  const [User, setUser] = useState([]);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email!")
      .required("You must input the email!"),
  });

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3001/user/statistic`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
        setEvents(response.data.events);
      })
      .catch((response) => {
        console.log("Error");
      });
  };

  return (
    <div className="register-user-to-event">
      <h1>Input Email to show user statistic</h1>
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
            placeholder=""
            autoComplete="off"
          />
          <ErrorMessage name="email" component="span" />

          <button className="join-btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>

      <div style={{ width: "40%", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>User Infos</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Work Location</th>
              <th>Hobbies</th>
            </tr>

            <tr>
              <td>{User.id}</td>
              <td>
                {User.firstName} {User.lastName}
              </td>
              <td>{User.email}</td>
              <td>{User.workLocation}</td>
              <td>{User.hobbies}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <h2 style={{ textAlign: "center" }}>Joint Events</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>Id</th>
                <th>Event Name</th>
              </tr>

              {Events.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
