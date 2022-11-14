import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import Plot from "react-plotly.js";
import { randomHexColor } from "random-hex-color-generator";

export function SnapshotShow(props) {
  const params = useParams();
  console.log(params);
  const [snapshot, setSnapshot] = useState({});
  let plotData = [];
  let artistsData = [];
  let tracksData = [];
  let genresData = [];
  let followersData = [];
  let popularityData = [];
  let trackPopularityData = [];
  let recentlyPlayedData = [];
  let recentlyPlayedPopularityData = [];

  const handleSnapshotShow = (snapshot) => {
    axios.get("http://localhost:3000/snapshots/" + params.id + ".json").then((response) => {
      console.log(response.data);
      setSnapshot(response.data);
    });
  };

  const handleDestroySnapshot = (snapshot) => {
    axios.delete("http://localhost:3000/snapshots/" + params.id + ".json").then((response) => {
      console.log("Snapshot has been Deleted");
      window.location.href = "/home";
    });
  };

  const handleClick = () => {
    handleDestroySnapshot();
  };

  {
    snapshot.artists?.map((each) => {
      artistsData.push(each);
      plotData["artists"] = artistsData;
      return plotData;
    });
  }
  {
    console.log(artistsData);
  }

  {
    snapshot.tracks?.map((each) => {
      tracksData.push(each);
      plotData["tracks"] = tracksData;
      return plotData;
    });
  }
  {
    console.log(tracksData);
  }

  {
    snapshot.genres?.map((each) => {
      genresData.push(each);
      plotData["genres"] = genresData;
      return plotData;
    });
  }
  {
    console.log(genresData);
  }

  {
    snapshot.artist_popularity?.map((each) => {
      popularityData.push(each);
      plotData["popularity"] = popularityData;
      return plotData;
    });
  }
  {
    console.log(popularityData);
  }

  {
    snapshot.artist_followers?.map((each) => {
      followersData.push(each);
      plotData["followers"] = followersData;
      return plotData;
    });
  }
  {
    console.log(followersData);
  }

  {
    snapshot.track_popularity?.map((each) => {
      trackPopularityData.push(each);
      plotData["trackPopularity"] = trackPopularityData;
      return plotData;
    });
  }

  {
    snapshot.recently_played?.map((each) => {
      recentlyPlayedData.push(each);
      plotData["recentlyPlayed"] = recentlyPlayedData;
      return plotData;
    });
  }

  {
    snapshot.recently_played_popularity?.map((each) => {
      recentlyPlayedPopularityData.push(each);
      plotData["recentlyPlayedPopularity"] = recentlyPlayedPopularityData;
      return plotData;
    });
  }

  {
    console.log(trackPopularityData);
  }

  useEffect(handleSnapshotShow, []);

  let genres = snapshot.genres?.map((title) => title);
  let uniqueGenres = [...new Set(genres)];
  // console.log("OMG " + genres);
  // console.log("OMG " + uniqueGenres);

  return (
    <div>
      <Header />
      <div id="snapshot-show" className="snapshot-show">
        <div className="snapshot-show-info">
          <div className="snapshot-header">
            <img src={snapshot.image} />
            <h2>{snapshot.title}</h2>
            <h3>
              <em>
                {snapshot.start_date} - {snapshot.end_date}
              </em>
            </h3>
            <div className="snapshot-show-btn-container">
              <button className="custom-btn">
                <Link to="/home" className="custom-link">
                  Dashboard
                </Link>
              </button>

              <button onClick={handleClick} className="custom-btn-2" style={{ color: "#d61313" }}>
                Delete Snapshot
              </button>
            </div>
          </div>
        </div>

        <div className="snapshot-container">
          <div id="artists-index">
            <h2>Featured Artists</h2>
            <div className="artists-index">
              <div className="artists-index-art">
                {snapshot.artist_images?.map((image) => (
                  <img src={image} />
                ))}
              </div>
            </div>
          </div>

          <div className="quick-details">
            <h3>Your Favorite Song: </h3>
            {/* {snapshot.tracksData[0]} */}
          </div>

          <div id="snapshot-plots" className="snapshot-plots">
            <Plot
              data={[
                {
                  x: artistsData,
                  y: followersData,
                  type: "scatter",
                  mode: "markers",
                  marker: {
                    color: [
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                      randomHexColor(),
                    ],
                    size: popularityData,
                    symbol: "circle",
                  },
                },
              ]}
              layout={{
                width: 600,
                height: 600,
                margin: {
                  l: 32,
                  r: 0,
                },
                plot_bgcolor: "#191414",
                paper_bgcolor: "#191414",
                font: {
                  size: 12,
                  color: "#ffffff",
                },
              }}
              config={{
                scrollZoom: true,
              }}
            />
            <Plot
              data={[
                {
                  y: tracksData,
                  x: trackPopularityData,
                  orientation: "h",
                  type: "scatter",
                  mode: "lines",
                  marker: { color: [randomHexColor()] },
                },
                {
                  y: tracksData,
                  x: trackPopularityData,
                  type: "bar",
                  orientation: "h",
                  marker: { color: randomHexColor() },
                },
              ]}
              layout={{
                width: 600,
                height: 600,
                showlegend: false,
                margin: {
                  l: 280,
                  r: 0,
                },
                plot_bgcolor: "#191414",
                paper_bgcolor: "#191414",
                font: {
                  size: 12,
                  color: "#ffffff",
                },
              }}
            />
            <Plot
              data={[
                {
                  values: recentlyPlayedPopularityData,
                  labels: recentlyPlayedData,
                  textinfo: "label",
                  insidetextorientation: "radial",
                  hoverinfo: "label+percent+name",
                  hole: 0.3,
                  type: "pie",
                },
              ]}
              layout={{
                height: 600,
                width: 600,
                margin: {
                  l: 0,
                  r: 0,
                },
                plot_bgcolor: "#191414",
                paper_bgcolor: "#191414",
                showlegend: false,
              }}
            />
          </div>

          {/* <h1>Snapshot Details</h1> */}

          <div id="genres-index" className="genres-index">
            <h2>Most Played Genres</h2>
            <div className="genres-index-details">
              {uniqueGenres.map((title) => (
                <h3>{title}</h3>
              ))}
            </div>
          </div>

          <div className="snapshot-details">
            <div id="songs-index" className="songs-index">
              <h2>Top Tracks</h2>
              <div className="songs-index-details">
                <div className="songs-index-art">
                  {snapshot.album_images?.map((image) => (
                    <img src={image} />
                  ))}
                </div>
                <div className="songs-index-title">
                  {snapshot.tracks?.map((track) => (
                    <h3>"{track}"</h3>
                  ))}
                </div>
              </div>
            </div>

            <div id="songs-index" className="songs-index">
              <h2>Last Streamed</h2>
              <div className="songs-index-details">
                <div className="songs-index-art">
                  {snapshot.recently_played_album_art?.map((image) => (
                    <img src={image} />
                  ))}
                </div>
                <div className="songs-index-title">
                  {snapshot.recently_played?.map((track) => (
                    <h3>"{track}"</h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const [isArtistsNewVisible, setIsArtistsNewVisible] = useState(false);
// const [isSongsNewVisible, setIsSongsNewVisible] = useState(false);
// const [isGenresNewVisible, setIsGenresNewVisible] = useState(false);

// const handleShowArtistsNew = () => {
//   setIsArtistsNewVisible(true);
// };

// const handleHideArtistsNew = () => {
//   setIsArtistsNewVisible(false);
//   window.location.href = "/snapshots/" + params.id;
// };

// const handleShowSongsNew = () => {
//   setIsSongsNewVisible(true);
// };

// const handleHideSongsNew = () => {
//   setIsSongsNewVisible(false);
//   window.location.href = "/snapshots/" + params.id;
// };

// const handleShowGenresNew = () => {
//   setIsGenresNewVisible(true);
// };

// const handleHideGenresNew = () => {
//   setIsGenresNewVisible(false);
//   window.location.href = "/snapshots/" + params.id;
// };

{
  /* <Modal show={isArtistsNewVisible} onClose={handleHideArtistsNew}>
        <ArtistsNew />
      </Modal>

      <Modal show={isSongsNewVisible} onClose={handleHideSongsNew}>
        <SongsNew />
      </Modal>

      <Modal show={isGenresNewVisible} onClose={handleHideGenresNew}>
        <GenresNew />
      </Modal> */
}

{
  /* <button onClick={handleShowArtistsNew} className="custom-btn">
              Add Artists
            </button> */
}

{
  /* <button onClick={handleShowSongsNew} className="custom-btn">
              Add Songs
            </button> */
}

{
  /* <button onClick={handleShowGenresNew} className="custom-btn">
              Add Genres
            </button> */
}

{
  /* <div id="genres-index">
            <h3>Genres</h3>

            {snapshot.genres?.map((genre) => (
              <div>
                <h4>{genre.title}</h4>
              </div>
            ))}
          </div> */
}
