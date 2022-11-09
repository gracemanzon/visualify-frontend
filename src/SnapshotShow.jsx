import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function SnapshotShow(props) {
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
    <div id="snapshot-show">
      <h1>Snapshot Show Action</h1>
      <h2>{snapshot.title}</h2>
      <p>
        {snapshot.start_date} - {snapshot.end_date}
      </p>
      <p>{snapshot.user_name}</p>

      <div>
        <Link to="/artists">Add Artists</Link>
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
