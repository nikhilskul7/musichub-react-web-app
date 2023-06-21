import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const NOTES_REVIEWS_API = BASE_API_URL + "/api/reviews/song";
const HOST_REVIEWS_API = BASE_API_URL + "/api/users";

const api = axios.create({ withCredentials: true });

export const createReview = async (review) => {
  console.log(review);
  const response = await api.post(
    `${NOTES_REVIEWS_API}/${review.idSong}`,
    review
  );
  return response.data;
};

export const updateReviewService = async (comment) => {
  const response = await api.put(`${NOTES_REVIEWS_API}/${comment._id}`, comment);
  return response.data;
};

export const deleteReviewService = async (commentID) => {
  const response = await api.delete(`${NOTES_REVIEWS_API}/${commentID}`);
  return response.data;
};

export const findReviewsByNotes = async (idSong) => {
  const response = await api.get(`${NOTES_REVIEWS_API}/${idSong}`);
  return response.data;
};

export const findReviewsByHost = async (host) => {
  const response = await api.get(`${HOST_REVIEWS_API}/${host}/reviews`);
  return response.data;
};
