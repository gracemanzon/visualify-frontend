import { Link } from "react-router-dom";

export function SnapshotsIndex(props) {
  return (
    <div>
      <h1>All Snapshots</h1>
      {props.snapshots.map((snapshot) => (
        <div key={snapshot.id} id="snapshot-index">
          <Link to={`/snapshots/${snapshot.id}`}>
            <h2>{snapshot.title}</h2>
            <img src={snapshot.image} />
          </Link>
        </div>
      ))}
    </div>
  );
}
