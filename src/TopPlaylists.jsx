export function TopPlaylists(props) {
  return (
    <div id="top-playlists" className="top-playlists">
      <h2>Top Playlists</h2>
      <div className="top-playlists-wrapper">
        {props.topPlaylists?.map((playlist) => (
          <div key={playlist.id} className="playlist-wrapper">
            <h3>{playlist.name}</h3>
            <img src={playlist.images[0].url} />
          </div>
        ))}
      </div>
    </div>
  );
}
