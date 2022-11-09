import axios from "axios";

export function SnapshotsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Create Snapshot");
    const params = new FormData(event.target);
    handleCreateSnapshot(params);
    event.target.reset();
  };

  const handleCreateSnapshot = (params) => {
    axios.post("http://localhost:3000/snapshots.json", params).then((response) => {
      const newSnapshot = response.data;
      console.log("New Snapshot Created", newSnapshot);
      window.location.href = "/snapshots";
    });
  };

  return (
    <div id="snapshots-new">
      <div>
        <div>Add Snapshot</div>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Title:</p>
            <input name="title" type="text" />
          </div>
          <div>
            <p>Image:</p>
            <input name="image" type="text" />
          </div>
          <div>
            <p>Start Date:</p>
            <input name="start_date" type="text" />
          </div>
          <div>
            <p>End Date:</p>
            <input name="end_date" type="text" />
          </div>
          <div>
            <button type="submit">Create Snapshot</button>
          </div>
        </form>
      </div>
    </div>
  );
}
