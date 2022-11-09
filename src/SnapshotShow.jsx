import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ArtistsNew } from "./ArtistsNew";
import { SongsNew } from "./SongsNew";

export function SnapshotShow(props) {
  const params = useParams();
  console.log(params);
  const [snapshot, setSnapshot] = useState({});
  const [isArtistsNewVisible, setIsArtistsNewVisible] = useState(false);
  const [isSongsNewVisible, setIsSongsNewVisible] = useState(false);
  // const { id } = useParams();

  const handleSnapshotShow = (snapshot) => {
    axios.get("http://localhost:3000/snapshots/" + params.id + ".json").then((response) => {
      console.log(response.data);
      setSnapshot(response.data);
    });
  };

  const handleDestroySnapshot = (snapshot) => {
    axios.delete("http://localhost:3000/snapshots/" + params.id + ".json").then((response) => {
      console.log("Snapshot has been Deleted");
      window.location.href = "/snapshots";
    });
  };

  const handleClick = () => {
    handleDestroySnapshot();
  };

  const handleShowArtistsNew = () => {
    setIsArtistsNewVisible(true);
  };

  const handleHideArtistsNew = () => {
    setIsArtistsNewVisible(false);
  };

  const handleShowSongsNew = () => {
    setIsSongsNewVisible(true);
  };

  const handleHideSongsNew = () => {
    setIsSongsNewVisible(false);
  };

  useEffect(handleSnapshotShow, []);

  return (
    <div id="snapshot-show">
      <h1>Snapshot Show Action</h1>
      <h2>{snapshot.title}</h2>
      <p>
        {snapshot.start_date} - {snapshot.end_date}
      </p>
      <Modal show={isArtistsNewVisible} onClose={handleHideArtistsNew}>
        <ArtistsNew />
      </Modal>

      <Modal show={isSongsNewVisible} onClose={handleHideSongsNew}>
        <SongsNew />
      </Modal>

      <div>
        {/* <Link to="/artists">Add Artists</Link> */}
        <Link to="/songs">Add Songs</Link>
        <Link to="/genres">Add Genres</Link>
        <Link to="/snapshots">Back to Dashboard</Link>
        <button onClick={handleClick}>
          <p>Delete Snapshot</p>
        </button>
        <button onClick={handleShowArtistsNew}>Add Artists</button>
        <button onClick={handleShowSongsNew}>Add Songs</button>
      </div>

      <div id="artists-index">
        <h3>Top Artists</h3>
        {snapshot.artists?.map((artist) => (
          <div>
            <img src={artist.image} />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>

      <div id="songs-index">
        <h3>Top Songs</h3>
        {snapshot.songs?.map((song) => (
          <div>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <p>{song.album}</p>
            <img src={song.album_art} />
          </div>
        ))}
      </div>

      <div id="genres-index">
        <h3>Top Genres</h3>
        {snapshot.genres?.map((genre) => (
          <div>
            <p>{genre.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
