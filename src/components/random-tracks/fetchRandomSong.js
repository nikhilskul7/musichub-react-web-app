import axios from "axios";

const SEARCH_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

const fetchRandomSong = async () => {
  const response1 = await axios.get(`${SEARCH_URL}`);
  const response2 = await axios.get(`${SEARCH_URL}`);
  const response3 = await axios.get(`${SEARCH_URL}`);
  const response4 = await axios.get(`${SEARCH_URL}`);
  return [
    response1.data.songs[0],
    response2.data.songs[0],
    response3.data.songs[0],
    response4.data.songs[0],
  ];
};

export default fetchRandomSong;