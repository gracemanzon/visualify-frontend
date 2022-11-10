export function TopPlaylists(props) {
  return (
    <div id="top-playlists" className="top-playlists">
      {props.topPlaylists?.map((playlist) => (
        <div key={playlist.id}>
          <h4>{playlist.name}</h4>
          <img src={playlist.images[0].url} />
        </div>
      ))}
    </div>
  );
}
