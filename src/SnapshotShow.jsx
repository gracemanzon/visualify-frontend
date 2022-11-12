import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ArtistsNew } from "./ArtistsNew";
import { SongsNew } from "./SongsNew";
import { GenresNew } from "./GenresNew";
import { Header } from "./Header";

export function SnapshotShow(props) {
  const params = useParams();
  console.log(params);
  const [snapshot, setSnapshot] = useState({});
  const [isArtistsNewVisible, setIsArtistsNewVisible] = useState(false);
  const [isSongsNewVisible, setIsSongsNewVisible] = useState(false);
  const [isGenresNewVisible, setIsGenresNewVisible] = useState(false);
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
      window.location.href = "/home";
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
    window.location.href = "/snapshots/" + params.id;
  };

  const handleShowSongsNew = () => {
    setIsSongsNewVisible(true);
  };

  const handleHideSongsNew = () => {
    setIsSongsNewVisible(false);
    window.location.href = "/snapshots/" + params.id;
  };

  const handleShowGenresNew = () => {
    setIsGenresNewVisible(true);
  };

  const handleHideGenresNew = () => {
    setIsGenresNewVisible(false);
    window.location.href = "/snapshots/" + params.id;
  };

  useEffect(handleSnapshotShow, []);

  return (
    <div>
      <Header />

      <Modal show={isArtistsNewVisible} onClose={handleHideArtistsNew}>
        <ArtistsNew />
      </Modal>

      <Modal show={isSongsNewVisible} onClose={handleHideSongsNew}>
        <SongsNew />
      </Modal>

      <Modal show={isGenresNewVisible} onClose={handleHideGenresNew}>
        <GenresNew />
      </Modal>

      <div id="snapshot-show" className="snapshot-show">
        <div className="snapshot-show-info">
          <div>
            <h1>{snapshot.title}</h1>
            <h3>
              {snapshot.start_date} - {snapshot.end_date}
            </h3>
          </div>

          <div>
            <button className="custom-btn-2">
              <Link to="/home" className="custom-link">
                Back to Dashboard
              </Link>
            </button>

            <button onClick={handleClick} className="custom-btn-2" style={{ color: "#d61313" }}>
              Delete Snapshot
            </button>
          </div>
        </div>

        <div className="snapshot-container">
          <div id="artists-index">
            <h3>Artists</h3>
            <button onClick={handleShowArtistsNew} className="custom-btn">
              Add Artists
            </button>
            {snapshot.artists?.map((artist) => (
              <div>
                <h4>{artist}</h4>
                {/* <img src={artist.image} /> */}
              </div>
            ))}
          </div>

          <div id="songs-index">
            <h3>Songs</h3>
            <button onClick={handleShowSongsNew} className="custom-btn">
              Add Songs
            </button>
            {snapshot.songs?.map((song) => (
              <div>
                <h4>"{song.title}"</h4>
                <h4>{song.artist}</h4>
                <h4>
                  <em>{song.album}</em>
                </h4>
                <img src={song.album_art} />
              </div>
            ))}
          </div>

          <div id="genres-index">
            <h3>Genres</h3>
            <button onClick={handleShowGenresNew} className="custom-btn">
              Add Genres
            </button>
            {snapshot.genres?.map((genre) => (
              <div>
                <h4>{genre.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
