import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetailsThunk } from "./event-thunks";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";

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
              Please navigate back or choose another event.
            </p>
          </Alert>
        ) : (
          !loading && (
            <>
              <h1 className="mt-3">{eventById.title}</h1>
              <div className={"text-secondary"}>
                {eventById.host && (
                  <span>
                    <span> 
                      Hosted by:{" "}
                      <Link
                        to={"/profile/" + eventById.host.hostId}
                        className={" text-secondary"}
                      >
                        {eventById.host.hostName}
                      </Link>
                    </span>
                  </span>
                )}
              </div>
              <h5 className="mt-4">
                {new Date(eventById.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h5>
              <hr/>
              <div className="mt-4">
                {eventById.description}
              </div>
              <hr/>
              <h4 className="mt-4">
                {eventById.price} $
              </h4>
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default EventDetails;
