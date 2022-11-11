export function RecentlyPlayed(props) {
  return (
    <div id="recently-played" className="recently-played">
      <h2>Recently Played</h2>
      <div className="recently-played-wrapper">
        {props.recentlyPlayed?.map((recenttrack) => (
          <div key={recenttrack.id}>
            <h3>"{recenttrack.track.name}"</h3>
            <h4>{recenttrack.track.artists[0].name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
