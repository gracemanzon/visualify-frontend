import axios from "axios";

export function Logout() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    // localStorage.removeItem("snapshot_id");
    window.location.href = "/";
  };

  return (
    <a href="#" onClick={handleClick} className="custom-link">
      Logout
    </a>
  );
}
