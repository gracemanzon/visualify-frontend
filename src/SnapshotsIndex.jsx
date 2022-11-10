import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SnapshotsNew } from "./SnapshotsNew";
import { Modal } from "./Modal";
import { Header } from "./Header";

export function SnapshotsIndex() {
  const params = useParams();
  console.log(params);
  const [snapshots, setSnapshots] = useState([]);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");
  const [isSnapshotsNewVisible, setIsSnapshotsNewVisible] = useState(false);

  const handleSnapshotsIndex = () => {
    console.log("handleSnapshotsIndex");
    axios.get("http://localhost:3000/snapshots.json").then((response) => {
      console.log(response.data);
      setSnapshots(response.data);
    });
  };

  const handleUserShow = () => {
    console.log("handleUserShow");
    axios.get("http://localhost:3000/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  const handleShowSnapshotsNew = () => {
    setIsSnapshotsNewVisible(true);
  };

  const handleHideSnapshotsNew = () => {
    setIsSnapshotsNewVisible(false);
    // window.location.href = "/snapshots/" + params.id;
  };

  useEffect(handleSnapshotsIndex, []);
  useEffect(handleUserShow, {});

  return (
    <div>
      <Header />
      <div id="snapshots-index" className="dashboard">
        <Modal show={isSnapshotsNewVisible} onClose={handleHideSnapshotsNew}>
          <SnapshotsNew />
        </Modal>

        <div id="dashboard-user" className="dashboard-user">
          <img src={user?.avatar} />
          <div className="dashboard-user-log">
            <h2>{user?.name}</h2>
          </div>
          <button onClick={handleShowSnapshotsNew} className="custom-btn-4">
            Create Snapshot
          </button>
        </div>

        <div className="dashboard-container">
          <div id="dashboard-snapshots" className="dashboard-snapshots">
            {snapshots?.map((snapshot) => (
              <div key={snapshot.id}>
                <Link to={`/snapshots/${snapshot.id}`} style={{ textDecoration: "none" }}>
                  <h2 className="custom-link">{snapshot.title}</h2>
                  <img src={snapshot.image} />
                </Link>
              </div>
            ))}
          </div>

          <div id="dashboard-artists" className="dashboard-artists">
            {user.artists?.map((artist) => (
              <div>
                <h2>{artist.name}</h2>
                <img src={artist.image} />
              </div>
            ))}
          </div>

          <div id="dashboard-songs" className="dashboard-songs">
            {user.songs?.map((song) => (
              <div>
                <h2>{song.title}</h2>
                <h2>{song.artist}</h2>
                <h2>{song.album}</h2>
                <img src={song.album_art} />
              </div>
            ))}
          </div>

          <div id="dashboard-genres" className="dashboard-genres">
            {user.genres?.map((genre) => (
              <div>
                <h2>{genre.title}</h2>
              </div>
            ))}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
