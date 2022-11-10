import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";

export function Home() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");

  const handleUserShow = () => {
    console.log("handleUserShow");
    axios.get("http://localhost:3000/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  useEffect(handleUserShow, {});

  return (
    <div className="home">
      <div className="brand">
        <a href="https://open.spotify.com/" target="blank">
          <img src="/src/assets/Spotify_Icon_RGB_Green.png" alt="spotify logo" />
        </a>
        <h2> + </h2>
        <h1>Data Visualizer</h1>
      </div>
      <Login />
    </div>
  );
}
