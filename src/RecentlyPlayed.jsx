export function RecentlyPlayed(props) {
  return (
    <div id="recently-played" className="recently-played">
      <h2>Recently Played</h2>
      <div className="recently-played-wrapper">
        {props.recentlyPlayed?.map((playedtrack) => (
          <div key={playedtrack.id}>
            <h3>"{playedtrack.track.name}"</h3>
            <h4>{playedtrack.track.artists[0].name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
