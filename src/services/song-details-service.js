import axios from "axios";

const SEARCH_URL = process.env.REACT_SONG_DETAILS || "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export const songDetailsService = async (mid) => {
  const songdbResponse = await axios.get(`${SEARCH_URL}${mid}`);
  return songdbResponse.data.songs[0];
};

export const getSongReviewsService = async (mid) => {
  const reponse = await axios.get(`$`);
};

export const postSongCommentService = async (comment) => {};
