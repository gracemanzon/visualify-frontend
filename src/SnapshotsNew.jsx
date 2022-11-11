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
      window.location.href = "/home";
    });
  };

  return (
    <div id="snapshots-new" className="snapshots-new">
      <div>
        <h3>Start New Snapshot</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input name="title" type="text" placeholder="title" />
          </div>
          <div>
            <input name="image" type="text" placeholder="image url" />
          </div>
          <div>
            <input name="start_date" type="text" placeholder="start date" />
          </div>
          <div>
            <input name="end_date" type="text" placeholder="end date" />
          </div>
          <div>
            <button type="submit" className="custom-btn-5">
              Create Snapshot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
