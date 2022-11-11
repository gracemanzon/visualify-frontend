export function TopArtists(props) {
  return (
    <div id="top-artists" className="top-artists">
      <h2>Top Artists</h2>
      <div className="top-artists-wrapper">
        {props.topArtists?.map((artist) => (
          <div key={artist.id}>
            <h3>{artist.name}</h3>
            <h4>Popularity: {artist.popularity}</h4>
            <img src={artist.images[0].url} />
          </div>
        ))}
      </div>
    </div>
  );
}
