import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SnapshotsNew } from "./SnapshotsNew";
import { Modal } from "./Modal";
import { Header } from "./Header";
import { TopArtists } from "./TopArtists";
import { TopTracks } from "./TopTracks";
import { TopPlaylists } from "./TopPlaylists";
import { RecentlyPlayed } from "./RecentlyPlayed";

export function Home() {
  const params = useParams();
  console.log(params);
  const [snapshots, setSnapshots] = useState([]);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");
  const [isSnapshotsNewVisible, setIsSnapshotsNewVisible] = useState(false);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/home";
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
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ];
  const [token, setToken] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

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

    const playlistsresponse = axios
      .get("https://api.spotify.com/v1/me/playlists?limit=6", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((playlistsresponse) => {
        console.log(playlistsresponse.data.items);
        setTopPlaylists(playlistsresponse.data.items);
      });

    const recentlyplayedsresponse = axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=6", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((recentlyplayedsresponse) => {
        console.log(recentlyplayedsresponse.data.items);
        setRecentlyPlayed(recentlyplayedsresponse.data.items);
      });

    const tracksresponse = axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=6", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((tracksresponse) => {
        console.log(tracksresponse.data.items);
        setTopTracks(tracksresponse.data.items);
      });

    // console.log(topTracks);

    const artistsresponse = axios
      .get("https://api.spotify.com/v1/me/top/artists?limit=6", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((artistsresponse) => {
        console.log(artistsresponse.data.items);
        setTopArtists(artistsresponse.data.items);
      });

    // console.log(topArtists);
  }, []);

  const disconnectSpotify = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.location.href = "/home";
  };

  return (
    <div>
      <Header />
      <div id="dashboard" className="dashboard">
        <Modal show={isSnapshotsNewVisible} onClose={handleHideSnapshotsNew}>
          <SnapshotsNew />
        </Modal>

        <div className="dashboard-header">
          <div id="dashboard-user" className="dashboard-user">
            <img src={user?.avatar} />
            <div className="dashboard-user-log">
              <h2>Welcome back, {user?.name}!</h2>
            </div>
          </div>
          <div className="dashboard-btn-container">
            <button onClick={handleShowSnapshotsNew} className="custom-btn">
              Create Snapshot
            </button>
            {!token ? (
              <button className="custom-btn">
                <a
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    " "
                  )}&response_type=${responseType}`}
                  className="custom-link"
                >
                  Connect Spotify
                </a>
              </button>
            ) : (
              <button onClick={disconnectSpotify} className="custom-btn-2">
                Disconnect Spotify
              </button>
            )}
          </div>
        </div>

        <div id="dashboard-container" className="dashboard-container">
          <TopArtists topArtists={topArtists} />
          <TopTracks topTracks={topTracks} />
          <TopPlaylists topPlaylists={topPlaylists} />
          <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
        </div>

        {/* <div className="dashboard-container">
          <div id="dashboard-snapshots" className="dashboard-snapshots">
            <h3>Snapshots</h3>
            {snapshots?.map((snapshot) => (
              <div key={snapshot.id}>
                <Link to={`/snapshots/${snapshot.id}`} style={{ textDecoration: "none" }}>
                  <h4 className="custom-link">{snapshot.title}</h4>
                  <img src={snapshot.image} />
                </Link>
              </div>
            ))}
          </div>

          <div id="dashboard-artists" className="dashboard-artists">
            <h3>Top Artists</h3>
            {user.artists?.map((artist) => (
              <div>
                <h4>{artist.name}</h4>
                <img src={artist.image} />
              </div>
            ))}
          </div>

          <div id="dashboard-songs" className="dashboard-songs">
            <h3>Top Songs</h3>
            {user.songs?.map((song) => (
              <div>
                <h4>"{song.title}"</h4>
                <h4>{song.artist}</h4>
                <h4>
                  <em>{song.album}</em>
                </h4>
                <img src={song.album_art} />
              </div>
            ))}
          </div>

          <div id="dashboard-genres" className="dashboard-genres">
            <h3>Top Genres</h3>
            {user.genres?.map((genre) => (
              <div>
                <h4>{genre.title}</h4>
              </div>
            ))}
          </div>
        </div> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
