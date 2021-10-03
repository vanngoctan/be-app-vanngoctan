import React from "react";
import { useHistory } from "react-router-dom";

export default function EventBanner(props) {
  let history = useHistory();

  return (
    <div className="event-banner">
      <h2>{props.title}</h2>
      <div>{props.description}</div>
      <br />
      <button
        className="join-btn-2"
        onClick={() => {
          history.push(`/register/${props.eventId}`);
        }}
      >
        Register
      </button>
      <button
        className="join-btn-2"
        onClick={() => {
          history.push(`/view/${props.eventId}`);
        }}
      >
        View Users
      </button>

      <button
        className="join-btn-2"
        onClick={() => {
          history.push(`/unsubscribe/${props.eventId}`);
        }}
      >
        Unsubcribe
      </button>
    </div>
  );
}
