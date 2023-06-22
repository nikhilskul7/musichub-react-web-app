import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { createEventThunk } from "./event-thunks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Alert } from "react-bootstrap";

const EventCreate = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titleAlert, setTitleAlert] = useState(false);
  const [summaryAlert, setSummaryAlert] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [dateAlert, setDateAlert] = useState(false);

  const createEvent = () => {
    setTitleAlert(false);
    setSummaryAlert(false);
    setPriceAlert(false);

    if (title.trim().length === "") {
      setTitleAlert(true);
    } else if (summary === "") {
      setSummaryAlert(true);
    } else if (price <= 0) {
      setPriceAlert(true);
    } else if (date.trim().length === 0 ) {
      setDateAlert(true);
    } else {
      dispatch(
        createEventThunk({
          title: title,
          description: summary,
          price: price,
          date: date
        })
      );
      navigate("/event");
    }
  };
  return (
    <div>
      <Link to={"/event"} className={"text-decoration-none text-secondary"}>
        <i className="bi bi-arrow-left me-1"></i>Back
      </Link>
      <h2 className="mt-3">Create an Event</h2>

      <Alert
        variant="danger"
        onClose={() => setTitleAlert(false)}
        className={titleAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter the title of the event!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setSummaryAlert(false)}
        className={summaryAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter the description of the event!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setPriceAlert(false)}
        className={priceAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter the price of the event!</span>
      </Alert>
      <Alert
        variant="danger"
        onClose={() => setDateAlert(false)}
        className={dateAlert ? "d-block" : "d-none"}
        dismissible
      >
        <span>Please enter the date of the event!</span>
      </Alert>

      <Container>
        <Form>
          <FloatingLabel controlId="eventTitle" label="Title *" className="my-3">
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="eventBody" label="Description *">
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: "15rem" }}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="eventPrice" label="Price *" className="mt-3">
            <Form.Control
              type="number"
              value={price}
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="eventDate" label="Date *" className="mt-3">
            <Form.Control
              type="date"
              value={date}
              placeholder="Date"
              onChange={(event) => setDate(event.target.value)}
            />
          </FloatingLabel>
        </Form>

        <Button onClick={createEvent} className={"mb-3 mt-5"}>
          Create Event
        </Button>
      </Container>
    </div>
  );
};

export default EventCreate;