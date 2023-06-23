import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getRandomSong } from "./getRandomSong";
import SongCard from "../song-card/songCard";

const RandomTracks = () => {
  const { tracks, loading } = useSelector((state) => state.randomSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomSong());
  }, [dispatch]);
console.log("here")
  console.log(tracks);

  return (
    <Row>
    {/**  {!loading &&
        tracks.map((track) => <SongCard key={track._id} song={track.title} />)}
     */}</Row>
  );
};

export default RandomTracks;