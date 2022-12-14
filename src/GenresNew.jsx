import axios from "axios";
import { useParams } from "react-router-dom";

export function GenresNew() {
  const params = useParams();
  console.log("snapshot: " + params.id);

  const handleCreateGenre = (params) => {
    axios.post("http://localhost:3000/genres.json", params).then((response) => {
      const newGenre = response.data;
      console.log("Genre added to snapshot", newGenre);
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
      <h3>Add a Genre</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="title" type="text" placeholder="title" />
        </div>
        <div>
          <input name="snapshot_id" type="hidden" defaultValue={params.id} />
        </div>
        <div>
          <button type="submit" className="custom-btn-5">
            Add Genre
          </button>
        </div>
      </form>
    </div>
  );
}
