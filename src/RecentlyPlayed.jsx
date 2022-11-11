export function RecentlyPlayed(props) {
  return (
    <div id="recently-played" className="recently-played">
      <h3>Recently Played</h3>
      {props.recentlyPlayed?.map((playedtrack) => (
        <div key={playedtrack.id}>
          <h4>"{playedtrack.track.name}"</h4>
          <h4>{playedtrack.track.artists[0].name}</h4>
        </div>
      ))}
    </div>
  );
}
