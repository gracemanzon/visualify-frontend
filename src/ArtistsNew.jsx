import axios from "axios";
import { useParams } from "react-router-dom";

export function ArtistsNew() {
  const params = useParams();
  console.log("snapshot: " + params.id);

  const handleCreateArtist = (params) => {
    axios.post("http://localhost:3000/artists.json", params).then((response) => {
      const newArtist = response.data;
      console.log("Artist added to snapshot", newArtist);
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
      <h3>Add an Artist</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" type="text" placeholder="artist name" />
        </div>
        <div>
          <input name="image" type="text" placeholder="artist image url" />
        </div>
        <div>
          <input name="snapshot_id" type="hidden" defaultValue={params.id} />
        </div>
        <div>
          <button type="submit" className="custom-btn-5">
            Add Artist
          </button>
        </div>
      </form>
    </div>
  );
}
