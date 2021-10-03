import React from "react";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_API_PATH}/auth/logout`,JSON.stringify({
        userId: sessionStorage.getItem("userId"),
      }), {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        }
      })
      .then((response) => {
        if (response.data.error) {
          //setAuthState(false);
        } else {
          setAuthState(false);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("userId");
          history.push("/");
        }
      });
  }, [setAuthState, history]);

  return <div></div>;
}
