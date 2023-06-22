import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllEventsThunk } from "./event-thunks";
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
    <div>
      {currentUser !== null &&
        (currentUser.role === "MUSIC-CREATOR" || currentUser.role === "ADMIN") && (
          <Button onClick={() => navigate("create")}>Create</Button>
        )}
      <h2 className="mt-4">Recent Event</h2>
      <ul className={"list-group mt-4"}>
        {event.map((e) => (
          <li
            className={"list-group-item wd-cursor-pointer"}
            onClick={() => navigate("details/" + e._id)}
            key={e._id}
          >
            <h5>{e.title}</h5>

            <div className={"text-secondary"}>
              <span>{e.host.hostName}</span>
              <i className="bi bi-dot"></i>
              <span>{new Date(e.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Event;
