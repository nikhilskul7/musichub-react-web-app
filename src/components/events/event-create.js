import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { createEventThunk } from "./event-thunks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Alert } from "react-bootstrap";
import "./index.css";

const EventCreate = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titleAlert, setTitleAlert] = useState(false);
  const [summaryAlert, setSummaryAlert] = useState(false);

  const createEvent = () => {
    setTitleAlert(false);
    setSummaryAlert(false);

    if (title === "") {
      setTitleAlert(true);
    } else if (summary === "") {
      setSummaryAlert(true);
    } else {
      dispatch(
        createEventThunk({
          title: title,
          description: summary,
        })
      );
      navigate("/event");
    }
  };
  return (
    <div className="createEventContainer">
    <Link to="/event" className="backLink">
      <i className="bi bi-arrow-left me-1"></i>Back
    </Link>
    <h2 className="sectionTitle">Create an Event</h2>

    <Alert
      variant="danger"
      onClose={() => setTitleAlert(false)}
      className={titleAlert ? "alertVisible" : "alertHidden"}
      dismissible
    >
      Please enter the title of the event!
    </Alert>
    <Alert
      variant="danger"
      onClose={() => setSummaryAlert(false)}
      className={summaryAlert ? "alertVisible" : "alertHidden"}
      dismissible
    >
      Please enter the description of the event!
    </Alert>

    <Container>
      <span className="text-muted">Create your event here</span>
      <Form>
        <FloatingLabel controlId="eventTitle" label="Title *" className="mb-3">
          <Form.Control
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="eventBody" label="Body *">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: "15rem" }}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </FloatingLabel>
        <Form.Text id="passwordHelpBlock" muted>
          Create your event using Markdown.
        </Form.Text>
      </Form>

      <hr />

      <span className="text-muted">Preview</span>
      <h3 className="previewTitle">{title}</h3>
      <ReactMarkdown children={summary} />

      <Button onClick={createEvent} className="publishButton">
        Publish Event
      </Button>
    </Container>
  </div>
  );
};

export default EventCreate;
