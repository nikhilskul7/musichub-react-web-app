import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllEventsThunk } from "./event-thunks";
import { parseTime } from "./parseTime";


import "../index.css";


const Event = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { event, loading } = useSelector((state) => state.event);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleEventHover = (eventId) => {
    setHoveredEvent(eventId);
  };

  const handleEventClick = (eventId) => {
    navigate("details/" + eventId);
  };
  
  useEffect(() => {
    dispatch(getAllEventsThunk());
  }, []);

  console.log(event, loading);
  return (
    <div className="eventListContainer">
   
    <h2 className="sectionTitle">Recent Events</h2>
    <ul className="list-group eventList">
      {event.map((event) => (
        <li
          key={event._id}
          className={
            "list-group-item wd-cursor-pointer" +
            (hoveredEvent === event._id ? " active" : "")
          }
          onClick={() => handleEventClick(event._id)}
          onMouseEnter={() => handleEventHover(event._id)}
          onMouseLeave={() => handleEventHover(null)}
        >
          <h5 className="eventTitle">{event.title}</h5>
          <div className="eventDetails">
            <span className="hostName">By: {event.host.hostName}</span>
            <span className="dotSeparator">&#8226;</span>
            <span className="eventDate">{parseTime(event.date)}</span>
          </div>
        </li>
      ))}
    </ul>
    <br></br>
    
    <br></br>
    {currentUser !== null &&
      (currentUser.role === "MUSIC-CREATOR" ||
        currentUser.role === "ADMIN") && (
        <Button className="createButton" onClick={() => navigate("create")}>
          Create
        </Button>
      )}
  </div>
  );
};
export default Event;
