import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
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
      <Login />
      <Signup />
      <h1> Home! </h1>
      <SnapshotsIndex snapshots={snapshots} />
    </div>
  );
}
