import Plot from "react-plotly.js";
import { randomHexColor } from "random-hex-color-generator";

export function TopArtists(props) {
  let plotData = [];
  let titles = [];
  let followers = [];
  let popularity = [];

  return (
    <div id="top-artists" className="top-artists">
      <h2>Top Artists</h2>
      <div className="top-artists-plot">
        {props.topArtists?.map((each) => {
          titles.push(each.name);
          followers.push(each.followers.total);
          popularity.push(each.popularity);

          plotData["title"] = titles;
          plotData["followers"] = followers;

          return plotData;
        })}
        <Plot
          data={[
            {
              x: titles,
              y: followers,
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
                  randomHexColor(),
                  randomHexColor(),
                  randomHexColor(),
                  randomHexColor(),
                ],
                opacity: 0.5,
                size: popularity,
              },
            },
            // {
            //   x: titles,
            //   y: followers,
            //   type: "scatter",
            //   mode: "lines",
            //   marker: { color: "#297361" },
            // },
          ]}
          layout={{
            title: "x Global Followers",
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

      <div className="top-artists-wrapper">
        {props.topArtists?.map((artist) => (
          <div key={artist.id} className="artists-wrapper">
            <img src={artist.images[0].url} />
            <div>
              <h3>{artist.name}</h3>
              <h4>Popularity: {artist.popularity}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
