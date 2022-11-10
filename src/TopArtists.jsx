export function TopArtists(props) {
  return (
    <div id="top-artists" className="top-artists">
      {props.topArtists?.map((artist) => (
        <div key={artist.id}>
          <h4>{artist.name}</h4>
          <h4>Popularity: {artist.popularity}</h4>
          <img src={artist.images[0].url} />
        </div>
      ))}
    </div>
  );
}
