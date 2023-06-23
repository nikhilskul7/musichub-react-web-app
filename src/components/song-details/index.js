import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { songDetailsThunks } from "./song-details-thunks";
import YoutubeEmbed from "./youtube-embed";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  createReviewThunk,
  findReviewsByNotesThunk,
} from "../reviews/reviews-thunks";
import { userLikesNotesThunk } from "../likes/likes-thunks";
import CommentComponent from "./comment-component";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const USERS_URL = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

const SongDetails = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { song, loading } = useSelector((state) => state.songDetails);
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { mid } = useParams();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    dispatch(songDetailsThunks(mid));

    dispatch(findReviewsByNotesThunk(mid));
  }, []);

  const postSongComment = () => {
    const review = {
      idSong: song.idSong,
      review: comment,
    };
    dispatch(createReviewThunk(review));
    setComment("");
    dispatch(findReviewsByNotesThunk(mid));
  };

  const reloadComments = () => {
    dispatch(findReviewsByNotesThunk(mid));
  };

  useEffect(() => {
    if (currentUser) {
      api.get(`${USERS_URL}/${currentUser._id}/likes`).then((response) => {
        setUserLikes(response.data);
        const isLiked = response.data.some(
          (like) => like.idSong === song.idSong && like.liked
        );
        setLiked(isLiked);
      });
    }
  }, [currentUser, song.idSong]);

  const toggleSongLike = () => {
    if (!liked) {
      const like = {
        idSong: song.idSong,
      };
      dispatch(userLikesNotesThunk(like));
      setLiked(true);
    } else {
      api
        .delete(`${USERS_URL}/${currentUser._id}/likes/${song.idSong}`)
        .then(() => {
          setLiked(false);
          setUserLikes(userLikes.filter((like) => like.idSong !== song.idSong));
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  function handleGoBack(event) {
    event.preventDefault();
    navigate(-2);
  }

  return (
    <div className={"mt-3"}>
      <div className={"mb-2"}>
        <a
          onClick={handleGoBack}
          href="src/components/song-details#"
          className={"text-decoration-none text-secondary"}
        >
          <i className="bi bi-arrow-left me-1"></i>Back
        </a>
      </div>
      {!loading && (
        <>
          <h2>{song.title}</h2>
          <h5>
            <span className="badge bg-secondary">{song.artist}</span>{" "}
            <span className="badge bg-secondary">{song.album_name}</span>
            <span
              className="wd-float-right wd-font-size-15px"
              disabled={!currentUser}
              onClick={() => toggleSongLike()}
            >
              {currentUser && liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-yellow" icon={faSolidStar} />
                </span>
              )}
              {currentUser && !liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-gray" icon={faStar} />
                </span>
              )}
            </span>
          </h5>
          <Container>
            <Row>
              <Col sm={"12"} md={"6"}>

                <img
                  className={"w-100 mb-3"}
                  alt={"Picture of " + song.title}
                  src={song.cover_big}
                />

                <h4>MP3:</h4>
                {song.preview && (
                  <audio controls>
                    <source src={song.preview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </Col>

            </Row>
          </Container>
          <hr />

          <h4>
            Comments
            <span className={"text-secondary"}>
              <i className="bi bi-dot"></i>
              {reviews.length}
            </span>
          </h4>
          <Container>
            {currentUser ? (
              <Form>
                <Form.Group className={"mb-2"}>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Leave a comment here"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      style={{ height: "6rem" }}
                    />
                  </FloatingLabel>
                  <Form.Text>Logged in as {currentUser.username}.</Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => postSongComment()}
                  disabled={comment === ""}
                >
                  Post Comment
                </Button>
              </Form>
            ) : (
              <Alert variant={"warning"} className={"mb-3"}>
                Please login to comment.
              </Alert>
            )}
            <ul className={"list-group mb-3 mt-3"}>
              {reviews.map((u) => (
                <CommentComponent u={u} rerender={reloadComments} key={u._id} />
              ))}
            </ul>
          </Container>
        </>
      )}
    </div>
  );
};

export default SongDetails;
