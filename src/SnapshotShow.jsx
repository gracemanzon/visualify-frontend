import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function SnapshotShow() {
  const params = useParams();
  console.log(params);
  const [snapshot, setSnapshot] = useState({});

  const handleSnapshotShow = (snapshot) => {
    axios.get("http://localhost:3000/snapshots/" + params.id + ".json").then((response) => {
      console.log(response.data);
      setSnapshot(response.data);
    });
  };

  useEffect(handleSnapshotShow, []);

  return (
    <div>
      <h1>Snapshot Show Action</h1>
      <h2>{snapshot.title}</h2>
    </div>
  );
}
