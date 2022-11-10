export function TopTracks(props) {
  return (
    <div id="top-tracks" className="top-tracks">
      {props.topTracks?.map((track) => (
        <div key={track.id}>
          <h4>"{track.name}"</h4>
          <h4>{track.artists[0].name}</h4>
          <h4>
            <em>{track.album.name}</em>
          </h4>
          <img src={track.album.images[0].url} />
        </div>
      ))}
    </div>
  );
}
