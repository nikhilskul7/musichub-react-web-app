import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SongCard = ({ song }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/song/details/${song.idSong}`);
  };

  return (
    <Col sm={6} md={6} lg={3}>
      <Card className="mt-2 mb-2 h-100">
        <Card.Img variant="top" src={song.strSongThumb} />
        <Card.Body>
          <Card.Title>{song.strSong}</Card.Title>
          <Card.Text>
            <h5>
              <span className="badge bg-secondary">{song.strArea}</span>{" "}
              <span className="badge bg-secondary">{song.strCategory}</span>
            </h5>
            <Button onClick={handleClick}>View Details</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SongCard;
