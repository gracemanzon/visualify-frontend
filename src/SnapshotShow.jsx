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
    console.log(trackPopularityData);
  }

  useEffect(handleSnapshotShow, []);

  return (
    <div>
      <Header />
      <div id="snapshot-show" className="snapshot-show">
        <div className="snapshot-show-info">
          <div className="snapshot-header">
            <h2>{snapshot.title}</h2>
            <h3>
              {snapshot.start_date} - {snapshot.end_date}
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
            {snapshot.artists?.map((artist) => (
              <div>
                <h3>{artist}</h3>
              </div>
            ))}
          </div>

          <div id="songs-index">
            <h2>Featured Songs</h2>
            {snapshot.tracks?.map((track) => (
              <div>
                <h3>"{track}"</h3>
              </div>
            ))}
          </div>
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
                type: "box",
                marker: {
                  color: randomHexColor(),
                },
              },
            ]}
            layout={{
              width: 600,
              height: 600,
              plot_bgcolor: "#191414",
              paper_bgcolor: "#191414",
              font: {
                size: 12,
                color: "#ffffff",
              },
              boxmode: "group",
            }}
            config={{
              scrollZoom: true,
            }}
          />
          <Plot
            data={[
              {
                type: "funnelarea",
                values: [8, 4, 3, 2, 1],
                text: [genresData[0], genresData[1], genresData[2], genresData[3], genresData[6]],
                marker: {
                  colors: ["59D4E8", "DDB6C6", "A696C8", "67EACA", "94D2E6"],
                  line: { color: ["3E4E88", "606470", "3E4E88", "606470", "3E4E88"], width: [2, 1, 5, 0, 3] },
                },
                textfont: { color: "#ffffff" },
                opacity: 0.65,
              },
            ]}
            layout={{
              width: 600,
              height: 600,
              plot_bgcolor: "#191414",
              paper_bgcolor: "#191414",
              font: {
                size: 12,
                color: "#ffffff",
              },
              boxmode: "group",
            }}
            config={{
              scrollZoom: true,
            }}
          />
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
