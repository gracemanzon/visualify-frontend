import { Logout } from "./Logout";

export function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="https://open.spotify.com/" target="blank">
            <img src="/src/assets/Spotify_Logo_RGB_Green.png" alt="spotify logo" />
          </a>
          <h2>Visualify Dashboard</h2>
        </div>
        <button className="custom-btn-3">
          <Logout />
        </button>
      </nav>
    </header>
  );
}
