import axios from "axios";

export function SongsNew() {
  const handleCreateSong = (params) => {
    axios.post("http://localhost:3000/songs.json", params).then((response) => {
      const newSong = response.data;
      console.log("Song added to snapshot", newSong);
      localStorage.setItem("snapshot_id", response.data.snapshot_id);
      window.location.href = "/snapshots/" + response.data.snapshot_id;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create Song");
    const params = new FormData(event.target);
    handleCreateSong(params);
    event.target.reset();
  };

  return (
    <div>
      <h1>Add a Song</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Title:</p>
          <input name="title" type="text" />
        </div>
        <div>
          <p>Artist:</p>
          <input name="artist" type="text" />
        </div>
        <div>
          <p>Album:</p>
          <input name="album" type="text" />
        </div>
        <div>
          <p>Snapshot ID:</p>
          <input name="snapshot_id" type="text" defaultValue={localStorage.getItem("snapshot_id")} />
        </div>
        <div>
          <button type="submit">Add Song</button>
        </div>
      </form>
    </div>
  );
}
