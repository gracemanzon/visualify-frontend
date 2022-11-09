import axios from "axios";
import { Link } from "react-router-dom";

export function GenresNew() {
  const handleCreateGenre = (params) => {
    axios.post("http://localhost:3000/genres.json", params).then((response) => {
      const newGenre = response.data;
      console.log("Genre added to snapshot", newGenre);
      localStorage.setItem("snapshot_id", response.data.snapshot_id);
      window.location.href = "/snapshots/" + response.data.snapshot_id;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create Genre");
    const params = new FormData(event.target);
    handleCreateGenre(params);
    event.target.reset();
  };

  return (
    <div>
      <h1>Add a Genre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Title:</p>
          <input name="title" type="text" />
        </div>
        <div>
          <p>Snapshot ID:</p>
          <input name="snapshot_id" type="text" defaultValue={localStorage.getItem("snapshot_id")} />
        </div>
        <div>
          <button type="submit">Add Genre</button>
        </div>
      </form>
      <div>
        <Link to={`/snapshots/${localStorage.getItem("snapshot_id")}`}>Back to Snapshot</Link>
      </div>
    </div>
  );
}
