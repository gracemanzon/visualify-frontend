export function TopTracks(props) {
  return (
    <div id="top-tracks" className="top-tracks">
      <h2>Top Tracks</h2>
      <div className="top-tracks-wrapper">
        {props.topTracks?.map((track) => (
          <div key={track.id} className="track-wrapper">
            <h3>"{track.name}"</h3>
            <h4>{track.artists[0].name}</h4>
            <h4>
              <em>{track.album.name}</em>
            </h4>
            <img src={track.album.images[0].url} />
          </div>
        ))}
      </div>
    </div>
  );
}
