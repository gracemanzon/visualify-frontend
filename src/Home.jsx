import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
// import { SnapshotsIndex } from "./SnapshotsIndex";
// import { UserShow } from "./UserShow";

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
      <h1> Home! </h1>
      {/* <SnapshotsIndex snapshots={snapshots} /> */}
      <Login />
    </div>
  );
}
