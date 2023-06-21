import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getRandomSong } from "./getRandomSong";
import SongCard from "../song-card/songCard";

const RandomRecipes = () => {
  const { recipes, loading } = useSelector((state) => state.randomSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomSong());
  }, [dispatch]);

  console.log(recipes);

  return (
    <Row>
      {!loading &&
        recipes.map((recipe) => <SongCard key={recipe.idSong} song={recipe} />)}
    </Row>
  );
};

export default RandomRecipes;