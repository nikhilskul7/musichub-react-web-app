import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllEventsThunk } from "./event-thunks";
import { parseTime } from "./parseTime";
import { Link } from "react-router-dom";
import { userLikesNotesThunk } from "../likes/likes-thunks";
import { followUserThunk } from "../follows/follows-thunks";
import "../index.css";

const events = [
  {
    _id: "123",
    title: "event1",
    username: "bob",
    summary: "this is event 1",
    date: "2023-12-12",
  },
  {
    _id: "234",
    title: "event2",
    username: "alice",
    summary: "this is event2",
    date: "2024-04-17",
  },
];

const Event = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { event, loading } = useSelector((state) => state.event);

  const [liked, setLiked] = useState(false);
  const handleLikeBtn = () => {
    dispatch(userLikesNotesThunk());
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
      <h2>Recent Event</h2>
      <ul className={"list-group"}>
        {event.map((e) => (
          <li
            className={"list-group-item wd-cursor-pointer"}
            onClick={() => navigate("details/" + e._id)}
            key={e._id}
          >
            <h5>{e.title}</h5>

            <div className={"text-secondary"}>
              <span>By: {e.host.hostName}</span>
              <i className="bi bi-dot"></i>
              <span>{parseTime(e.date)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Event;
