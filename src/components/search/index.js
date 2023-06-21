import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { findFoodBySearchTermThunk } from "./search-thunks";
import SongCard from "../song-card/songCard";
import Row from "react-bootstrap/Row";
import { useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const { searchName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchName || "");
  const { recipes, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findFoodBySearchTermThunk(searchTerm));
  }, [searchTerm]);

  const searchHandle = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <h2>Search</h2>
      <div>
        <button className="btn btn-primary float-end" onClick={searchHandle}>
          Search
        </button>
        <input
          className="form-control w-75"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
      </div>
      <Row>
        {recipes &&
          recipes.map((song) => <SongCard song={song} key={song.idSong} />)}
      </Row>
    </>
  );
};

export default Search;