import axios from "axios";
import { useEffect, useState } from "react";
import { TopTracks } from "./TopTracks";
// import { Buffer } from "buffer";

export function SpotifyAuth() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/snapshots";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
  ];

  const [token, setToken] = useState("");
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    console.log(token);
    setToken(token);

    const tracksresponse = axios
      .get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((tracksresponse) => {
        console.log(tracksresponse.data.items);
        setTopTracks(tracksresponse.data.items);
      });

    console.log(topTracks);
  }, []);

  const disconnectSpotify = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.location.href = "/snapshots";
  };

  return (
    <div>
      <p>hello</p>
      {!token ? (
        <a
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            " "
          )}&response_type=${responseType}`}
          className="custom-btn-5"
        >
          Connect Spotify
        </a>
      ) : (
        <button onClick={disconnectSpotify} className="custom-btn-2">
          Disconnect Spotify
        </button>
      )}
      <TopTracks topTracks={topTracks} />
    </div>
  );
}
