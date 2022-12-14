import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        event.target.reset();
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="login">
      <a href="https://open.spotify.com/" target="blank">
        <img src="/src/assets/Spotify_Logo_RGB_Green.png" alt="spotify logo" />
      </a>
      <h2>Data Visualizer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="email" type="text" placeholder="email" />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="btn-container">
          <button type="submit" className="custom-btn">
            Login
          </button>
          <button className="custom-btn-2">
            <Link to="/signup" className="custom-link">
              Create Account
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
