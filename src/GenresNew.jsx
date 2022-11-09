import axios from "axios";

export function GenresNew() {
  const handleCreateGenre = (params) => {
    axios.post("http://localhost:3000/genres.json", params).then((response) => {
      const newGenre = response.data;
      console.log("Genre added to snapshot", newGenre);
      window.location.href = "/";
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
          <input name="snapshot_id" type="text" />
        </div>
        <div>
          <button type="submit">Add Genre</button>
        </div>
      </form>
    </div>
  );
}
