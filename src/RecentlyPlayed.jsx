export function RecentlyPlayed(props) {
  return (
    <div id="recently-played" className="recently-played">
      {props.recentlyPlayed?.map((track) => (
        <div key={track.id}>
          <h4>"{track.track.name}"</h4>
          <h4>{track.track.artists[0].name}</h4>
        </div>
      ))}
    </div>
  );
}
