import axios from "axios";

const SEARCH_URL = process.env.REACT_APP_SONG_DETAILS;

export const songDetailsService = async (mid) => {
  
  const songdbResponse = await axios.get(`${SEARCH_URL}${mid}`, {
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'd29c6b0474mshfc0edaba12a558cp153be5jsne19e37006e97',
    }
  });
 
  const obj=JSON.stringify(songdbResponse.data);

  const obje2=JSON.parse(obj);
  let result = [];

    if (obje2) {
      /**Object.entries(obje2).forEach(prop => result.push({
        "idSong": prop.id
       
      }));**/
      result.id=obje2.id;
      result.title= obje2.title;
      result.artist=obje2.artist.name;
      result.album_name=obje2.album.title;
      result.cover_big = obje2.album.cover_big;
      result.preview = obje2.preview;
    }

  return result;
};
 

export const getSongReviewsService = async (mid) => {
  const reponse = await axios.get(`$`);
};

export const postSongCommentService = async (comment) => {};
