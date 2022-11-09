import axios from "axios";
import { Link } from "react-router-dom";

export function ArtistsNew() {
  const handleCreateArtist = (params) => {
    axios.post("http://localhost:3000/artists.json", params).then((response) => {
      const newArtist = response.data;
      console.log("Artist added to snapshot", newArtist);
      // localStorage.setItem("snapshot_id", response.data.snapshot_id);
      window.location.href = "/snapshots/" + response.data.snapshot_id;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create Artist");
    const params = new FormData(event.target);
    handleCreateArtist(params);
    event.target.reset();
  };

  return (
    <div>
      <h1>Add an Artist</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input name="name" type="text" />
        </div>
        <div>
          <p>Image:</p>
          <input name="image" type="text" />
        </div>
        <div>
          <p>Snapshot ID:</p>
          <input
            name="snapshot_id"
            type="text"
            // defaultValue={localStorage.getItem("snapshot_id")}
          />
        </div>
        <div>
          <button type="submit">Add Artist</button>
        </div>
      </form>
    </div>
  );
}
