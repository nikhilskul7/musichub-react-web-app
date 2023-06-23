import axios from "axios";

const SEARCH_URL1 = "https://deezerdevs-deezer.p.rapidapi.com/track/623698142";
const SEARCH_URL2 = "https://deezerdevs-deezer.p.rapidapi.com/track/2007136147";
const SEARCH_URL3 = "https://deezerdevs-deezer.p.rapidapi.com/track/1977132317";
const SEARCH_URL4 = "https://deezerdevs-deezer.p.rapidapi.com/track/2105158337";

const fetchRandomSong = async () => {
  const response1 = await axios.get(`${SEARCH_URL1}`, {
    headers: {
      'X-RapidAPI-Key': 'd29c6b0474mshfc0edaba12a558cp153be5jsne19e37006e97', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response2 = await axios.get(`${SEARCH_URL2}`, {
    headers: {
      'X-RapidAPI-Key': 'd29c6b0474mshfc0edaba12a558cp153be5jsne19e37006e97', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response3 = await axios.get(`${SEARCH_URL3}`, {
    headers: {
      'X-RapidAPI-Key': 'd29c6b0474mshfc0edaba12a558cp153be5jsne19e37006e97', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });
  const response4 = await axios.get(`${SEARCH_URL4}`, {
    headers: {
      'X-RapidAPI-Key': 'd29c6b0474mshfc0edaba12a558cp153be5jsne19e37006e97', // Replace with your RapidAPI key
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    },
  });

  console.log(response1.data.title);
  console.log(response2.data.title);
  console.log(response3.data.title);
  console.log(response4.data.title);
  return [
    response1.data.title[0],
    response2.data.songs[0],
    response3.data.songs[0],
    response4.data.songs[0],
  ];
};

export default fetchRandomSong;