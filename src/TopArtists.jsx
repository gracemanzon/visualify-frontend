import Plot from "react-plotly.js";

export function TopArtists(props) {
  let plotData = [];
  let titles = [];
  let followers = [];

  return (
    <div id="top-artists" className="top-artists">
      <h2>Top Artists</h2>
      <div className="top-artists-plot">
        {props.topArtists?.map((each) => {
          titles.push(each.name);
          followers.push(each.followers.total);

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
                color: ["#297361", "#F780A9", "#62A4F7", "#FE744D", "#FAE84B", "#B840A0"],
                opacity: [1, 0.8, 0.6, 0.4],
                size: [100, 83, 66, 49, 32, 15],
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
