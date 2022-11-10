import { Link, useParams } from "react-router-dom";
import { Logout } from "./Logout";
import { useState, useEffect } from "react";
import axios from "axios";
import { SnapshotsNew } from "./SnapshotsNew";
import { Modal } from "./Modal";
import { Footer } from "./Footer";

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
      <Modal show={isSnapshotsNewVisible} onClose={handleHideSnapshotsNew}>
        <SnapshotsNew />
      </Modal>

      <h1>Visualify</h1>
      <div id="dashboard-user">
        <h2>{user?.name}</h2>
        <img src={user?.avatar} />
        <p>
          <Logout />
        </p>
      </div>
      <div id="dashboard-snapshots">
        <h2>Your Snapshots</h2>
        <button onClick={handleShowSnapshotsNew}>Create Snapshot</button>
        {snapshots?.map((snapshot) => (
          <div key={snapshot.id} id="snapshot-index">
            <Link to={`/snapshots/${snapshot.id}`}>
              <h2>{snapshot.title}</h2>
              <img src={snapshot.image} />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
