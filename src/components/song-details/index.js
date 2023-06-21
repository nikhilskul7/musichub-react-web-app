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

  const ingredientList = [20];
  ingredientList[0] = song.strMeasure1 + " " + song.strIngredient1;
  ingredientList[1] = song.strMeasure2 + " " + song.strIngredient2;
  ingredientList[2] = song.strMeasure3 + " " + song.strIngredient3;
  ingredientList[3] = song.strMeasure4 + " " + song.strIngredient4;
  ingredientList[4] = song.strMeasure5 + " " + song.strIngredient5;
  ingredientList[5] = song.strMeasure6 + " " + song.strIngredient6;
  ingredientList[6] = song.strMeasure7 + " " + song.strIngredient7;
  ingredientList[7] = song.strMeasure8 + " " + song.strIngredient8;
  ingredientList[8] = song.strMeasure9 + " " + song.strIngredient9;
  ingredientList[9] = song.strMeasure10 + " " + song.strIngredient10;
  ingredientList[10] = song.strMeasure11 + " " + song.strIngredient11;
  ingredientList[11] = song.strMeasure12 + " " + song.strIngredient12;
  ingredientList[12] = song.strMeasure13 + " " + song.strIngredient13;
  ingredientList[13] = song.strMeasure14 + " " + song.strIngredient14;
  ingredientList[14] = song.strMeasure15 + " " + song.strIngredient15;
  ingredientList[15] = song.strMeasure16 + " " + song.strIngredient16;
  ingredientList[16] = song.strMeasure17 + " " + song.strIngredient17;
  ingredientList[17] = song.strMeasure18 + " " + song.strIngredient18;
  ingredientList[18] = song.strMeasure19 + " " + song.strIngredient19;
  ingredientList[19] = song.strMeasure20 + " " + song.strIngredient20;
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
          <h2>{song.strSong}</h2>
          <h5>
            <span className="badge bg-secondary">{song.strArea}</span>{" "}
            <span className="badge bg-secondary">{song.strCategory}</span>
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
                  alt={"Picture of " + song.strSong}
                  src={song.strSongThumb}
                />

                <h4>Youtube Video:</h4>
                {song.strYoutube && (
                  <YoutubeEmbed
                    embedId={song.strYoutube.substring(
                      song.strYoutube.indexOf("=") + 1
                    )}
                  />
                )}
              </Col>
              <Col>
                <h4>Ingredients:</h4>
                <ul>
                  {ingredientList.map(
                    (u) => !u.includes("null") && u.length > 2 && <li>{u}</li>
                  )}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {typeof song.strInstructions !== "undefined" &&
                    song.strInstructions
                      .split("\r\n")
                      .map(
                        (u) =>
                          u.length > 4 &&
                          !u.toLowerCase().includes("step") && <li>{u}</li>
                      )}
                </ol>
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
