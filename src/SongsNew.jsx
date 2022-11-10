import axios from "axios";
import { useParams } from "react-router-dom";

export function SongsNew() {
  const params = useParams();
  console.log("snapshot: " + params.id);

  const handleCreateSong = (params) => {
    axios.post("http://localhost:3000/songs.json", params).then((response) => {
      const newSong = response.data;
      console.log("Song added to snapshot", newSong);
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
      <h3>Add a Song</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="title" type="text" placeholder="song title" />
        </div>
        <div>
          <input name="artist" type="text" placeholder="artist name" />
        </div>
        <div>
          <input name="album" type="text" placeholder="album" />
        </div>
        <div>
          <input name="album_art" type="text" placeholder="album art url" />
        </div>
        <div>
          <input name="snapshot_id" type="hidden" defaultValue={params.id} />
        </div>
        <div>
          <button type="submit" className="custom-btn-5">
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}
