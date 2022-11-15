import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import { SnapshotsNew } from "./SnapshotsNew";
import { Modal } from "./Modal";
import { Header } from "./Header";
import { TopArtists } from "./TopArtists";
import { TopTracks } from "./TopTracks";
// import { TopPlaylists } from "./TopPlaylists";
import { RecentlyPlayed } from "./RecentlyPlayed";
import SpotifyPlayer from "react-spotify-player";
// import { roundToNearestMinutes } from "date-fns";
import { Footer } from "./Footer";

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
  const [webPlayerList, setWebPlayerList] = useState([]);

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
        console.log("playlists");
        console.log(playlistsresponse.data.items);
        setTopPlaylists(playlistsresponse.data.items);
        // console.log(playlistsresponse.data.items[4].id);
      });

    const recentlyplayedsresponse = axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=16", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((recentlyplayedsresponse) => {
        console.log("recently played");
        console.log(recentlyplayedsresponse.data.items);
        setRecentlyPlayed(recentlyplayedsresponse.data.items);
        setWebPlayerList(recentlyplayedsresponse.data.items[0].track.id);
        console.log("WEBPLAYER " + webPlayerList);
      });

    const tracksresponse = axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=16", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((tracksresponse) => {
        console.log("top tracks");
        console.log(tracksresponse.data.items);
        setTopTracks(tracksresponse.data.items);
      });

    // console.log(topTracks);

    const artistsresponse = axios
      .get("https://api.spotify.com/v1/me/top/artists?limit=16", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((artistsresponse) => {
        console.log("top artists");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create Snapshot");
    let snapshotForm = document.getElementById("newSnapshotForm");
    let title = snapshotForm.title.value;
    let image = snapshotForm.image.value;
    let startDate = snapshotForm.start_date.value;
    let endDate = snapshotForm.end_date.value;
    let allGenres = topArtists.map((artist) => artist.genres).map((genre) => genre);
    let mergedGenres = [].concat(...allGenres);
    let uniqueGenres = [...new Set(mergedGenres)];
    console.log("ALLGENRES " + mergedGenres);

    console.log(title);
    console.log(startDate);
    console.log(endDate);
    console.log(topArtists);
    console.log(topTracks);

    let formParams = {
      title: title,
      image: image,
      start_date: startDate,
      end_date: endDate,
      artists: topArtists,
      genres: uniqueGenres,
      tracks: topTracks,
      recently_played: recentlyPlayed,
    };

    handleCreateSnapshot(formParams);

    console.log(formParams);
    event.target.reset();
  };

  const handleCreateSnapshot = (formParams) => {
    axios
      .post("http://localhost:3000/snapshots.json", formParams, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newSnapshot = response.data;
        console.log("New snapshots!", newSnapshot);
        window.location.href = "/home";
      });
  };

  const size = {
    width: 900,
    height: 300,
  };
  const view = "coverart";
  const theme = "black";

  return (
    <div>
      <Header />
      <div id="dashboard" className="dashboard">
        <Modal show={isSnapshotsNewVisible} onClose={handleHideSnapshotsNew}>
          <div>
            <h3>New Snapshot</h3>

            <form onSubmit={handleSubmit} id="newSnapshotForm">
              <div>
                <input name="title" type="text" placeholder="title" id="title" />
              </div>
              <div>
                <input name="image" type="text" placeholder="image url" id="image" />
              </div>
              <div>
                <p>Start Date - End Date</p>
                <input name="start_date" type="date" />
              </div>
              <div>
                <input name="end_date" type="date" />
              </div>
              <div>
                <button type="submit" className="custom-btn-2">
                  Create Snapshot
                </button>
              </div>
            </form>
          </div>
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
          <div id="dashboard-snapshots" className="dashboard-snapshots">
            <h2>Snapshots</h2>
            <div className="snapshots-index-wrapper">
              {snapshots?.map((snapshot) => (
                <div key={snapshot.id} className="snapshots-index">
                  <Link to={`/snapshots/${snapshot.id}`} style={{ textDecoration: "none" }}>
                    <img src={snapshot.image} />
                  </Link>
                  <div>
                    <h3 className="custom-link">{snapshot.title}</h3>
                    <h3 className="custom-link">{snapshot.start_date}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="dashboard-container" className="dashboard-container">
          <TopArtists topArtists={topArtists} />
          <TopTracks topTracks={topTracks} />
          {/* <TopPlaylists topPlaylists={topPlaylists} /> */}
          <div className="webplayer">
            <h2>Last Played</h2>
            <SpotifyPlayer uri={`spotify:track:${webPlayerList}`} size={size} view={view} theme={theme} />
          </div>
          <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
