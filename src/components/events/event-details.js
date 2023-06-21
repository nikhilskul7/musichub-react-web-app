import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetailsThunk } from "./event-thunks";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { parseTime } from "./parseTime";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { userLikesNotesThunk } from "../likes/likes-thunks";

const EventDetails = () => {
  const { bid } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { eventById, loading, eventNotFoundError } = useSelector(
    (state) => state.event
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventDetailsThunk(bid));
  }, []);

  console.log(eventById);
  const aDay = new Date(eventById.time).getTime();
  console.log(parseTime(aDay));
  return (
    <div>
      <Link to={-1} className={"text-decoration-none text-secondary"}>
        <i className="bi bi-arrow-left me-1"></i>Back
      </Link>
      <Container>
        {eventNotFoundError ? (
          <Alert variant="danger" className={"mt-5"}>
            <Alert.Heading>Event not found!</Alert.Heading>
            <p>
              Please go back by clicking on the back icon or find another event
              in the Event tab.
            </p>
          </Alert>
        ) : (
          !loading && (
            <>
              <h1>{eventById.title}</h1>
              <div className={"text-secondary"}>
                {/*                    {*/}
                {/*                        eventById.host !== undefined &&*/}

                {/*                <span>By: <Link to={'/profile/' + eventById.host.hostId} className={' text-secondary'}>*/}
                {/*                    {eventById.host.hostName}*/}
                {/*                </Link></span> }*/}
                {eventById.host && (
                  <span>
                    <span>
                      By:{" "}
                      <Link
                        to={"/profile/" + eventById.host.hostId}
                        className={" text-secondary"}
                      >
                        {eventById.host.hostName}
                      </Link>
                    </span>
                    {/*<i onClick={() => {*/}
                    {/*    dispatch(userLikesNotesThunk(bid))*/}
                    {/*}} className={`${currentUser ? '' : 'd-none'} float-end bi bi-heart me-2`}></i>*/}
                  </span>
                )}
                <i className="bi bi-dot"></i>
                <span>{parseTime(eventById.date)}</span>
              </div>

              <hr />

              <ReactMarkdown children={eventById.event} />
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default EventDetails;
