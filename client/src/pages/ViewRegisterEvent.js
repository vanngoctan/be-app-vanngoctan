import React from "react";
import Pagination from "pagination-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewRegisterEvent() {
  const [Event, setEvent] = useState([]);
  const [ListOfUsers, setListOfUsers] = useState([]);
  const [Page, setPage] = useState({ currentPage: 1, count: 0, maxPage: 1 });

  let { eventId } = useParams();

  const loadUser = (page) => {
    axios
      .get(`http://localhost:3001/view/${eventId}/page/${page}`)
      .then((response) => {
        setListOfUsers(response.data.result);
        setPage({
          currentPage: response.data.current,
          count: response.data.count,
          maxPage: response.data.pages,
        });
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${eventId}`).then((response) => {
      setEvent(response.data);
    });

    axios
      .get(`http://localhost:3001/view/${eventId}/page/${Page.currentPage}`)
      .then((response) => {
        setListOfUsers(response.data.result);
        setPage({
          currentPage: response.data.current,
          count: response.data.count,
          maxPage: response.data.pages,
        });
      });
  }, [eventId, Page.currentPage]);

  return (
    <div>
      <h1>List of Users registered for {Event.name}</h1>
      <ul>
        {
          ListOfUsers.map((value, key) => {
            return (<li key={key}>Name: {value.firstName} {value.lastName} | {value.email} | { Event.needInfo === "worklocation" ? "Work Location: " + value.workLocation : "Hobbies: " + value.hobbies}</li>);
          })
        }
      </ul>
      <Pagination
        initialPage={1}
        show={5}
        pageCount={Page.maxPage}
        onChange={(page) => loadUser(page)}
      >
        {({
          setPage,
          page,
          index,
          currentPage,
          isPrev,
          isNext,
          isCurrentPage,
        }) => {
          if (isPrev)
            return (
              <button
                className="join-btn page-style"
                onClick={() => {
                  setPage({ prev: true });
                }}
              >
                Previous
              </button>
            );

          if (isNext)
            return (
              <button
                className="join-btn page-style"
                onClick={() => {
                  setPage({ next: true });
                }}
              >
                Next
              </button>
            );

          return (
            <div
              key={index}
              className="page-style"
              style={{
                backgroundColor: isCurrentPage ? "lightskyblue" : "white",
              }}
              onClick={() => {
                setPage({ page });
              }}
            >
              <h5>{page}</h5>
            </div>
          );
        }}
      </Pagination>
    </div>
  );
}
