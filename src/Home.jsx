import axios from "axios";
import { useState, useEffect } from "react";
import { Logout } from "./Logout";
import { SnapshotsIndex } from "./SnapshotsIndex";

export function Home() {
  const [snapshots, setSnapshots] = useState([]);

  const handleSnapshotsIndex = () => {
    console.log("handleSnapshotsIndex");
    axios.get("http://localhost:3000/snapshots.json").then((response) => {
      console.log(response.data);
      setSnapshots(response.data);
    });
  };

  useEffect(handleSnapshotsIndex, []);

  return (
    <div>
      <Logout />

      <h1> Home! </h1>
      <SnapshotsIndex snapshots={snapshots} />
    </div>
  );
}
