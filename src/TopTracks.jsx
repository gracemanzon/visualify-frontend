import Plot from "react-plotly.js";
import { randomHexColor } from "random-hex-color-generator";

export function TopTracks(props) {
  let plotData = [];
  let titles = [];
  let popularity = [];

  return (
    <div id="top-tracks" className="top-tracks">
      <h2>Top Tracks</h2>
      <div className="top-tracks-plot">
        {props.topTracks?.map((each) => {
          titles.push(each.name);
          popularity.push(each.popularity);

          plotData["title"] = titles;
          plotData["popularity"] = popularity;

          return plotData;
        })}
        <Plot
          data={[
            {
              x: titles,
              y: popularity,
              type: "scatter",
              mode: "lines",
              marker: { color: randomHexColor() },
            },
            {
              type: "bar",
              x: titles,
              y: popularity,
              marker: { color: randomHexColor() },
            },
          ]}
          layout={{
            title: "x Popularity",
            width: "1000",
            height: 500,
            plot_bgcolor: "#191414",
            paper_bgcolor: "#191414",
            font: {
              size: 12,
              color: "#ffffff",
            },
          }}
        />
      </div>
      <div className="top-tracks-wrapper">
        {props.topTracks?.map((track) => (
          <div key={track.id} className="track-wrapper">
            <img src={track.album.images[0].url} />
            <div>
              <h3>"{track.name}"</h3>
              <h4>{track.artists[0].name}</h4>
              <h4>
                <em>{track.album.name}</em>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
