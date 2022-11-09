import axios from "axios";

export function ArtistsNew(props) {
  const handleCreateArtist = (params) => {
    axios.post("http://localhost:3000/artists.json", params).then((response) => {
      const newArtist = response.data;
      console.log("Artist added to snapshot", newArtist);
      window.location.href = "/";
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
          <p>Snapshot ID:</p>
          <input name="snapshot_id" type="text" />
        </div>
        <div>
          <button type="submit">Add Artist</button>
        </div>
      </form>
    </div>
  );
}
