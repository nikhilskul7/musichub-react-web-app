import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Chart from "./chart";
import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";

function AdminDashboard() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const api = axios.create({ withCredentials: true });

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/stats`);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    getStats();
  }, [MONTHS]);

  const monthlyUserStats = userStats.slice(0, 12);

  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("http://localhost:4000/api/reviews").then((response) => {
      setReviews(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("http://localhost:4000/event").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const handleReviewDelete = (id) => {
    api
      .delete(`http://localhost:4000/api/reviews/meal/${id}`)
      .then(() => {
        const updatedReviews = reviews.filter((review) => review._id !== id);
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error(`Error deleting event with id ${id}: ${error.message}`);
      });
  };

  const handleEventDelete = (id) => {
    api
      .delete(`http://localhost:4000/event/${id}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error(`Error deleting event with id ${id}: ${error.message}`);
      });
  };

  return (
    <div className="home">
      <h2>Monthly New Users</h2>
      <Chart data={monthlyUserStats} title="" grid dataKey="New Users" />

      {reviews.length > 0 && (
        <div className="reviews">
          <h2>All Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.review}</p>
                <Button
                  variant={"danger"}
                  className={"me-2"}
                  onClick={() => handleReviewDelete(review._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {events.length > 0 && (
        <div className="events">
          <h2>All Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <h5>{event.title}</h5>
                <p>Host: {event.host.hostName}</p>
                <p>{event.event}</p>
                <Button
                  variant={"danger"}
                  className={"me-2"}
                  onClick={() => handleEventDelete(event._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
