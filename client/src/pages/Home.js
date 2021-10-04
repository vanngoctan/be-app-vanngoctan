import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EventBanner from "../components/EventBanner";

export default function Home() {
  const [listOfEvents, setListOfEvents] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_PATH}/events/`).then((response) => {
      setListOfEvents(response.data);
    });
  }, []);

  return (
    <div>
      {listOfEvents.map((value, key) => {
        return (
          <EventBanner
            key={key}
            eventId={value.id}
            title={value.name}
            description={value.description}
          />
        );
      })}
    </div>
  );
}
