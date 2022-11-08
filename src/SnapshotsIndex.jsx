export function SnapshotsIndex(props) {
  return (
    <div>
      <h1>All Snapshots</h1>
      {props.snapshots.map((snapshot) => (
        <div key={snapshot.id}>
          <h2>{snapshot.title}</h2>
          <img src={snapshot.image} />
        </div>
      ))}
    </div>
  );
}
