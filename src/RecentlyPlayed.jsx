export function RecentlyPlayed(props) {
  return (
    <div id="recently-played" className="recently-played">
      <h2>Recently Played</h2>
      <div className="recently-played-wrapper">
        {props.recentlyPlayed?.map((track) => (
          <div key={track.id} className="played-wrapper">
            <img src={track.track.album.images[0].url} />
            <div>
              <h3>"{track.track.name}"</h3>
              <h4>{track.track.artists[0].name}</h4>
              <h4>
                <em>{track.track.album.name}</em>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
