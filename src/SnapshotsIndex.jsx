import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import { useState, useEffect } from "react";
import axios from "axios";
import { SnapshotsNew } from "./SnapshotsNew";

export function SnapshotsIndex() {
  const [snapshots, setSnapshots] = useState([]);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");

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

  useEffect(handleSnapshotsIndex, []);
  useEffect(handleUserShow, {});

  return (
    <div>
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
        {snapshots?.map((snapshot) => (
          <div key={snapshot.id} id="snapshot-index">
            <Link to={`/snapshots/${snapshot.id}`}>
              <h2>{snapshot.title}</h2>
              <img src={snapshot.image} />
            </Link>
          </div>
        ))}
      </div>
      <SnapshotsNew />
    </div>
  );
}
